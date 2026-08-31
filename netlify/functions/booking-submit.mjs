import { buildBookingEmail } from "./_shared/booking-email.mjs";

const FILE_FIELDS = ["existing-tattoo-photo", "reference-image-1", "reference-image-2", "reference-image-3"];
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://agneshamilton.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });

  const formData = await request.formData();
  if (String(formData.get("bot-field") || "").trim()) return new Response(null, { status: 204, headers: CORS_HEADERS });

  const data = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") data[key] = value;
  }

  const attachments = [];
  for (const field of FILE_FIELDS) {
    const file = formData.get(field);
    if (!(file instanceof File) || !file.size) continue;
    data[field] = `Attached: ${file.name || `${field}.jpg`}`;
    attachments.push({
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      filename: file.name || `${field}.jpg`,
    });
  }

  const apiKey = Netlify.env.get("RESEND_API_KEY");
  const to = Netlify.env.get("BOOKING_NOTIFICATION_TO") || "info@agneshamilton.com";
  const from = Netlify.env.get("BOOKING_NOTIFICATION_FROM");
  if (!apiKey || !from) return Response.json({ error: "Email service is not configured." }, { status: 500, headers: CORS_HEADERS });

  const email = buildBookingEmail(data);
  const replyTo = data.email?.trim();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: email.subject,
      html: email.html,
      text: email.text,
      attachments,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    console.error(`Resend booking notification failed (${response.status}): ${await response.text()}`);
    return Response.json({ error: "The booking email could not be sent." }, { status: 502, headers: CORS_HEADERS });
  }

  const storageResponse = await fetch(new URL("/booking/", request.url), { method: "POST", body: formData });
  if (!storageResponse.ok) console.error(`Netlify form storage failed (${storageResponse.status}).`);

  return Response.json({ ok: true }, { headers: CORS_HEADERS });
};

export const config = { path: "/api/booking-submit" };

const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  pronouns: "Pronouns",
  "tattoo-type": "Booking type",
  "touch-up-type": "Touch-up",
  "tattoo-idea": "Tattoo idea",
  placement: "Placement",
  size: "Approximate size",
  "color-preference": "Color or black & gray",
  budget: "Budget",
  "additional-notes": "Anything else?",
  "existing-tattoo-photo": "Existing tattoo photo",
  "reference-image-1": "Reference image 1",
  "reference-image-2": "Reference image 2",
  "reference-image-3": "Reference image 3",
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const clean = (value) => typeof value === "string" ? value.trim() : "";

const linkValue = (value, label) => {
  const safeValue = escapeHtml(value);
  if (/^cid:/i.test(value)) {
    return `<img src="${safeValue}" alt="${escapeHtml(label)}" style="display:block;width:100%;max-width:460px;height:auto;border-radius:6px;border:1px solid #ded7df;" />`;
  }
  if (/^https:\/\//i.test(value)) {
    return `<a href="${safeValue}" style="color:#5a285c;text-decoration:underline;">View ${escapeHtml(label.toLowerCase())}</a>`;
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `<a href="mailto:${safeValue}" style="color:#5a285c;text-decoration:underline;">${safeValue}</a>`;
  }
  return safeValue.replaceAll("\n", "<br>");
};

const row = ([label, value]) => `
  <tr>
    <th style="padding:7px 18px 7px 0;text-align:left;vertical-align:top;color:#342d3a;font-size:14px;line-height:1.4;font-weight:700;">${escapeHtml(label)}</th>
    <td style="padding:7px 0;vertical-align:top;color:#4d4651;font-size:14px;line-height:1.5;overflow-wrap:anywhere;">${linkValue(value, label)}</td>
  </tr>`;

const section = (title, rows) => rows.length ? `
  <h2 style="margin:28px 0 8px;color:#5a285c;font-family:Arial,sans-serif;font-size:13px;line-height:1.3;letter-spacing:.12em;text-transform:uppercase;">${escapeHtml(title)}</h2>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">${rows.map(row).join("")}</table>` : "";

const selectRows = (data, keys) => keys
  .map((key) => [FIELD_LABELS[key], clean(data[key])])
  .filter(([, value]) => value);

export const buildBookingEmail = (submission = {}) => {
  const data = Object.fromEntries(Object.entries(submission).map(([key, value]) => [key, clean(value)]));
  const name = data.name || "New client";
  const availability = ["available-monday", "available-thursday", "available-friday", "available-saturday"]
    .map((key) => data[key])
    .filter(Boolean)
    .join(", ");

  const contact = selectRows(data, ["name", "email", "phone", "pronouns"]);
  const request = selectRows(data, ["tattoo-type", "touch-up-type", "tattoo-idea", "placement", "size", "color-preference", "budget"]);
  if (availability) request.push(["Available days", availability]);
  const notes = selectRows(data, ["additional-notes"]);
  const images = selectRows(data, ["existing-tattoo-photo", "reference-image-1", "reference-image-2", "reference-image-3"]);

  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f0f4;font-family:Arial,sans-serif;color:#342d3a;">
  <div style="display:none;max-height:0;overflow:hidden;">New tattoo request from ${escapeHtml(name)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#f4f0f4;"><tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;border-collapse:collapse;">
      <tr><td style="padding:0 6px 18px;text-align:center;color:#5a285c;font-family:Georgia,serif;font-size:22px;font-weight:700;letter-spacing:.08em;">AGGIE-Q TATTOO</td></tr>
      <tr><td style="padding:30px;background:#fff;border:1px solid #ded7df;border-radius:6px;">
        <h1 style="margin:0 0 6px;color:#342d3a;font-family:Arial,sans-serif;font-size:27px;line-height:1.2;">Tattoo Request</h1>
        <p style="margin:0 0 24px;color:#756d78;font-size:14px;line-height:1.5;">Submitted through agneshamilton.com</p>
        ${section("Contact", contact)}
        ${section("Tattoo request", request)}
        ${section("Notes", notes)}
        ${section("Uploaded images", images)}
      </td></tr>
      <tr><td style="padding:16px 6px 0;text-align:center;color:#817982;font-size:12px;line-height:1.5;">Reply to this email to contact ${escapeHtml(name)}.</td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const textSections = [
    ["CONTACT", contact],
    ["TATTOO REQUEST", request],
    ["NOTES", notes],
    ["UPLOADED IMAGES", images],
  ].filter(([, rows]) => rows.length)
    .map(([title, rows]) => `${title}\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}`);

  return {
    subject: `New tattoo request — ${name}`,
    html,
    text: `TATTOO REQUEST\n\n${textSections.join("\n\n")}`,
  };
};

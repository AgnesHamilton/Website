import { buildBookingEmail } from "./_shared/booking-email.mjs";

export default {
  async formSubmitted(event) {
    if (event.data?.["form-name"] !== "tattoo-booking") return;

    const apiKey = Netlify.env.get("RESEND_API_KEY");
    const to = Netlify.env.get("BOOKING_NOTIFICATION_TO") || "info@agneshamilton.com";
    const from = Netlify.env.get("BOOKING_NOTIFICATION_FROM");
    if (!apiKey || !from) {
      console.error("Booking notification not sent: RESEND_API_KEY or BOOKING_NOTIFICATION_FROM is missing.");
      return;
    }

    const email = buildBookingEmail(event.data);
    const replyTo = event.data.email?.trim();
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend booking notification failed (${response.status}): ${await response.text()}`);
    }
  },
};

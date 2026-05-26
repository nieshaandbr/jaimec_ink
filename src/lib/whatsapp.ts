/**
 * ============================================================
 * WHATSAPP INTEGRATION
 * ============================================================
 * The site preserves Jaime's WhatsApp-first workflow.
 * Booking form submissions are formatted into a wa.me deep link
 * so the message opens in WhatsApp ready to send to the artist.
 *
 * TODO: Replace WHATSAPP_NUMBER with the artist's real number
 * (international format, NO leading "+", NO spaces).
 * Example: "447700900123" for UK, "13105550123" for US.
 *
 * For server-side delivery (e.g. WhatsApp Business Cloud API,
 * Twilio, or a Make/Zapier webhook), wire it up inside
 * src/lib/booking.functions.ts when ready.
 * ============================================================
 */
export const WHATSAPP_NUMBER = "+27613672861"; // <-- REPLACE WITH REAL NUMBER

export interface BookingPayload {
  fullName: string;
  phone: string;
  email: string;
  style: string;
  placement: string;
  size: string;
  preferredDates: string;
  budget: string;
  concept: string;
  referenceImageName?: string;
}

/** Format a booking payload into a clean multiline WhatsApp message. */
export function formatBookingMessage(p: BookingPayload): string {
  return [
    "✦ NEW CONSULTATION ENQUIRY — JAIME C INK ✦",
    "",
    `Name: ${p.fullName}`,
    `Phone: ${p.phone}`,
    `Email: ${p.email}`,
    "",
    "— PROJECT —",
    `Style: ${p.style}`,
    `Placement: ${p.placement}`,
    `Size: ${p.size}`,
    `Budget: ${p.budget}`,
    `Preferred dates: ${p.preferredDates}`,
    "",
    "— CONCEPT —",
    p.concept,
    p.referenceImageName ? `\nReference attached: ${p.referenceImageName}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppLink(payload: BookingPayload): string {
  const text = encodeURIComponent(formatBookingMessage(payload));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

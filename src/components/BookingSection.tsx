import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { buildWhatsAppLink, type BookingPayload } from "@/lib/whatsapp";

/**
 * BookingSection — premium multi-step consultation form.
 *
 * SUBMISSION FLOW:
 *  1. Client completes 4 steps.
 *  2. Form payload is formatted into a clean WhatsApp message.
 *  3. Cinematic success modal appears.
 *  4. WhatsApp deep link opens — message is pre-filled, ready to send.
 *
 * TODO (server delivery): For automated lead capture, create a server
 * function in src/lib/booking.functions.ts that:
 *   - inserts the payload into a Supabase `bookings` table
 *   - sends an email notification (Resend / Postmark)
 *   - optionally calls the WhatsApp Business Cloud API
 * Call it from `handleSubmit` below before opening the WhatsApp link.
 *
 * TODO (image storage): Reference image uploads currently stay client-side
 * (filename only is sent through WhatsApp). To persist uploads, wire a
 * Supabase Storage bucket — see src/lib/booking.functions.ts when created.
 *
 * TODO (validation): Adjust the zod schemas per step below if you want
 * to require/relax fields.
 *
 * TODO (success copy): Edit the modal text near the bottom of this file.
 *
 * TODO (Formspree alt): If you'd rather not run server code, point the
 * form at https://formspree.io/f/<your-id> by replacing handleSubmit.
 */

const schemas = [
  z.object({
    fullName: z.string().min(2, "Full name required"),
    phone: z.string().min(10, "Phone required"),
    email: z.string().email("Valid email required"),
  }),
  z.object({
    style: z.string().min(1, "Choose a style"),
    placement: z.string().min(1, "Placement required"),
    size: z.string().min(1, "Size required"),
  }),
  z.object({
    preferredDates: z.string().min(1, "Preferred dates required"),
    budget: z.string().min(1, "Budget range required"),
  }),
  z.object({
    concept: z.string().min(20, "Tell me a little more — at least a couple of lines"),
  }),
];

const STYLES = ["Fine Line", "Blackwork", "Realism", "Spine Piece", "Custom Concept", "Coverup"];
const SIZES = ["Palm-size (<10cm)", "Medium (10–20cm)", "Large (20–35cm)", "Sleeve / Spine"];
const BUDGETS = ["£200–£500", "£500–£1,000", "ZAR1,000–ZAR5,000", "ZAR5,000+"];

export function BookingSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<BookingPayload>>({});
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function update<K extends keyof BookingPayload>(k: K, v: BookingPayload[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function next() {
    const parsed = schemas[step].safeParse(data);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      for (const i of parsed.error.issues) e[i.path[0] as string] = i.message;
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit() {
    const parsed = schemas[3].safeParse(data);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      for (const i of parsed.error.issues) e[i.path[0] as string] = i.message;
      setErrors(e);
      return;
    }

    const payload: BookingPayload = {
      fullName: data.fullName!,
      phone: data.phone!,
      email: data.email!,
      style: data.style!,
      placement: data.placement!,
      size: data.size!,
      preferredDates: data.preferredDates!,
      budget: data.budget!,
      concept: data.concept!,
      referenceImageName: referenceFile?.name,
    };

    // TODO: await sendBookingToServer(payload, referenceFile);
    //   - persist in Supabase `bookings`
    //   - send email notification
    //   - upload referenceFile to Supabase Storage bucket "booking-refs"

    setDone(true);

    // Open WhatsApp pre-filled message after a short cinematic beat
    setTimeout(() => {
      window.open(buildWhatsAppLink(payload), "_blank", "noopener");
    }, 1800);
  }

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <section id="booking" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left rail */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-6">✦ &nbsp; Begin &nbsp; / &nbsp; Consultation</p>
          <h2 className="text-[clamp(2.25rem,5vw,4.5rem)]">
            Tell me your <em className="italic text-muted-foreground">story.</em>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every booking begins with a private conversation. Share a few details and
            I'll personally read your enquiry and reply on WhatsApp within 48 hours.
          </p>
          <div className="mt-10 space-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <p>01 &nbsp; About you</p>
            <p>02 &nbsp; The piece</p>
            <p>03 &nbsp; Timing & budget</p>
            <p>04 &nbsp; Your concept</p>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-8">
          <div className="relative overflow-hidden border border-border bg-card/40 backdrop-blur-sm">
            {/* Progress bar */}
            <div className="h-px w-full bg-border">
              <motion.div
                className="h-full bg-foreground"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>

            <div className="p-8 md:p-14">
              <div className="mb-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>
                  Step {String(step + 1).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
                </span>
                <span>Jaime C Ink — Consultation</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="space-y-8"
                >
                  {step === 0 && (
                    <>
                      <Field label="Full name" error={errors.fullName}>
                        <Input value={data.fullName ?? ""} onChange={(v) => update("fullName", v)} placeholder="Your name" />
                      </Field>
                      <Field label="Phone (with country code)" error={errors.phone}>
                        <Input value={data.phone ?? ""} onChange={(v) => update("phone", v)} placeholder="+27 …" />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <Input type="email" value={data.email ?? ""} onChange={(v) => update("email", v)} placeholder="email@gmail.com" />
                      </Field>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <Field label="Style" error={errors.style}>
                        <ChipGroup options={STYLES} value={data.style ?? ""} onChange={(v) => update("style", v)} />
                      </Field>
                      <Field label="Placement on body" error={errors.placement}>
                        <Input value={data.placement ?? ""} onChange={(v) => update("placement", v)} placeholder="e.g. inner forearm, spine, ribs" />
                      </Field>
                      <Field label="Size" error={errors.size}>
                        <ChipGroup options={SIZES} value={data.size ?? ""} onChange={(v) => update("size", v)} />
                      </Field>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Field label="Preferred dates" error={errors.preferredDates}>
                        <Input value={data.preferredDates ?? ""} onChange={(v) => update("preferredDates", v)} placeholder="e.g. mid-March, any Saturday in April" />
                      </Field>
                      <Field label="Budget range" error={errors.budget}>
                        <ChipGroup options={BUDGETS} value={data.budget ?? ""} onChange={(v) => update("budget", v)} />
                      </Field>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <Field label="The concept — tell me everything" error={errors.concept}>
                        <textarea
                          value={data.concept ?? ""}
                          onChange={(e) => update("concept", e.target.value)}
                          rows={6}
                          placeholder="Story, references, mood, meaning behind the piece…"
                          className="w-full resize-none border border-border bg-transparent px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                        />
                      </Field>
                      <Field label="Reference image (optional)">
                        <label className="flex cursor-pointer items-center justify-between border border-dashed border-border bg-transparent px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                          <span>{referenceFile?.name ?? "Drop or choose an image"}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                            Upload ↗
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setReferenceFile(e.target.files?.[0] ?? null)}
                            className="hidden"
                          />
                        </label>
                      </Field>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground disabled:opacity-30"
                >
                  ← Back
                </button>
                {step < totalSteps - 1 ? (
                  <button
                    onClick={next}
                    className="group inline-flex items-center gap-3 bg-foreground px-7 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-background transition-all hover:gap-5"
                  >
                    Continue <span aria-hidden>→</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="group inline-flex items-center gap-3 bg-foreground px-7 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-background transition-all hover:gap-5"
                  >
                    Send enquiry <span aria-hidden>✦</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === SUCCESS MODAL ===
          TODO: edit the copy below to match the artist's voice. */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative max-w-xl text-center"
            >
              <p className="eyebrow mb-8">✦ &nbsp; Received</p>
              <h3 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
                Your consultation request has been{" "}
                <em className="italic text-muted-foreground">received.</em>
              </h3>
              <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                Jaime will personally review your enquiry and contact you on WhatsApp shortly.
                A new tab is opening with your message ready to send.
              </p>
              <button
                onClick={() => {
                  setDone(false);
                  setStep(0);
                  setData({});
                  setReferenceFile(null);
                }}
                className="mt-12 link-underline font-mono text-[11px] uppercase tracking-[0.25em]"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- field primitives ---------- */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-b border-border bg-transparent px-0 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none"
    />
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
            value === o
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

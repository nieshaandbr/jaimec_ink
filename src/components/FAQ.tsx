import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FAQ — accordion. Premium, restrained.
 * TODO: Edit the `items` array to match the artist's actual policies.
 */
const items = [
  {
    q: "How does booking work?",
    a: "Every booking begins with a written consultation through the form on this site. Once I read it, I'll reply on WhatsApp within 48 hours to discuss the piece, walk through a quote, and offer dates.",
  },
  {
    q: "Do you require a deposit?",
    a: "Yes — a non-refundable deposit secures the date and is deducted from the final price. The deposit covers design time, which begins the moment a date is held.",
  },
  {
    q: "How should I prepare for the session?",
    a: "Eat a real meal, hydrate well, sleep, and wear something that exposes the placement comfortably. Avoid alcohol the night before. Bring a water bottle and a playlist if you'd like one.",
  },
  {
    q: "What should I expect during healing?",
    a: "Full aftercare instructions are sent the day of. Most pieces surface-heal in 10–14 days and fully settle by week six. Sunscreen for life — it's the single best thing you can do for the work.",
  },
  {
    q: "How long is the wait list?",
    a: "Currently 6–10 weeks for small and medium pieces; spine and large custom work can run longer. Joining the consultation list is the only way to see real availability.",
  },
  {
    q: "Do you offer touch-ups?",
    a: "Yes — one complimentary touch-up within twelve months of the original session, provided aftercare has been followed.",
  },
  {
    q: "Pricing",
    a: "Pricing is by piece, not by hour, so we both know what we're agreeing to. A precise quote is shared after the consultation when the design scope is clear.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">✦ &nbsp; FAQ</p>
          <h2 className="text-[clamp(2.25rem,5vw,4.5rem)]">
            Before you <em className="italic text-muted-foreground">begin.</em>
          </h2>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-border">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={it.q} className="border-b border-border">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-8 py-7 text-left"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl md:text-3xl">{it.q}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                      className="font-display text-3xl text-foreground/60"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 pl-[3.3rem] text-base leading-relaxed text-muted-foreground">
                          {it.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

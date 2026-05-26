import { motion } from "framer-motion";

/**
 * SocialProof — testimonials + voices + Instagram reel placeholders.
 *
 * TODO (testimonials): Edit the `testimonials` array below with real
 *   client quotes (with permission). Keep them short and emotional.
 *
 * TODO (Instagram embeds): Replace the reel placeholders with real embeds.
 *   Example (in place of the placeholder <div>):
 *     <blockquote class="instagram-media" data-instgrm-permalink="...">…</blockquote>
 *   …and load https://www.instagram.com/embed.js once globally.
 *   Or use a lightweight oEmbed solution.
 *
 * TODO (healed shots): swap the gradient placeholders with healed-tattoo
 *   photographs (these prove craft holds up over time).
 */

const testimonials = [
  {
    quote:
      "He didn't just tattoo me — he understood the piece before I could even explain it. I'll carry this for the rest of my life.",
    name: "— A.M.",
    city: "London",
  },
  {
    quote:
      "The studio felt like a chapel. Quiet, deliberate, sacred. Five years on and the line is still as crisp as the first day.",
    name: "— S.R.",
    city: "Madrid",
  },
  {
    quote:
      "I've sat with three artists across two continents. Jaime is the only one who treats the work like the gift it is.",
    name: "— J.K.",
    city: "Berlin",
  },
];

export function SocialProof() {
  return (
    <section id="process" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20">
          <p className="eyebrow mb-6">✦ &nbsp; Voices &nbsp; / &nbsp; Carried by</p>
          <h2 className="max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)]">
            Words from those who <em className="italic text-muted-foreground">wear the work.</em>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-12 border-y border-border py-16 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="flex flex-col"
            >
              <span className="mb-6 font-display text-5xl leading-none text-foreground/30">"</span>
              <blockquote className="font-display text-2xl leading-[1.25] text-foreground/90 md:text-3xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {t.name} &nbsp; · &nbsp; {t.city}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Reel grid */}
        <div className="mt-24">
          <div className="mb-10 flex items-end justify-between">
            <p className="eyebrow">✦ &nbsp; Instagram &nbsp; / &nbsp; @jaime.c.ink</p>
            {/* TODO: update Instagram handle/URL */}
            <a
              href="https://instagram.com/jaime.c.ink"
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.25em]"
            >
              Follow ↗
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {/* === REEL PLACEHOLDERS ===
                TODO: replace each <div> with a real Instagram embed or healed-tattoo image. */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden border border-border bg-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-background" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    Reel · 00{i + 1}
                  </span>
                  <span className="font-display text-2xl text-foreground/40">▶</span>
                </div>
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

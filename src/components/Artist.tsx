import { motion } from "framer-motion";
import artistImg from "@/assets/artist.jpg";

/**
 * Artist — cinematic profile section.
 *
 * TODO (portrait): Replace `artistImg` with the artist's real editorial portrait.
 * TODO (bio): Edit the paragraphs below — keep the manifesto tone.
 * TODO (social links): Update href values for Instagram / contact.
 */
export function Artist() {
  return (
    <section id="artist" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-card">
            <img
              src={artistImg}
              alt="Jaime C, tattoo artist"
              loading="lazy"
              className="h-full w-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <p className="absolute -bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Portrait — 35mm, no flash
          </p>
        </motion.div>

        {/* Manifesto */}
        <div className="lg:col-span-7 lg:pt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="eyebrow mb-8"
          >
            ✦ &nbsp; The artist &nbsp; / &nbsp; Jaime C
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[clamp(2.25rem,5vw,4.5rem)]"
          >
            "Every piece is designed to carry meaning
            <em className="italic text-muted-foreground"> beyond aesthetics.</em>"
          </motion.h2>

          {/* TODO: replace bio paragraphs with the artist's real story */}
          <div className="mt-12 grid gap-8 text-base leading-relaxed text-foreground/80 md:grid-cols-2">
            <p>
              I work slowly. One client at a time, one consultation at a time. The studio
              is small by design — a private room, low light, an unhurried hour to talk
              before any needle touches skin.
            </p>
            <p>
              My obsession is the line. Fine line, blackwork, the quiet weight of negative
              space. I draw every piece for a single person, in a single body, never to be
              repeated. What you carry is yours alone.
            </p>
          </div>

          {/* Stats / credentials */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[
              { n: "9", l: "Years practising" },
              { n: "1,200+", l: "Pieces completed" },
              { n: "1:1", l: "Always private" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl md:text-5xl">{s.n}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          {/* TODO: update social links */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="https://instagram.com/jaime.c.ink"
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.25em]"
            >
              Instagram ↗
            </a>
            <a
              href="#booking"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.25em]"
            >
              Book a consultation ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

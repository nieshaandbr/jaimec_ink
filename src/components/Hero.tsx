import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";

/**
 * Hero — cinematic fullscreen entrance.
 *
 * TODO: Replace `heroImg` import with a looping background video for
 * maximum cinematic impact. Suggested pattern:
 *
 *   <video src="/hero-reel.mp4" autoPlay muted loop playsInline
 *          className="absolute inset-0 h-full w-full object-cover" />
 *
 * Place the file in /public/ and keep it under ~6MB (720p, h.264).
 *
 * TODO: Edit headline / subhead / CTA copy below to match the artist's voice.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex h-[100svh] min-h-[680px] w-full items-end overflow-hidden vignette"
    >
      {/* === BACKGROUND MEDIA ===
          Replace this <img> with a <video> when reel is available. */}
      <img
        src={heroImg}
        alt="Tattoo artist Jaime C at work"
        className="absolute inset-0 h-full w-full object-cover ken-burns"
        width={1920}
        height={1080}
      />

      {/* Cinematic overlay — protects type legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="eyebrow mb-8"
        >
          ✦ &nbsp; By appointment only &nbsp; ✦
        </motion.p>

        <h1 className="max-w-5xl text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] text-foreground">
          {"Stories etched".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 0.2 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="mr-4 inline-block"
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.em
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-light not-italic text-muted-foreground"
          >
            <span className="italic">in ink.</span>
          </motion.em>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg"
        >
          Custom tattoo artistry crafted with precision, meaning, and intention.
          A studio practice — not a shop.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          {/* TODO: Edit CTA labels / targets */}
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-3 bg-foreground px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-background transition-all hover:gap-5"
          >
            Start your consultation
            <span aria-hidden>→</span>
          </a>
          <a
            href="#work"
            className="link-underline inline-flex items-center font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80"
          >
            View portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/50">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-foreground/40"
        />
      </motion.div>
    </section>
  );
}

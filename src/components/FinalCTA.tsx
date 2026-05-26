import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero.jpg";

/**
 * FinalCTA — closing cinematic section with parallax background.
 * TODO: Edit headline + button copy below.
 */
export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.2, 0.5, 0.5, 0.2]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* Parallax background image */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="h-[120%] w-full object-cover"
        />
        <motion.div style={{ opacity }} className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </motion.div>

      <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="eyebrow mb-10"
        >
          ✦ &nbsp; Final word
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-5xl text-[clamp(3rem,10vw,9rem)] leading-[0.92]"
        >
          Ready to wear <em className="italic text-muted-foreground">your story?</em>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center gap-6"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-3 bg-foreground px-10 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-background transition-all hover:gap-5"
          >
            Start your consultation <span aria-hidden>→</span>
          </a>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Reply within 48h · By appointment only
          </p>
        </motion.div>
      </div>
    </section>
  );
}

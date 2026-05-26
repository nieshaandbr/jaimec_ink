import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Nav — fixed top bar. Minimal, editorial.
 * TODO: Update the nav links to match your real anchor IDs / routes.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#artist", label: "Artist" },
    { href: "#process", label: "Voices" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "backdrop-blur-md bg-background/60 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">Jaime C</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Ink
          </span>
        </a>

        <nav className="hidden gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/80 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#booking"
          className="group relative inline-flex items-center gap-2 border border-foreground/30 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background"
        >
          Book
          <span className="h-1 w-1 rounded-full bg-foreground transition-colors group-hover:bg-background" />
        </a>
      </div>
    </motion.header>
  );
}

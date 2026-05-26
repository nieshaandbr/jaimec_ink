import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import w1 from "@/assets/g_work1.jpg";
import w2 from "@/assets/g_work2.jpg";
import w3 from "@/assets/g_work3.jpg";
import w4 from "@/assets/g_work4.jpg";
import w5 from "@/assets/g_work5.jpg";
import w6 from "@/assets/g_work6.jpg";

/**
 * FeaturedWork — luxury exhibition-style masonry gallery.
 *
 * TODO (images): Replace the imports above with real tattoo photographs.
 * Drop new files into src/assets/ and update both `import` lines and the
 * `pieces` array below. Keep portraits/long-form for spine pieces.
 *
 * TODO (categories): Edit `CATEGORIES` to match the artist's actual offering.
 *
 * TODO (image optimization): For production, run images through a CDN
 * (Cloudflare Images / Imgix) or convert to WebP/AVIF before upload.
 * Lovable Cloud Storage also works — see /booking for the upload pattern.
 */

const CATEGORIES = [
  "All",
  "Fine Line",
  "Blackwork",
  "Realism",
  "Spine Pieces",
  "Custom Concepts",
  "Coverups",
] as const;

type Category = (typeof CATEGORIES)[number];

const pieces: { src: string; title: string; category: Category; ratio: string }[] = [
  { src: w1, title: "Threadwork I", category: "Realism", ratio: "aspect-[4/5]" },
  { src: w2, title: "Obsidian Cipher", category: "Custom Concepts", ratio: "aspect-[2/3]" },
  { src: w3, title: "Last Rose", category: "Fine Line", ratio: "aspect-[4/5]" },
  { src: w4, title: "Spine of Memory", category: "Realism", ratio: "aspect-[3/5]" },
  { src: w5, title: "Hymn No. IV", category: "Coverups", ratio: "aspect-[4/5]" },
  { src: w6, title: "Second Bloom", category: "Custom Concepts", ratio: "aspect-[4/5]" },
];

export function FeaturedWork() {
  const [filter, setFilter] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const visible = filter === "All" ? pieces : pieces.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6">✦ &nbsp; Selected work &nbsp; / &nbsp; 001 — 042</p>
            <h2 className="text-[clamp(2.5rem,7vw,6rem)]">
              The <em className="italic text-muted-foreground">archive.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A curated record of pieces made over the last seasons. Each commissioned,
            none repeated. Click any image for the full frame.
          </p>
        </div>

        {/* Filter row */}
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                filter === c ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.button
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: (i % 6) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => setLightbox(p.src)}
                className="group relative mb-4 block w-full overflow-hidden break-inside-avoid lg:mb-6"
              >
                <div className={`relative ${p.ratio} overflow-hidden bg-card`}>
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/30" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/70">
                        {p.category}
                      </p>
                      <p className="mt-1 font-display text-xl">{p.title}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                      View
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-xl p-6"
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              src={lightbox}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-[var(--shadow-cinema)]"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground"
            >
              [ Close ]
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

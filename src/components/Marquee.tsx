/**
 * Marquee — looping atmospheric strip between sections.
 * TODO: edit the words to match the artist's voice.
 */
export function Marquee() {
  const words = ["Fine Line", "✦", "Blackwork", "✦", "Realism", "✦", "Spine", "✦", "Custom", "✦", "Coverups", "✦"];
  return (
    <div className="relative overflow-hidden border-y border-border py-6 md:py-8">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 items-center gap-12 px-6">
            {words.map((w, i) => (
              <span
                key={i}
                className="font-display text-4xl text-foreground/70 md:text-6xl"
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

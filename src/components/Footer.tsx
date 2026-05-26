/**
 * Footer — minimal editorial sign-off.
 * TODO: Update studio address, contact, social handles below.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 md:grid-cols-4">
        <div className="col-span-2">
          <p className="font-display text-4xl">Jaime C <span className="italic text-muted-foreground">Ink</span></p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Private tattoo studio. By appointment only.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Studio</p>
          {/* TODO: replace with real address */}
          <p className="text-sm text-muted-foreground">
            42 Wilton Mews<br />London E2<br />United Kingdom
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Reach</p>
          <ul className="space-y-2 text-sm">
            {/* TODO: update handles */}
            <li><a className="link-underline" href="https://instagram.com/jaime.c.ink">Instagram</a></li>
            <li><a className="link-underline" href="#booking">Consultation</a></li>
            <li><a className="link-underline" href="mailto:hello@jaimecink.com">hello@jaimecink.com</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1600px] items-end justify-between border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>© {year} Jaime C Ink</span>
        <span>All work original · Never repeated</span>
      </div>
    </footer>
  );
}

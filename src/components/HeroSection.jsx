import { useState } from "react";

const links = ["Home", "Features", "About", "Contact"];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-1">
      <img src="/favicon.png" alt="Outflow logo" className="h-9 w-9 object-contain" />
      <span className="inline-block translate-y-1 text-[19x] font-semibold tracking-tight text-teal-500">Outflow</span>
    </a>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent text-white">
      <nav className="relative mx-auto flex h-[84px] max-w-[1420px] items-center justify-between px-4 sm:px-8 lg:px-14">
        {/* Left: logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Center: pill nav (tablet and up) */}
        <ul className="hidden items-center gap-9 rounded-full border border-white/10 bg-white/[0.04] px-20 py-1.5 md:flex">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-[13px] text-white/90 transition-colors hover:text-white"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: CTA + phone menu button */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <a href="#get-started" className="whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition hover:bg-white/85 sm:px-6">
            Get Started
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Phone menu: drops down under the header */}
        {menuOpen && (
          <ul
            id="mobile-menu"
            className="absolute inset-x-4 top-[76px] rounded-2xl border border-white/10 bg-black/90 p-2 backdrop-blur sm:inset-x-8 md:hidden"
          >
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

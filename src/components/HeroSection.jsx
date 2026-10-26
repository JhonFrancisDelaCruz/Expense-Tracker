const links = ["Home", "Features", "About", "Contact"];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-1">
      <img src="/public/favicon.png" alt="Outflow logo" className="h-9 w-9 object-contain" />
      <span className="inline-block translate-y-1 text-[19x] font-semibold tracking-tight text-teal-500">Outflow</span>
    </a>
  );
}

export default function HeroSection() {
  return (
   <header className="absolute top-0 left-0 z-50 w-full bg-transparent text-white">
      <nav className="mx-auto flex h-[84px] max-w-[1420px] items-center justify-between px-14">
        {/* Left: logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Center: pill nav */}
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

        {/* Right: CTA */}
        <div className="flex flex-1 justify-end">
          <a href="#get-started" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-medium text-black transition hover:bg-white/85">
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}
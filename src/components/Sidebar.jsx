import Icon, { Logo } from "./Icons";
import { NAV_ITEMS } from "../data/categories";

// Desktop + tablet navigation. Hidden on phones (MobileNav replaces it).
//   md  (768px+)  : narrow icon-only rail
//   lg  (1024px+) : full sidebar with text labels
export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-16 shrink-0 flex-col border-r border-line bg-sidebar p-3 md:flex lg:w-56 lg:p-4 xl:w-64 print:hidden">
      <div className="flex items-center justify-center gap-2 py-2 lg:justify-start lg:px-2">
        <Logo className="size-7 shrink-0 text-sage" />
        <span className="hidden text-base font-semibold tracking-tight lg:inline">
          Outflow
        </span>
      </div>

      <nav aria-label="Main" className="mt-6 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              type="button"
              title={item.label}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors lg:justify-start ${
                active ? "bg-white/10 text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
              }`}
            >
              <Icon name={item.icon} className="size-5 shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

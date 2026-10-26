import Icon from "./Icons";
import { NAV_ITEMS } from "../data/categories";
export default function MobileNav({ page, onNavigate }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-sidebar pb-[env(safe-area-inset-bottom)] md:hidden print:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active = page === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onNavigate(item.id)}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 px-0.5 py-2.5 text-[10px] transition-colors sm:text-[11px] ${
              active ? "text-sage" : "text-muted"
            }`}
          >
            <Icon name={item.icon} className="size-5" />
            <span className="w-full truncate text-center">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

import Icon from "./Icons";

// The rounded dark panel used everywhere. `title` is the small
// uppercase heading; the "..." button matches the Figma design.
export default function Card({ title, action, children, className = "" }) {
  return (
    <section className={`min-w-0 rounded-2xl border border-line bg-card p-4 sm:p-5 ${className}`}>
      {title && (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="truncate text-[11px] font-medium uppercase tracking-wider text-muted sm:text-xs">
            {title}
          </h2>
          {action ?? (
            <button
              type="button"
              aria-label="More options"
              className="-mr-1 grid size-7 shrink-0 place-items-center rounded-md text-muted hover:bg-white/5 hover:text-ink print:hidden"
            >
              <Icon name="more" className="size-4" />
            </button>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

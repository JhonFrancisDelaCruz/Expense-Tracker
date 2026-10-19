import Icon, { Logo } from "./Icons";

// Top bar: greeting on the left, gift / bell / Quick Add on the right.
// On phones the logo appears here (the sidebar is hidden) and the
// Quick Add button shrinks to just a "+" icon.
export default function Header({ name, onQuickAdd, budgetAlert }) {
  const iconButton =
    "relative grid size-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-ink";

  return (
    <header className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8 print:hidden">
      <Logo className="size-7 shrink-0 text-sage md:hidden" />

      <p className="min-w-0 flex-1 truncate font-serif text-base sm:text-xl">
        Welcome back, {name}
      </p>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <button type="button" aria-label="Rewards" className={`${iconButton} hidden sm:grid`}>
          <Icon name="gift" className="size-5" />
        </button>

        <button type="button" aria-label="Notifications" className={iconButton}>
          <Icon name="bell" className="size-5" />
          {budgetAlert && (
            <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-page" />
          )}
        </button>

        <button
          type="button"
          onClick={onQuickAdd}
          aria-label="Quick Add"
          className="inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-lg bg-accent px-2.5 text-sm font-medium text-page transition hover:brightness-110 sm:px-3.5"
        >
          <Icon name="plus" className="size-4" />
          <span className="hidden sm:inline">Quick Add</span>
        </button>
      </div>
    </header>
  );
}

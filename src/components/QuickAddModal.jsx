import { useEffect, useState } from "react";
import Icon from "./Icons";
import Field from "./Field";
import { inputClass } from "./formStyles";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from "../data/categories";
import { todayISO } from "../utils/format";

const blankForm = () => ({
  type: "expense",
  description: "",
  amount: "",
  category: EXPENSE_CATEGORIES[0],
  method: PAYMENT_METHODS[0],
  date: todayISO(),
});

// The "Quick Add" form.
//   phones : slides up from the bottom as a sheet (full width, scrolls if tall)
//   tablet/desktop : centered dialog
export default function QuickAddModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState("");

  // Start with a clean form every time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(blankForm());
      setError("");
    }
  }, [open]);

  // Close with Escape and stop the page behind from scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const categories = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const switchType = (type) =>
    setForm((f) => ({
      ...f,
      type,
      category: (type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES)[0],
    }));

  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.description.trim()) return setError("Please add a description.");
    if (!(amount > 0)) return setError("Enter an amount greater than 0.");
    onSave({ ...form, description: form.description.trim(), amount, id: Date.now() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-label="Quick add transaction"
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border border-line bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-w-md sm:rounded-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quick Add</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-md text-muted hover:bg-white/5 hover:text-ink"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        {/* Expense / Income switch */}
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-page p-1 text-sm">
          {["expense", "income"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchType(t)}
              aria-pressed={form.type === t}
              className={`rounded-md py-2 capitalize transition-colors ${
                form.type === t
                  ? t === "income"
                    ? "bg-income text-white"
                    : "bg-expense text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Description" htmlFor="qa-desc" className="sm:col-span-2">
            <input
              id="qa-desc"
              value={form.description}
              onChange={update("description")}
              placeholder="e.g. Supermarket"
              className={inputClass}
              autoFocus
            />
          </Field>

          <Field label="Amount" htmlFor="qa-amount">
            <input
              id="qa-amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={update("amount")}
              placeholder="0.00"
              className={inputClass}
            />
          </Field>

          <Field label="Date" htmlFor="qa-date">
            <input id="qa-date" type="date" value={form.date} onChange={update("date")} className={inputClass} />
          </Field>

          <Field label="Category" htmlFor="qa-cat">
            <select id="qa-cat" value={form.category} onChange={update("category")} className={inputClass}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Payment method" htmlFor="qa-method">
            <select id="qa-method" value={form.method} onChange={update("method")} className={inputClass}>
              {PAYMENT_METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-danger">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line px-4 text-sm hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 rounded-lg bg-accent px-5 text-sm font-medium text-page hover:brightness-110"
          >
            Save transaction
          </button>
        </div>
      </form>
    </div>
  );
}

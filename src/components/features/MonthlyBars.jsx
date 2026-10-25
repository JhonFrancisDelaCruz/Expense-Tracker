import { formatMoney } from "../../utils/format";

// Income vs expense bar chart built from plain divs (no chart library).
// Because it uses flexbox + percentage heights instead of a fixed-width
// canvas, it shrinks cleanly to a 375px phone screen and its labels stay readable.
export default function MonthlyBars({ months, currency }) {
  const max = Math.max(1, ...months.flatMap((m) => [m.income, m.expense]));

  return (
    <div>
      <div className="mb-4 flex gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-sage" /> Income
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-expense" /> Expense
        </span>
      </div>

      <div className="flex gap-2 sm:gap-4">
        {months.map((m) => (
          <div key={m.key} className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex h-40 items-end justify-center gap-1 border-b border-line sm:h-52">
              <div
                title={`${m.label} income: ${formatMoney(m.income, currency)}`}
                className="w-full max-w-6 rounded-t bg-sage"
                style={{ height: `${(m.income / max) * 100}%` }}
              />
              <div
                title={`${m.label} expense: ${formatMoney(m.expense, currency)}`}
                className="w-full max-w-6 rounded-t bg-expense"
                style={{ height: `${(m.expense / max) * 100}%` }}
              />
            </div>
            <span className="text-center text-xs text-muted">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

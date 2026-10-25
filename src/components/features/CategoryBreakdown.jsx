import { formatMoney } from "../../utils/format";

// Horizontal bars showing where this month's money went.
export default function CategoryBreakdown({ spending, currency }) {
  const entries = Object.entries(spending).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...entries.map(([, v]) => v));

  if (entries.length === 0) {
    return <p className="py-6 text-center text-sm text-muted">No spending this month yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {entries.map(([category, amount]) => (
        <li key={category}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{category}</span>
            <span className="shrink-0 tabular-nums text-muted">{formatMoney(amount, currency)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-sage" style={{ width: `${(amount / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

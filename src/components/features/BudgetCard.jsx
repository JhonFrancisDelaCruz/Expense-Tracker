import Card from "../common/Card";
import { formatMoney } from "../../utils/format";

// Monthly budget cap with a progress bar.
// Bar colour: sage under 80%, orange 80-100%, red once you are over budget.
export default function BudgetCard({ monthName, spent, cap, currency }) {
  const pct = cap > 0 ? Math.round((spent / cap) * 100) : 0;
  const width = Math.min(pct, 100);
  const fill = pct > 100 ? "bg-danger" : pct >= 80 ? "bg-accent" : "bg-sage";
  const over = spent > cap;

  return (
    <Card title={`${monthName} Budget Cap (${formatMoney(cap, currency)})`}>
      {/* The % label follows the end of the bar but never leaves the card. */}
      <div className="relative h-5 text-xs">
        <span
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `clamp(1rem, ${width}%, calc(100% - 1rem))` }}
        >
          {pct}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Budget used"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={width}
        className="h-2.5 overflow-hidden rounded-full bg-danger/25"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${fill}`}
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs">
        <span className="text-sage">Sage</span>
        <span className="text-danger">Red Alert</span>
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
        <p>
          <span className="text-muted">Spent </span>
          <span className="font-medium">{formatMoney(spent, currency)}</span>
        </p>
        <p>
          <span className="text-muted">{over ? "Over by " : "Remaining "}</span>
          <span className={`font-medium ${over ? "text-danger" : ""}`}>
            {formatMoney(Math.abs(cap - spent), currency)}
          </span>
        </p>
      </div>
    </Card>
  );
}

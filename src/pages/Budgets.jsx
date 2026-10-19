import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import BudgetCard from "../components/BudgetCard";
import Field from "../components/Field";
import { inputClass } from "../components/formStyles";
import { EXPENSE_CATEGORIES } from "../data/categories";
import { formatMoney } from "../utils/format";

// Overall monthly cap + one card per category with an editable limit.
// Grid: 1 column (phone) -> 2 columns (640px+) -> 3 columns (1280px+).
export default function Budgets({ summary, spending, settings, onUpdateSettings }) {
  const { currency, categoryBudgets } = settings;

  const setLimit = (category, value) =>
    onUpdateSettings({
      categoryBudgets: { ...categoryBudgets, [category]: Number(value) || 0 },
    });

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Budgets" subtitle={`Spending limits for ${summary.monthName}.`} />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <BudgetCard
          monthName={summary.monthName}
          spent={summary.expense}
          cap={summary.cap}
          currency={currency}
        />
        <Card title="Monthly cap">
          <Field label="Total monthly budget" htmlFor="cap">
            <input
              id="cap"
              type="number"
              min="0"
              inputMode="decimal"
              value={settings.monthlyCap || ""}
              placeholder="0"
              onChange={(e) => onUpdateSettings({ monthlyCap: Number(e.target.value) || 0 })}
              className={inputClass}
            />
          </Field>
          <p className="mt-3 text-xs text-muted">
            The bar turns orange at 80% and red when you go over.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {EXPENSE_CATEGORIES.map((category) => {
          const spent = spending[category] || 0;
          const limit = categoryBudgets[category] || 0;
          const pct = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
          const over = limit > 0 && spent > limit;
          const bar = over ? "bg-danger" : pct >= 80 ? "bg-accent" : "bg-sage";

          return (
            <Card key={category} title={category} action={<span />}>
              <p className="flex flex-wrap items-baseline justify-between gap-x-2 text-sm">
                <span className="font-medium">{formatMoney(spent, currency)}</span>
                <span className="text-xs text-muted">of {formatMoney(limit, currency)}</span>
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
              </div>
              <Field label="Monthly limit" htmlFor={`limit-${category}`} className="mt-4">
                <input
                  id={`limit-${category}`}
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={limit || ""}
                  placeholder="0"
                  onChange={(e) => setLimit(category, e.target.value)}
                  className={inputClass}
                />
              </Field>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

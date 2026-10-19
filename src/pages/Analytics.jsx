import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import MonthlyBars from "../components/MonthlyBars";
import CategoryBreakdown from "../components/CategoryBreakdown";
import { formatMoney } from "../utils/format";
import { lastMonthKeys, monthName, totalsFor } from "../utils/stats";

function StatTile({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-card p-4">
      <p className="truncate text-xs text-muted">{label}</p>
      <p className="mt-1 break-words text-lg font-semibold sm:text-xl">{value}</p>
    </div>
  );
}

// Charts + quick stats.
// Stat tiles: 2 columns on phones, 4 on desktop.
// Charts: stacked on phones/tablets, 2/3 + 1/3 split from 1024px.
export default function Analytics({ summary, spending, transactions, currency }) {
  const months = lastMonthKeys(6).map((key) => ({
    key,
    label: monthName(key, "short"),
    ...totalsFor(transactions, key),
  }));

  const savingsRate = summary.income > 0 ? Math.round((summary.net / summary.income) * 100) : 0;
  const daysSoFar = new Date().getDate();
  const topCategory = Object.entries(spending).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Analytics" subtitle="How your money moves over time." />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatTile label="Savings rate" value={`${savingsRate}%`} />
        <StatTile label="Avg. daily spend" value={formatMoney(summary.expense / daysSoFar, currency)} />
        <StatTile label="Top category" value={topCategory ? topCategory[0] : "—"} />
        <StatTile label="Transactions" value={transactions.length} />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card title="Income vs expense (6 months)" className="lg:col-span-2">
          <MonthlyBars months={months} currency={currency} />
        </Card>
        <Card title={`Spending by category · ${summary.monthName}`}>
          <CategoryBreakdown spending={spending} currency={currency} />
        </Card>
      </div>
    </div>
  );
}

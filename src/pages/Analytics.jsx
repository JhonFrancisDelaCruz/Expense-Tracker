import { useMemo } from "react";
import PageTitle from "../components/common/PageTitle";
import Card from "../components/common/Card";
import MonthlyBars from "../components/features/MonthlyBars";
import CategoryBreakdown from "../components/features/CategoryBreakdown";
import { formatMoney } from "../utils/format";
import { lastMonthKeys, monthName, totalsFor } from "../utils/stats";
import "../styles/pages/Analytics.css";

// Captured once at module load — the day-of-month does not change within a session.
const TODAY_DAY = new Date().getDate();

function StatTile({ label, value }) {
  return (
    <div className="analytics-stat-tile">
      <p className="truncate text-xs text-muted">{label}</p>
      <p className="mt-1 break-words text-lg font-semibold sm:text-xl">{value}</p>
    </div>
  );
}

// Analytics view: Visual charts and metrics for monthly spending patterns.
export default function Analytics({ summary, spending, transactions, currency }) {
  const months = useMemo(
    () =>
      lastMonthKeys(6).map((key) => ({
        key,
        label: monthName(key, "short"),
        ...totalsFor(transactions, key),
      })),
    [transactions],
  );

  const savingsRate = summary.income > 0 ? Math.round((summary.net / summary.income) * 100) : 0;
  const topCategory = useMemo(
    () => Object.entries(spending).sort((a, b) => b[1] - a[1])[0],
    [spending],
  );

  return (
    <div className="analytics-page space-y-4 sm:space-y-6">
      <PageTitle title="Analytics" subtitle="How your money moves over time." />

      <div className="analytics-stats-grid">
        <StatTile label="Savings rate" value={`${savingsRate}%`} />
        <StatTile label="Avg. daily spend" value={formatMoney(summary.expense / TODAY_DAY, currency)} />
        <StatTile label="Top category" value={topCategory ? topCategory[0] : "—"} />
        <StatTile label="Transactions" value={transactions.length} />
      </div>

      <div className="analytics-charts-grid">
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

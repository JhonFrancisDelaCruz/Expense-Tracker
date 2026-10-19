import Card from "./Card";
import { formatMoney } from "../utils/format";

// "Total Net Balance" with the Income (green) and Expense (red) tiles.
// The tiles sit side by side at every width: they are 2 equal grid columns.
export default function BalanceCard({ net, income, expense, currency }) {
  return (
    <Card title="Total Net Balance">
      <p className="break-words text-3xl font-semibold tracking-tight sm:text-4xl">
        {formatMoney(net, currency)}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-lg bg-income p-3 text-white">
          <p className="text-xs opacity-80">Income</p>
          <p className="mt-1 break-words text-base font-medium sm:text-lg">
            {formatMoney(income, currency)}
          </p>
        </div>
        <div className="min-w-0 rounded-lg bg-expense p-3 text-white">
          <p className="text-xs opacity-80">Expense</p>
          <p className="mt-1 break-words text-base font-medium sm:text-lg">
            {formatMoney(expense, currency)}
          </p>
        </div>
      </div>
    </Card>
  );
}

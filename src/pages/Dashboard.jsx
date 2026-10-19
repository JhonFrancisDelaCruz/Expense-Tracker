import PageTitle from "../components/PageTitle";
import BalanceCard from "../components/BalanceCard";
import BudgetCard from "../components/BudgetCard";
import TransactionsPanel from "../components/TransactionsPanel";

// Matches the Figma screen: balance + budget side by side, transactions below.
// Phones stack the two top cards (1 column); 768px+ puts them in 2 columns.
export default function Dashboard({ summary, transactions, currency }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Dashboard" />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <BalanceCard
          net={summary.net}
          income={summary.income}
          expense={summary.expense}
          currency={currency}
        />
        <BudgetCard
          monthName={summary.monthName}
          spent={summary.expense}
          cap={summary.cap}
          currency={currency}
        />
      </div>

      <TransactionsPanel transactions={transactions} currency={currency} limit={5} />
    </div>
  );
}

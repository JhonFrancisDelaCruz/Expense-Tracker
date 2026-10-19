import PageTitle from "../components/PageTitle";
import TransactionsPanel from "../components/TransactionsPanel";

// Every transaction, with search, filters, CSV export and delete.
export default function Transactions({ transactions, currency, onDelete }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Transactions" subtitle="Search, filter, export or remove entries." />
      <TransactionsPanel
        title="All Transactions"
        transactions={transactions}
        currency={currency}
        onDelete={onDelete}
      />
    </div>
  );
}

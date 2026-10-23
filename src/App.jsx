import { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import Header from "./components/Header";
import QuickAddModal from "./components/QuickAddModal";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import useLocalStorage from "./hooks/useLocalStorage";
import { DEFAULT_SETTINGS, makeSeed } from "./data/seed";
import { currentMonthKey, monthName, spendByCategory, totalsFor } from "./utils/stats";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useLocalStorage("expensepro.transactions", makeSeed);
  const [settings, setSettings] = useLocalStorage("expensepro.settings", DEFAULT_SETTINGS);

  // Jump back to the top whenever you switch pages.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Numbers for the current month, shared by several pages.
  const monthKey = currentMonthKey();
  const summary = useMemo(() => {
    const totals = totalsFor(transactions, monthKey);
    return { ...totals, cap: settings.monthlyCap, monthName: monthName(monthKey) };
  }, [transactions, monthKey, settings.monthlyCap]);
  const spending = useMemo(() => spendByCategory(transactions, monthKey), [transactions, monthKey]);

  const budgetAlert = summary.cap > 0 && summary.expense / summary.cap >= 0.8;

  const addTransaction = (t) => setTransactions((list) => [t, ...list]);
  const deleteTransaction = (id) => setTransactions((list) => list.filter((t) => t.id !== id));
  const updateSettings = (changes) => setSettings((s) => ({ ...s, ...changes }));
  const closeModal = useCallback(() => setModalOpen(false), []);

  const pages = {
    dashboard: (
      <Dashboard summary={summary} transactions={transactions} currency={settings.currency} />
    ),
    transactions: (
      <Transactions
        transactions={transactions}
        currency={settings.currency}
        onDelete={deleteTransaction}
      />
    ),
    budgets: (
      <Budgets
        summary={summary}
        spending={spending}
        settings={settings}
        onUpdateSettings={updateSettings}
      />
    ),
    analytics: (
      <Analytics
        summary={summary}
        spending={spending}
        transactions={transactions}
        currency={settings.currency}
      />
    ),
    settings: (
      <Settings
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSample={() => setTransactions(makeSeed())}
        onClearAll={() => setTransactions([])}
      />
    ),
  };

  return (
    <div className="min-h-dvh md:flex">
      <Sidebar page={page} onNavigate={setPage} />

      {/* min-w-0 lets this column shrink instead of overflowing the screen.
          Header and page share one max-width box so they stay aligned on wide screens. */}
      <div className="min-w-0 flex-1">
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col">
          <Header
            name={settings.name}
            budgetAlert={budgetAlert}
            onQuickAdd={() => setModalOpen(true)}
          />
          {/* Extra bottom padding on phones so the bottom tab bar never covers content */}
          <main className="flex-1 px-4 pb-24 sm:px-6 md:pb-10 lg:px-8">{pages[page]}</main>
        </div>
      </div>

      <MobileNav page={page} onNavigate={setPage} />
      <QuickAddModal open={modalOpen} onClose={closeModal} onSave={addTransaction} />
    </div>
  );
}
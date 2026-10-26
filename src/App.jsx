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
import Home from "./pages/Home";
import useLocalStorage from "./hooks/useLocalStorage";
import { DEFAULT_SETTINGS, makeSeed } from "./data/seed";
import { currentMonthKey, monthName, spendByCategory, totalsFor } from "./utils/stats";

export default function App() {
  const [page, setPage] = useState("home"); // start on Home
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

  const theme = settings.theme ?? "system"; // old saved settings have no theme yet

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved = theme === "system" ? (mq.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = resolved;
    };
    apply();
    mq.addEventListener("change", apply); // follows the OS while on "System"
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

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
    onLogout={() => setPage("home")}
  />
),
  };

  if (page === "home") {
    return <Home onGetStarted={() => setPage("dashboard")} />;
  }

  return (
    <div className="min-h-dvh md:flex">
      <Sidebar page={page} onNavigate={setPage} />

      <div className="min-w-0 flex-1">
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col">
          <Header
            name={settings.name}
            budgetAlert={budgetAlert}
            onQuickAdd={() => setModalOpen(true)}
          />
          <main className="flex-1 px-4 pb-24 sm:px-6 md:pb-10 lg:px-8">{pages[page]}</main>
        </div>
      </div>

      <MobileNav page={page} onNavigate={setPage} />
      <QuickAddModal open={modalOpen} onClose={closeModal} onSave={addTransaction} />
    </div>
  );
}
// Fixed lists used by forms, filters and the budgets page.

export const EXPENSE_CATEGORIES = [
  "Housing",
  "Groceries",
  "Utilities",
  "Transport",
  "Dining",
  "Entertainment",
  "Health",
  "Education",
];

export const INCOME_CATEGORIES = ["Salary", "Client Retainer", "Freelance"];

export const PAYMENT_METHODS = ["Bank Transfer", "Credit Card", "PayPal", "Cash"];

export const CURRENCIES = [
  { code: "USD", label: "US Dollar ($)" },
  { code: "PHP", label: "Philippine Peso (₱)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "British Pound (£)" },
];

// Sidebar (desktop/tablet) and bottom bar (mobile) share this list.
export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "transactions", label: "Transactions", icon: "transactions" },
  { id: "budgets", label: "Budgets", icon: "budgets" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "settings", label: "Settings", icon: "settings" },
];

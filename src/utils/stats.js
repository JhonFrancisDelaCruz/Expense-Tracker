// Calculations used by the dashboard, budgets and analytics pages.
// A "month key" is just "YYYY-MM", e.g. "2026-10".

export const monthOf = (isoDate) => isoDate.slice(0, 7);

export function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function monthName(key, style = "long") {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString("en-US", { month: style });
}

// The last `count` month keys, oldest first, ending with this month.
export function lastMonthKeys(count) {
  const now = new Date();
  const keys = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return keys;
}

export function totalsFor(transactions, key) {
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (monthOf(t.date) !== key) continue;
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  }
  return { income, expense, net: income - expense };
}

// { Groceries: 124.5, Housing: 1000, ... } for expenses in one month
export function spendByCategory(transactions, key) {
  const result = {};
  for (const t of transactions) {
    if (t.type !== "expense" || monthOf(t.date) !== key) continue;
    result[t.category] = (result[t.category] || 0) + t.amount;
  }
  return result;
}

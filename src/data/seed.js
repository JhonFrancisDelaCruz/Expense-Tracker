// Sample data so the app looks alive on first launch.
// Dates are generated relative to today, so "this month" always has data.

export const DEFAULT_SETTINGS = {
  name: "Francis D.",
  currency: "USD",
  monthlyCap: 2500,
  categoryBudgets: {
    Housing: 1000,
    Groceries: 400,
    Utilities: 200,
    Transport: 150,
    Dining: 200,
    Entertainment: 100,
    Health: 150,
    Education: 300,
  },
};

const pad = (n) => String(n).padStart(2, "0");

export function makeSeed() {
  const now = new Date();
  let id = 1;

  // monthsAgo = 0 means the current month
  const iso = (monthsAgo, day) => {
    const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const tx = (monthsAgo, day, description, category, method, amount, type = "expense") => ({
    id: id++,
    date: iso(monthsAgo, day),
    description,
    category,
    method,
    amount,
    type,
  });

  const list = [
    // This month: income 12,450.00 / expenses 1,850.00 (74% of the 2,500 cap)
    tx(0, 1, "Monthly Salary", "Salary", "Bank Transfer", 8000, "income"),
    tx(0, 1, "Website Project", "Freelance", "PayPal", 3800, "income"),
    tx(0, 3, "Client Retainer", "Client Retainer", "Bank Transfer", 650, "income"),
    tx(0, 2, "Apartment Rent", "Housing", "Bank Transfer", 1000),
    tx(0, 3, "Supermarket", "Groceries", "PayPal", 124.5),
    tx(0, 3, "Electric Utility", "Utilities", "Bank Transfer", 85),
    tx(0, 5, "Internet Bill", "Utilities", "Credit Card", 65),
    tx(0, 6, "Gym Membership", "Health", "Credit Card", 45),
    tx(0, 8, "Restaurant Dinner", "Dining", "Credit Card", 78.5),
    tx(0, 10, "Fuel", "Transport", "Cash", 60),
    tx(0, 12, "Movie Night", "Entertainment", "Cash", 32),
    tx(0, 14, "Pharmacy", "Health", "Cash", 40),
    tx(0, 15, "Online Course", "Education", "Credit Card", 320),
  ];

  // Five earlier months so the Analytics chart has history.
  for (let m = 1; m <= 5; m++) {
    list.push(
      tx(m, 1, "Monthly Salary", "Salary", "Bank Transfer", 8000, "income"),
      tx(m, 3, "Client Retainer", "Client Retainer", "Bank Transfer", 650 + m * 150, "income"),
      tx(m, 20, "Freelance Gig", "Freelance", "PayPal", 1800 + ((m * 700) % 2400), "income"),
      tx(m, 2, "Apartment Rent", "Housing", "Bank Transfer", 1000),
      tx(m, 6, "Supermarket", "Groceries", "Credit Card", 300 + ((m * 47) % 120)),
      tx(m, 9, "Utilities", "Utilities", "Bank Transfer", 140),
      tx(m, 14, "Dining Out", "Dining", "Credit Card", 90 + m * 12),
      tx(m, 18, "Transport", "Transport", "Cash", 120),
      tx(m, 21, "Entertainment", "Entertainment", "Cash", 60 + ((m * 23) % 50)),
    );
  }

  return list;
}

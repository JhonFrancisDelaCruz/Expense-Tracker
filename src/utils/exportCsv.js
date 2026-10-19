// Turns a list of transactions into a CSV file and downloads it.

export function downloadCsv(rows, filename = "transactions.csv") {
  const header = ["Date", "Description", "Category", "Payment Method", "Type", "Amount"];
  const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;

  const lines = [
    header.join(","),
    ...rows.map((t) =>
      [t.date, t.description, t.category, t.method, t.type, t.amount].map(quote).join(","),
    ),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

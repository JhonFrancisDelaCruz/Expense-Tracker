import { useMemo, useState } from "react";
import Card from "./Card";
import Icon from "./Icons";
import CategoryBadge from "./CategoryBadge";
import { inputClass } from "./formStyles";
import { formatDate, formatMoney } from "../utils/format";
import { downloadCsv } from "../utils/exportCsv";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../data/categories";

// Transactions card used on the Dashboard (limit = 5) and the
// Transactions page (all rows + delete buttons).
//
// Responsive idea:
//   phones  (< 768px)  : each transaction is a stacked "row card", no table
//   tablet  (768px+)   : real table, Payment Method column hidden to save room
//   desktop (1024px+)  : full table with every column
export default function TransactionsPanel({
  title = "Recent Transactions",
  transactions,
  currency,
  limit,
  onDelete,
}) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | type:income | cat:Groceries ...
  const [newestFirst, setNewestFirst] = useState(true);

  const filtered = useMemo(() => {
    const q = text.trim().toLowerCase();
    let list = [...transactions];

    if (q) {
      list = list.filter((t) =>
        [t.description, t.category, t.method].some((v) => v.toLowerCase().includes(q)),
      );
    }
    if (filter.startsWith("type:")) list = list.filter((t) => t.type === filter.slice(5));
    if (filter.startsWith("cat:")) list = list.filter((t) => t.category === filter.slice(4));

    list.sort((a, b) =>
      newestFirst
        ? b.date.localeCompare(a.date) || b.id - a.id
        : a.date.localeCompare(b.date) || a.id - b.id,
    );
    return list;
  }, [transactions, text, filter, newestFirst]);

  const rows = limit ? filtered.slice(0, limit) : filtered;

  const amountText = (t) => (
    <span className={t.type === "income" ? "text-sage" : "text-danger"}>
      {t.type === "income" ? "+" : "-"}
      {formatMoney(t.amount, currency)}
    </span>
  );

  const deleteButton = (t) => (
    <button
      type="button"
      onClick={() => onDelete(t.id)}
      aria-label={`Delete ${t.description}`}
      className="grid size-8 shrink-0 place-items-center rounded-md text-muted hover:bg-white/5 hover:text-danger print:hidden"
    >
      <Icon name="trash" className="size-4" />
    </button>
  );

  return (
    <Card title={title}>
      {rows.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">No transactions found.</p>
      ) : (
        <>
          {/* PHONES: stacked list */}
          <ul className="divide-y divide-line md:hidden">
            {rows.map((t) => (
              <li key={t.id} className="py-3 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t.description}</p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {formatDate(t.date)} · {t.method}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium tabular-nums">{amountText(t)}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <CategoryBadge category={t.category} type={t.type} />
                  {onDelete && deleteButton(t)}
                </div>
              </li>
            ))}
          </ul>

          {/* TABLET + DESKTOP: table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted">
                  <th className="pb-3 pr-4 font-normal">
                    <button
                      type="button"
                      onClick={() => setNewestFirst((v) => !v)}
                      className="inline-flex items-center gap-1 hover:text-ink"
                    >
                      Date
                      <Icon
                        name="chevron"
                        className={`size-3.5 transition-transform ${newestFirst ? "" : "rotate-180"}`}
                      />
                    </button>
                  </th>
                  <th className="w-full pb-3 pr-4 font-normal">Description</th>
                  <th className="pb-3 pr-4 font-normal">Category</th>
                  <th className="hidden pb-3 pr-4 font-normal lg:table-cell">Payment Method</th>
                  <th className="pb-3 text-right font-normal">Amount</th>
                  {onDelete && <th className="w-10 pb-3" />}
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id} className="border-t border-line">
                    <td className="whitespace-nowrap py-3 pr-4 text-muted">{formatDate(t.date)}</td>
                    <td className="max-w-0 truncate py-3 pr-4">{t.description}</td>
                    <td className="whitespace-nowrap py-3 pr-4">
                      <CategoryBadge category={t.category} type={t.type} />
                    </td>
                    <td className="hidden whitespace-nowrap py-3 pr-4 text-muted lg:table-cell">
                      {t.method}
                    </td>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums">{amountText(t)}</td>
                    {onDelete && <td className="py-3 pl-2 text-right">{deleteButton(t)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Filters (left) and export buttons (right). Stacks on phones. */}
      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
          <div className="relative sm:w-44">
            <Icon
              name="filter"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Filter"
              aria-label="Search transactions"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter by type or category"
            className={`${inputClass} sm:w-44`}
          >
            <option value="all">Filters by</option>
            <optgroup label="Type">
              <option value="type:income">Income</option>
              <option value="type:expense">Expenses</option>
            </optgroup>
            <optgroup label="Category">
              {[...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map((c) => (
                <option key={c} value={`cat:${c}`}>
                  {c}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-1 text-xs text-muted">Export</span>
          <button
            type="button"
            onClick={() => downloadCsv(filtered)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-xs hover:bg-white/5"
          >
            <Icon name="file" className="size-4" /> CSV
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-xs hover:bg-white/5"
          >
            <Icon name="file" className="size-4" /> PDF
          </button>
        </div>
      </div>
    </Card>
  );
}

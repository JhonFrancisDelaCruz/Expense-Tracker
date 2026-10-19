// Small pill showing a category. Income = gold, expense = sage (as in the design).
export default function CategoryBadge({ category, type }) {
  const color =
    type === "income"
      ? "border-gold/60 bg-gold/15 text-gold"
      : "border-sage/50 bg-sage/10 text-sage";

  return (
    <span
      className={`inline-block max-w-full truncate rounded-md border px-2 py-0.5 text-xs ${color}`}
    >
      {category}
    </span>
  );
}

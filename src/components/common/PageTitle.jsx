// The big page heading ("Dashboard", "Budgets", ...).
export default function PageTitle({ title, subtitle }) {
  return (
    <div className="pt-1">
      <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

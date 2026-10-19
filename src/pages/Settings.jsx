import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import Field from "../components/Field";
import { inputClass } from "../components/formStyles";
import { CURRENCIES } from "../data/categories";

// Profile name, currency and data reset. Single column, capped at a
// comfortable reading width on large screens.
export default function Settings({ settings, onUpdateSettings, onResetSample, onClearAll }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Settings" />

      <div className="grid max-w-2xl gap-4 sm:gap-6">
        <Card title="Profile">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Display name" htmlFor="name">
              <input
                id="name"
                value={settings.name}
                onChange={(e) => onUpdateSettings({ name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Currency" htmlFor="currency">
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => onUpdateSettings({ currency: e.target.value })}
                className={inputClass}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card title="Your data">
          <p className="mb-4 text-sm text-muted">
            Everything is saved in this browser only. Nothing is sent to a server.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => window.confirm("Replace your data with the sample data?") && onResetSample()}
              className="h-10 rounded-lg border border-line px-4 text-sm hover:bg-white/5"
            >
              Load sample data
            </button>
            <button
              type="button"
              onClick={() => window.confirm("Delete all transactions? This cannot be undone.") && onClearAll()}
              className="h-10 rounded-lg border border-danger/50 px-4 text-sm text-danger hover:bg-danger/10"
            >
              Delete all transactions
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

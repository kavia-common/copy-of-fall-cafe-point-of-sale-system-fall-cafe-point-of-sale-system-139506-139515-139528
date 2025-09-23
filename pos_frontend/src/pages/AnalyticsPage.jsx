import React from 'react';
import { useAppData } from '../state/AppDataContext';

function currency(x) { return `$${x.toFixed(2)}`; }

// PUBLIC_INTERFACE
export default function AnalyticsPage() {
  /** Sales analytics overview with KPI cards and placeholder charts. */
  const { totals } = useAppData();

  const KPICard = ({ label, value, hint, tone = 'primary' }) => (
    <div className="card" style={{ padding: 16 }}>
      <div className="kpi">
        <div className="label">{label}</div>
        <div className="value" style={{ color: tone === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
          {value}
        </div>
        {hint && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{hint}</div>}
      </div>
    </div>
  );

  return (
    <div className="analytics-grid">
      <div className="kpi-grid">
        <KPICard label="Total Sales" value={currency(totals.sales)} hint="All time closed orders" />
        <KPICard label="Today Sales" value={currency(totals.todaySales)} hint="Closed today" tone="secondary" />
        <KPICard label="Orders" value={totals.orders} hint="All orders" />
        <KPICard label="Open Orders" value={totals.openOrders} hint="Needs attention" />
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="section-title" style={{ marginBottom: 12 }}>Weekly Sales</div>
        <div className="chart" role="img" aria-label="Weekly sales area chart placeholder" />
        <div className="legend" style={{ marginTop: 10 }}>
          <span><span className="dot" /> Sales</span>
          <span><span className="dot secondary" /> Orders</span>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="section-title" style={{ marginBottom: 12 }}>Top Categories</div>
        <div className="chart" role="img" aria-label="Top categories chart placeholder" />
        <div className="legend" style={{ marginTop: 10 }}>
          <span><span className="dot" /> Beverages</span>
          <span><span className="dot secondary" /> Food</span>
        </div>
      </div>
    </div>
  );
}

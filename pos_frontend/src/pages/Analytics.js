import React from 'react';

// PUBLIC_INTERFACE
export default function Analytics() {
  /** Analytics dashboard placeholders for sales, AOV, top items. */
  return (
    <div>
      <div className="section-title">Analytics</div>
      <div className="subtle">Sales overview and seasonal performance (placeholders)</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 16 }}>
        <KPI label="Today Sales" value="$1,842" />
        <KPI label="AOV" value="$12.33" />
        <KPI label="Orders" value="149" />
        <KPI label="Eco-Points Awarded" value="386" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
        <div className="card" style={{ padding: 12, minHeight: 260 }}>
          <h3 style={{ marginTop: 0 }}>Sales Trend</h3>
          <PlaceholderChart />
        </div>
        <div className="card" style={{ padding: 12, minHeight: 260 }}>
          <h3 style={{ marginTop: 0 }}>Top Items</h3>
          <ul>
            <li>Pumpkin Spice Latte</li>
            <li>Maple Oat Latte</li>
            <li>Apple Cider</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div className="subtle">{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function PlaceholderChart() {
  return (
    <div style={{ height: 200, border: '1px dashed #E5E7EB', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#6B7280' }}>
      Chart Library Placeholder
    </div>
  );
}

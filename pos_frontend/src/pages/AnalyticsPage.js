import React, { useMemo } from 'react';
import SimpleBarChart from '../components/Analytics/SimpleBarChart';

// PUBLIC_INTERFACE
export default function AnalyticsPage() {
  const weekly = useMemo(() => ([
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 150 },
    { label: 'Wed', value: 180 },
    { label: 'Thu', value: 210 },
    { label: 'Fri', value: 260 },
    { label: 'Sat', value: 320 },
    { label: 'Sun', value: 280 },
  ]), []);

  const kpis = [
    { label: 'Today Revenue', value: '$1,842', icon: '💰' },
    { label: 'Avg. Ticket', value: '$12.45', icon: '🧾' },
    { label: 'Seasonal Share', value: '38%', icon: '🍂' },
    { label: 'Orders', value: '148', icon: '☕' },
  ];

  const topSellers = [
    { name: 'Pumpkin Spice Latte', share: 22 },
    { name: 'Maple Cappuccino', share: 16 },
    { name: 'Cranberry Scone', share: 12 },
    { name: 'Butternut Soup', share: 9 },
  ];

  return (
    <div className="row">
      <div className="col" style={{ flex: '1 1 100%' }}>
        <div className="row">
          {kpis.map((k) => (
            <div className="col" key={k.label}>
              <div className="card kpi">
                <div style={{ fontSize: 24 }}>{k.icon}</div>
                <div>
                  <div className="label">{k.label}</div>
                  <div className="value">{k.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col" style={{ flex: '1 1 60%' }}>
        <SimpleBarChart data={weekly} />
      </div>

      <div className="col" style={{ flex: '1 1 40%' }}>
        <div className="card">
          <div className="card-title">Top Seasonal Sellers</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topSellers.map((t) => (
              <li key={t.name} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{t.name}</div>
                  <div style={{ color: 'var(--color-muted)' }}>{t.share}%</div>
                </div>
                <div style={{ height: 8, background: 'rgba(30,58,138,0.12)', borderRadius: 999 }}>
                  <div
                    style={{
                      width: `${t.share}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, rgba(245,158,11,0.95), rgba(30,58,138,0.95))',
                      borderRadius: 999
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="divider" />
          <div className="badge">Insight</div>
          <div style={{ marginTop: 8, color: 'var(--color-muted)' }}>
            Seasonal beverages drive the afternoon peak. Consider a 3-5pm "Autumn Happy Hour" promo.
          </div>
        </div>
      </div>
    </div>
  );
}

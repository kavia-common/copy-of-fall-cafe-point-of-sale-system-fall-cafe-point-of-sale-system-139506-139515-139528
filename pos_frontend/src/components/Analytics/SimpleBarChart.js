import React from 'react';

// PUBLIC_INTERFACE
export default function SimpleBarChart({ data, maxHeight = 140 }) {
  const max = Math.max(1, ...data.map(d => d.value));
  return (
    <div className="card">
      <div className="card-title">Weekly Sales</div>
      <div style={{ display: 'flex', alignItems: 'end', gap: 10, height: maxHeight }}>
        {data.map((d) => {
          const h = (d.value / max) * (maxHeight - 20);
          return (
            <div key={d.label} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  height: h,
                  background: `linear-gradient(180deg, rgba(30,58,138,0.9), rgba(245,158,11,0.9))`,
                  borderRadius: 10,
                  border: '1px solid rgba(17,24,39,0.15)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                aria-label={`${d.label} ${d.value}`}
                title={`${d.label}: ${d.value}`}
              />
              <div style={{ marginTop: 6, fontSize: 12, color: 'var(--color-muted)' }}>{d.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

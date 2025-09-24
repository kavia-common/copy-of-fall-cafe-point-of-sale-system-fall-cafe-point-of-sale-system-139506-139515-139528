import React from 'react';

// PUBLIC_INTERFACE
export default function MenuGrid({ items, onAdd }) {
  return (
    <div className="row" style={{ gap: 12 }}>
      {items.map((it) => (
        <button
          key={it.id}
          className="card"
          style={{ width: 180, textAlign: 'left', cursor: 'pointer' }}
          onClick={() => onAdd(it)}
        >
          <div className="badge" style={{ marginBottom: 8 }}>
            {it.category === 'Drinks' ? '🥤' : it.category === 'Bakery' ? '🥐' : '🍽️'} {it.category}
          </div>
          <div style={{ fontWeight: 700 }}>{it.name}</div>
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>{it.description}</div>
          <div className="divider" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800 }}>${it.price.toFixed(2)}</div>
            <div className="btn secondary" style={{ padding: '6px 10px' }}>Add</div>
          </div>
        </button>
      ))}
    </div>
  );
}

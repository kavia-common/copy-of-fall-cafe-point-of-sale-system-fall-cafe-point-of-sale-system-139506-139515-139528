import React, { useMemo } from 'react';

// PUBLIC_INTERFACE
export default function CartPanel({ lines, onInc, onDec, onRemove, onCheckout }) {
  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [lines]);

  return (
    <div className="card" style={{ position: 'sticky', top: 84 }}>
      <div className="card-title">Current Order</div>
      {lines.length === 0 ? (
        <div style={{ color: 'var(--color-muted)' }}>No items yet. Select from the menu to add.</div>
      ) : (
        <table className="table" aria-label="Cart items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th style={{ textAlign: 'right' }}>Line</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="btn ghost" onClick={() => onDec(l.id)} aria-label={`Decrease ${l.name}`}>−</button>
                    <div style={{ minWidth: 28, textAlign: 'center' }}>{l.qty}</div>
                    <button className="btn ghost" onClick={() => onInc(l.id)} aria-label={`Increase ${l.name}`}>+</button>
                  </div>
                </td>
                <td>${l.price.toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>
                  ${(l.qty * l.price).toFixed(2)}
                  <button
                    className="btn error"
                    style={{ marginLeft: 8, padding: '6px 10px' }}
                    onClick={() => onRemove(l.id)}
                    aria-label={`Remove ${l.name}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="divider" />
      <div className="row">
        <div className="col">
          <div className="kpi">
            <div className="label">Subtotal</div>
            <div className="value">${totals.subtotal.toFixed(2)}</div>
          </div>
        </div>
        <div className="col">
          <div className="kpi">
            <div className="label">Tax</div>
            <div className="value">${totals.tax.toFixed(2)}</div>
          </div>
        </div>
        <div className="col">
          <div className="kpi">
            <div className="label">Total</div>
            <div className="value">${totals.total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="btn success" onClick={() => onCheckout('card')}>💳 Card</button>
        <button className="btn" onClick={() => onCheckout('cash')}>💵 Cash</button>
      </div>
    </div>
  );
}

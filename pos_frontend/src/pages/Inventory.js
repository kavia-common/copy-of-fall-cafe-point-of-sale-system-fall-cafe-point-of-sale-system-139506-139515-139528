import React, { useState } from 'react';
import { usePOS } from '../state/POSContext';
import Modal from '../ui/Modal';
import { useToast } from '../ui/Toast';

// PUBLIC_INTERFACE
export default function Inventory() {
  /** Inventory table with low-stock badges and adjustment modal. */
  const { state, actions } = usePOS();
  const { push } = useToast();
  const [adjust, setAdjust] = useState(null);
  const low = (s) => s <= 10;

  function submitAdjust() {
    if (!adjust) return;
    actions.adjustStock(adjust.id, Number(adjust.delta || 0));
    setAdjust(null);
    push('Stock adjusted');
  }

  return (
    <div>
      <div className="section-title">Inventory</div>
      <table className="table" aria-label="Inventory table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Unit</th>
            <th aria-label="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.inventory.map(i => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>
                {i.stock}
                {low(i.stock) && <span className="k-badge k-tag-low" style={{ marginLeft: 8 }}>Low</span>}
              </td>
              <td>{i.unit}</td>
              <td>
                <button className="button" onClick={() => setAdjust({ ...i, delta: 0 })}>Adjust</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {adjust && (
        <Modal title={`Adjust ${adjust.name}`} onClose={() => setAdjust(null)}>
          <div style={{ display: 'grid', gap: 12 }}>
            <label>
              <div>Delta (use negative to subtract)</div>
              <input className="input" type="number" value={adjust.delta} onChange={e => setAdjust({ ...adjust, delta: e.target.value })} />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="button" onClick={() => setAdjust(null)}>Cancel</button>
              <button className="button button-primary" onClick={submitAdjust}>Apply</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { useAppData } from '../state/AppDataContext';

function currency(x) { return `$${x.toFixed(2)}`; }

// PUBLIC_INTERFACE
export default function MenuPage() {
  /** Manage menu items: add/edit/delete with local validation. */
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem, globalSearch } = useAppData();

  const [draft, setDraft] = useState({ name: '', price: '', category: 'Beverage', sku: '', stock: 0 });
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(() => {
    const s = (globalSearch || '').toLowerCase();
    return menu.filter(m =>
      !s || m.name.toLowerCase().includes(s) || m.category.toLowerCase().includes(s) || m.sku.toLowerCase().includes(s)
    );
  }, [menu, globalSearch]);

  function resetDraft() {
    setDraft({ name: '', price: '', category: 'Beverage', sku: '', stock: 0 });
    setEditingId(null);
  }

  function onSubmit(e) {
    e.preventDefault();
    const price = parseFloat(draft.price);
    const stock = parseInt(draft.stock, 10) || 0;
    if (!draft.name || !draft.sku || Number.isNaN(price)) return;

    if (editingId) {
      updateMenuItem(editingId, { ...draft, price, stock });
    } else {
      addMenuItem({ ...draft, price, stock });
    }
    resetDraft();
  }

  function onEdit(m) {
    setDraft({ name: m.name, price: m.price, category: m.category, sku: m.sku, stock: m.stock });
    setEditingId(m.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <section className="panel card">
        <div className="toolbar">
          <div className="section-title">Menu Management</div>
          <div className="badge">Fall Menu Builder 🍂</div>
        </div>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(6, 1fr)' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Name</label>
            <input className="input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
          </div>
          <div>
            <label className="label">Price</label>
            <input className="input" type="number" step="0.01" value={draft.price}
                   onChange={(e) => setDraft({ ...draft, price: e.target.value })} required />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="select" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
              <option>Beverage</option>
              <option>Bakery</option>
              <option>Kitchen</option>
            </select>
          </div>
          <div>
            <label className="label">SKU</label>
            <input className="input" value={draft.sku} onChange={(e) => setDraft({ ...draft, sku: e.target.value })} required />
          </div>
          <div>
            <label className="label">Stock</label>
            <input className="input" type="number" min="0" value={draft.stock}
                   onChange={(e) => setDraft({ ...draft, stock: e.target.value })} />
          </div>
          <div style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
            <button className="btn success" type="submit">{editingId ? 'Update Item' : 'Add Item'}</button>
            {editingId && <button className="btn" type="button" onClick={resetDraft}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="panel card">
        <div className="toolbar">
          <div className="section-title">Menu Items</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Category</th><th>SKU</th><th>Price</th><th>Stock</th><th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.sku}</td>
                  <td>{currency(m.price)}</td>
                  <td>{m.stock}</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn" onClick={() => onEdit(m)}>Edit</button>
                      <button className="btn error" onClick={() => deleteMenuItem(m.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6}><div className="empty">No menu items</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

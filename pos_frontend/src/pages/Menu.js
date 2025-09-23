import React, { useState } from 'react';
import { usePOS } from '../state/POSContext';
import Modal from '../ui/Modal';
import { useToast } from '../ui/Toast';

// PUBLIC_INTERFACE
export default function Menu() {
  /** Menu management CRUD for items with create/update/delete. */
  const { state, actions } = usePOS();
  const { push } = useToast();
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  function startEdit(item) {
    setEditing({ ...item });
  }

  function saveEdit() {
    actions.menuCrud('update', editing);
    setEditing(null);
    push('Menu item updated');
  }

  function createItem(item) {
    const newItem = { ...item, id: `m_${Date.now()}` };
    actions.menuCrud('create', newItem);
    setCreating(false);
    push('Menu item created');
  }

  function deleteItem(item) {
    actions.menuCrud('delete', item);
    push('Menu item deleted');
  }

  return (
    <div>
      <div className="section-title">Menu</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="subtle">Manage seasonal and regular items.</div>
        <button className="button button-primary" onClick={() => setCreating(true)}>New Item</button>
      </div>
      <table className="table" aria-label="Menu items table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Price</th>
            <th aria-label="actions column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.menu.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.category}</td>
              <td>{m.tags?.join(', ')}</td>
              <td>${m.price.toFixed(2)}</td>
              <td style={{ display: 'flex', gap: 6 }}>
                <button className="button" onClick={() => startEdit(m)}>Edit</button>
                <button className="button button-danger" onClick={() => deleteItem(m)}>Delete</button>
              </td>
            </tr>
          ))}
          {state.menu.length === 0 && <tr><td colSpan="5" className="subtle">No items yet.</td></tr>}
        </tbody>
      </table>

      {editing && (
        <Modal title="Edit Menu Item" onClose={() => setEditing(null)}>
          <MenuForm item={editing} onChange={setEditing} onSubmit={saveEdit} />
        </Modal>
      )}

      {creating && (
        <Modal title="Create Menu Item" onClose={() => setCreating(false)}>
          <MenuForm item={{ name: '', price: 0, category: 'Drinks', tags: [] }} onChange={() => {}} onSubmit={(vals) => createItem(vals)} />
        </Modal>
      )}
    </div>
  );
}

function MenuForm({ item, onChange, onSubmit }) {
  const [local, setLocal] = useState(item);

  function set(field, value) {
    const next = { ...local, [field]: value };
    setLocal(next);
    onChange(next);
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(local); }} style={{ display: 'grid', gap: 10 }}>
      <label>
        <div>Name</div>
        <input className="input" value={local.name} onChange={e => set('name', e.target.value)} required aria-label="Item name" />
      </label>
      <label>
        <div>Category</div>
        <select className="select" value={local.category} onChange={e => set('category', e.target.value)} aria-label="Category">
          {['Seasonal', 'Drinks', 'Bakery', 'Savory'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label>
        <div>Tags (comma separated)</div>
        <input className="input" value={local.tags?.join(', ') || ''} onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} aria-label="Tags" />
      </label>
      <label>
        <div>Price</div>
        <input type="number" step="0.01" min="0" className="input" value={local.price} onChange={e => set('price', parseFloat(e.target.value || '0'))} aria-label="Price" />
      </label>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button type="button" className="button">Cancel</button>
        <button type="submit" className="button button-primary">Save</button>
      </div>
    </form>
  );
}

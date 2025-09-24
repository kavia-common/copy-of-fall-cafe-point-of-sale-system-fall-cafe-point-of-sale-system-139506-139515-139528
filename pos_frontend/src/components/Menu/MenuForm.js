import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
export default function MenuForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: null, name: '', price: '', category: 'Drinks', description: ''
  });

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id ?? null,
        name: initial.name ?? '',
        price: String(initial.price ?? ''),
        category: initial.category ?? 'Drinks',
        description: initial.description ?? ''
      });
    }
  }, [initial]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(form.price);
    if (!form.name || Number.isNaN(priceNum)) return;
    onSave({ ...form, price: priceNum });
  };

  return (
    <form className="card" onSubmit={submit} aria-label="Menu form">
      <div className="card-title">{form.id ? 'Edit Item' : 'Add Item'}</div>
      <div className="row">
        <div className="col">
          <label>Name</label>
          <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div className="col">
          <label>Price</label>
          <input className="input" type="number" step="0.01" value={form.price} onChange={(e) => update('price', e.target.value)} required />
        </div>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <div className="col">
          <label>Category</label>
          <select className="select" value={form.category} onChange={(e) => update('category', e.target.value)}>
            <option>Drinks</option>
            <option>Bakery</option>
            <option>Food</option>
            <option>Seasonal</option>
          </select>
        </div>
        <div className="col">
          <label>Description</label>
          <input className="input" value={form.description} onChange={(e) => update('description', e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="btn" type="submit">Save</button>
        <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

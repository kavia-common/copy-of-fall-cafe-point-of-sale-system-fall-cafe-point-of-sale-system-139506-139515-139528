import React from 'react';

// PUBLIC_INTERFACE
export default function MenuTable({ items, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-title">Menu Items</div>
      <table className="table" aria-label="Menu list">
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Price</th><th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td><span className="badge">{it.category}</span></td>
              <td>${it.price.toFixed(2)}</td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn ghost" onClick={() => onEdit(it)}>Edit</button>
                <button className="btn error" style={{ marginLeft: 8 }} onClick={() => onDelete(it.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ current, onNavigate }) {
  /** Ocean Professional sidebar with autumn accents */
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand">
        <div className="logo">☕</div>
        <div>
          <div className="name">Fall Cafe POS</div>
          <div className="tag">Ocean Professional</div>
        </div>
      </div>

      <div className="nav">
        <div className="nav-section">Operations</div>

        <button
          className={`nav-btn ${current === 'orders' ? 'active' : ''}`}
          onClick={() => onNavigate('orders')}
        >
          <span className="icon">🧾</span>
          <span>Order Entry</span>
        </button>

        <button
          className={`nav-btn ${current === 'menu' ? 'active' : ''}`}
          onClick={() => onNavigate('menu')}
        >
          <span className="icon">🍰</span>
          <span>Menu Management</span>
        </button>

        <button
          className={`nav-btn ${current === 'analytics' ? 'active' : ''}`}
          onClick={() => onNavigate('analytics')}
        >
          <span className="icon">📊</span>
          <span>Sales Analytics</span>
        </button>
      </div>

      <div className="sidebar-footer">
        <button className="btn ghost" onClick={() => onNavigate('orders')}>New Order</button>
        <button className="btn secondary">🍁 Fall</button>
      </div>
    </aside>
  );
}

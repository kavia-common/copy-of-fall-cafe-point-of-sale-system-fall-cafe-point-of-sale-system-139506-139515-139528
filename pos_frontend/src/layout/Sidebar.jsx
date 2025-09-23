import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ active, onNavigate }) {
  /** Sidebar with sections: Orders, Menu, Analytics. */
  const Item = ({ id, icon, label }) => (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(id)}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate(id)}
      className={`item ${active === id ? 'active' : ''}`}
      aria-current={active === id ? 'page' : undefined}
    >
      <div className="icon" aria-hidden>
        {icon}
      </div>
      <div>{label}</div>
    </div>
  );

  return (
    <>
      <div className="brand">
        <div className="logo" />
        <div>
          <div className="title">Fall Cafe POS</div>
          <div className="subtitle">Ocean Professional</div>
        </div>
      </div>

      <nav className="nav" aria-label="Primary">
        <Item id="orders" label="Order Processing" icon="🧾" />
        <Item id="menu" label="Menu Management" icon="🍁" />
        <Item id="analytics" label="Analytics" icon="📊" />
      </nav>

      <div className="footer">
        <div>Shift: 8:00 AM - 4:00 PM</div>
        <div>Staff: Alex Johnson</div>
      </div>
    </>
  );
}

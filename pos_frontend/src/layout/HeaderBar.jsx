import React, { useState } from 'react';
import { useAppData } from '../state/AppDataContext';

// PUBLIC_INTERFACE
export default function HeaderBar() {
  /** Top header with search, theme, and quick actions. */
  const { setGlobalSearch } = useAppData();
  const [text, setText] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    setGlobalSearch(text);
  }

  return (
    <div className="header">
      <form className="search" onSubmit={onSubmit} role="search">
        <input
          className="input"
          placeholder="Search menu, orders, items..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Global search"
        />
        <button className="btn" type="submit">Search</button>
      </form>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn">New Order</button>
        <button className="btn">Hold</button>
        <button className="btn primary">Checkout</button>
      </div>
    </div>
  );
}

import React from 'react';

// PUBLIC_INTERFACE
export default function HeaderBar({ title, theme, onToggleTheme }) {
  return (
    <div className="header" role="banner">
      <div className="title">{title}</div>
      <div className="actions">
        <span className="badge">Seasonal · Autumn</span>
        <button className="btn ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  );
}

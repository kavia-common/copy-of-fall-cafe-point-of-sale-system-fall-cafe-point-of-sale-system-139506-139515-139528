import React from 'react';

// PUBLIC_INTERFACE
export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="row" style={{ marginBottom: 12 }}>
      {['All', ...categories].map((c) => (
        <button
          key={c}
          className={`btn ${active === c ? '' : 'ghost'}`}
          onClick={() => onChange(c)}
          aria-pressed={active === c}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

import React from 'react';
import { usePOS } from '../state/POSContext';

// PUBLIC_INTERFACE
export default function FavoritesBar({ favorites }) {
  /** List favorite items for quick add to cart. */
  const { actions } = usePOS();
  return (
    <div>
      <div className="subtle" style={{ marginBottom: 6 }}>Favorites</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {favorites.length === 0 && <div className="subtle">No favorites yet.</div>}
        {favorites.map(f => (
          <button
            key={f.id}
            className="button"
            onClick={() => actions.addToCart({ key: `${f.id}-base`, id: f.id, name: f.name, price: f.price, qty: 1, notes: '' })}
            aria-label={`Add favorite ${f.name} to cart`}
          >
            <span role="img" aria-hidden>⭐</span> {f.name}
          </button>
        ))}
      </div>
    </div>
  );
}

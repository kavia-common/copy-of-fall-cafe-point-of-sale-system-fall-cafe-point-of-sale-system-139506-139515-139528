import React from 'react';
import { usePOS } from '../state/POSContext';

// PUBLIC_INTERFACE
export default function EcoPointsWidget() {
  /** Displays eco-points balance and quick info. */
  const { state } = usePOS();
  return (
    <div className="card" style={{ padding: 12 }}>
      <div className="subtle" aria-hidden>Eco-Points</div>
      <div style={{ fontSize: 26, fontWeight: 800 }} aria-live="polite">
        {state.ecoPoints}
      </div>
      <div className="k-badge k-tag-good" style={{ marginTop: 8 }}>
        <span role="img" aria-hidden>🌿</span> Sustainability
      </div>
    </div>
  );
}

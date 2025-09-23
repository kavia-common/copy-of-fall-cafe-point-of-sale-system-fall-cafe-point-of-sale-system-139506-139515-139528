import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import EcoImpact from './pages/EcoImpact';
import Rewards from './pages/Rewards';
import Settings from './pages/Settings';
import EcoPointsWidget from './components/EcoPointsWidget';
import FavoritesBar from './components/FavoritesBar';
import { usePOS } from './state/POSContext';

// PUBLIC_INTERFACE
function App() {
  /** Main app shell with sidebar and routed main content. */
  const { state } = usePOS();

  return (
    <div className="app-shell" aria-label="Fall Café POS application">
      <aside className="sidebar" aria-label="Main navigation sidebar">
        <div className="brand" aria-label="Fall Café POS brand">
          <span role="img" aria-label="leaf">🍂</span>
          <span>Fall Café POS</span>
        </div>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>🧾</span><span>Orders</span>
          </NavLink>
          <NavLink to="/menu" className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>📋</span><span>Menu</span>
          </NavLink>
          <NavLink to="/inventory" className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>📦</span><span>Inventory</span>
          </NavLink>
          <NavLink to="/analytics" className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>📈</span><span>Analytics</span>
          </NavLink>
          <NavLink to="/eco-impact" className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>🌿</span><span>Eco-Impact</span>
          </NavLink>
          <NavLink to="/rewards" className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>🎁</span><span>Rewards</span>
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? 'active' : undefined}>
            <span role="img" aria-hidden>⚙️</span><span>Settings</span>
          </NavLink>
        </nav>

        <div className="k-divider" role="separator" aria-hidden />

        <EcoPointsWidget />

        <div className="k-divider" role="separator" aria-hidden />

        <FavoritesBar favorites={state.favorites} />
      </aside>

      <header className="header" aria-label="Top bar">
        <div>
          <strong>Location:</strong> <span className="subtle">Downtown • Register 2</span>
        </div>
        <div aria-live="polite" className="subtle">Signed in: {state.user?.name || 'Barista'}</div>
      </header>

      <main className="main" id="main-content">
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/eco-impact" element={<EcoImpact />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

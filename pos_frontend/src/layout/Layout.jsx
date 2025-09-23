import React, { useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import OrdersPage from '../pages/OrdersPage';
import MenuPage from '../pages/MenuPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import { AppDataProvider } from '../state/AppDataContext';

const VIEWS = {
  orders: 'orders',
  menu: 'menu',
  analytics: 'analytics',
};

// PUBLIC_INTERFACE
export default function Layout() {
  /** App shell with sidebar navigation and page switching. */
  const [active, setActive] = useState(VIEWS.orders);

  const page = useMemo(() => {
    switch (active) {
      case VIEWS.menu: return <MenuPage />;
      case VIEWS.analytics: return <AnalyticsPage />;
      case VIEWS.orders:
      default: return <OrdersPage />;
    }
  }, [active]);

  return (
    <AppDataProvider>
      <div className="app-shell">
        <div className="autumn-hero" />
        <aside className="sidebar">
          <Sidebar active={active} onNavigate={setActive} />
        </aside>
        <main className="main">
          <HeaderBar />
          <div className={`content ${active === VIEWS.orders ? 'orders' : ''}`}>
            {page}
          </div>
        </main>
      </div>
    </AppDataProvider>
  );
}

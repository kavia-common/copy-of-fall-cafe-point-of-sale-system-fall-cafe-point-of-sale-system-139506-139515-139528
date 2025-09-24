import React, { useState, useMemo } from 'react';
import './App.css';
import './theme.css';
import './layout.css';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import OrderPage from './pages/OrderPage';
import MenuPage from './pages/MenuPage';
import AnalyticsPage from './pages/AnalyticsPage';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root app state for theme and current section
   * Sections: 'orders' | 'menu' | 'analytics'
   */
  const [theme, setTheme] = useState('light');
  const [section, setSection] = useState('orders');

  // Apply theme at root HTML element
  useMemo(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const content = useMemo(() => {
    switch (section) {
      case 'orders':
        return <OrderPage />;
      case 'menu':
        return <MenuPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <OrderPage />;
    }
  }, [section]);

  return (
    <div className="pos-app">
      <Sidebar current={section} onNavigate={setSection} />
      <main className="pos-main">
        <HeaderBar
          title={
            section === 'orders'
              ? 'Order Entry'
              : section === 'menu'
              ? 'Menu Management'
              : 'Sales Analytics'
          }
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <div className="pos-content">{content}</div>
      </main>
      <div className="fall-graphic" aria-hidden="true" />
    </div>
  );
}

export default App;

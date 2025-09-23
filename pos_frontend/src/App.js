import React from 'react';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/analytics.css';
import Layout from './layout/Layout';

// PUBLIC_INTERFACE
export default function App() {
  /** Root App - renders the POS layout and navigation.
   * Contains no API logic; ready for future backend integration.
   */
  return <Layout />;
}

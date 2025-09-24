# Fall Cafe POS Frontend (Ocean Professional)

A responsive React UI for staff to manage orders, menu items, and sales analytics for a fall-themed cafe.

## Features
- Order Entry: category filter, menu grid, cart with quantities, and checkout actions
- Menu Management: add/edit/delete items with placeholder persistence
- Sales Analytics: KPIs, weekly bar chart, top seasonal sellers
- Sidebar Navigation and HeaderBar with theme toggle (light/dark)
- Ocean Professional theme (primary: #1E3A8A, accent: #F59E0B) and classic business styling

## Structure
- src/components
  - Sidebar.js, HeaderBar.js
  - Order/: CategoryFilter, MenuGrid, CartPanel
  - Menu/: MenuForm, MenuTable
  - Analytics/: SimpleBarChart
- src/pages: OrderPage, MenuPage, AnalyticsPage
- src/services/api.js (placeholder API; swap with real backend)
- src/theme.css, src/layout.css, src/App.css, src/index.css

## Run
- npm start
- npm test
- npm run build

## Configure
- Set REACT_APP_API_BASE in .env when backend is available.

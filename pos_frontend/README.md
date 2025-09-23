# Fall Cafe POS - Frontend (React)

Ocean Professional, classic-styled POS frontend for a fall-themed cafe.

## Features
- Sidebar navigation: Orders, Menu Management, Analytics
- Tablet/desktop responsive layout
- Autumnal visual accents using the provided palette
- Local state for menu and orders with easy swap to backend later
- Zero extra dependencies (no router needed)

## Run
- npm start
- npm test
- npm run build

## Structure
- src/layout: App shell, Sidebar, Header
- src/pages: OrdersPage, MenuPage, AnalyticsPage
- src/state: AppDataContext (mock data + state)
- src/styles: theme.css, layout.css, components.css, analytics.css

## Integration
API integration can replace AppDataContext with real calls without changing the UI. Keep environment variables in .env (not included).

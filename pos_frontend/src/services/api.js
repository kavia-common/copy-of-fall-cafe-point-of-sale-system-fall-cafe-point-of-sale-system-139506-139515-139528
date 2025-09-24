/**
 * Placeholder API service. Replace baseURL and methods with real endpoints.
 * Uses in-memory store to simulate CRUD until backend is connected.
 */
const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:8000'; // not used yet

let _menu = [
  { id: 1, name: 'Pumpkin Spice Latte', price: 5.25, category: 'Seasonal', description: 'Espresso, milk, pumpkin spice' },
  { id: 2, name: 'Maple Cappuccino', price: 4.75, category: 'Drinks', description: 'Cappuccino with maple syrup' },
  { id: 3, name: 'Cranberry Scone', price: 3.5, category: 'Bakery', description: 'Buttery scone with cranberry' },
  { id: 4, name: 'Butternut Soup', price: 6.5, category: 'Food', description: 'Creamy autumn soup' },
];

let _id = 5;

// PUBLIC_INTERFACE
export async function fetchMenu() {
  /** Fetch menu items from backend (placeholder using memory store) */
  return Promise.resolve([..._menu]);
}

// PUBLIC_INTERFACE
export async function createMenuItem(item) {
  /** Create a new menu item (placeholder) */
  const toSave = { ...item, id: _id++ };
  _menu.push(toSave);
  return Promise.resolve(toSave);
}

// PUBLIC_INTERFACE
export async function updateMenuItem(item) {
  /** Update an existing menu item (placeholder) */
  _menu = _menu.map((m) => (m.id === item.id ? { ...m, ...item } : m));
  return Promise.resolve(item);
}

// PUBLIC_INTERFACE
export async function deleteMenuItem(id) {
  /** Delete a menu item (placeholder) */
  _menu = _menu.filter((m) => m.id !== id);
  return Promise.resolve({ ok: true });
}

// PUBLIC_INTERFACE
export async function submitOrder(lines, payment) {
  /** Submit order to backend (placeholder) */
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0) * 1.07;
  // In real impl, POST to `${baseURL}/orders`
  return Promise.resolve({ id: Date.now(), total, payment, status: 'PAID' });
}

const BASE_URL = process.env.REACT_APP_API_BASE || '';

async function mockDelay(ms = 300) {
  return new Promise(res => setTimeout(res, ms));
}

// PUBLIC_INTERFACE
export async function fetchMenu() {
  /** Fetch menu items. TODO: Replace with real API GET `${BASE_URL}/menu` */
  await mockDelay();
  return { data: null, error: null };
}

// PUBLIC_INTERFACE
export async function submitOrder(order) {
  /** Submit order. TODO: Replace with POST `${BASE_URL}/orders` */
  await mockDelay(400);
  return { data: { id: `ord_${Date.now()}` }, error: null };
}

// PUBLIC_INTERFACE
export async function fetchInventory() {
  /** Fetch inventory items. TODO: Replace with real API GET `${BASE_URL}/inventory` */
  await mockDelay();
  return { data: null, error: null };
}

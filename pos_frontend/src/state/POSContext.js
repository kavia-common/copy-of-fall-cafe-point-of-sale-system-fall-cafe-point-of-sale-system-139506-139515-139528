import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { initialMenu } from '../stub/mockData';

// Types
const initialState = {
  user: { id: 'u1', name: 'Avery' },
  ecoPoints: 120,
  cart: [],
  ordersQueue: [],
  favorites: [],
  menu: initialMenu,
  inventory: [
    { id: 'inv1', name: 'Espresso Beans', stock: 42, unit: 'lbs' },
    { id: 'inv2', name: 'Pumpkin Puree', stock: 8, unit: 'cans' },
    { id: 'inv3', name: 'Oat Milk', stock: 12, unit: 'cartons' },
  ],
  loading: false,
  error: null
};

const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  PLACE_ORDER: 'PLACE_ORDER',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  AWARD_ECOPOINTS: 'AWARD_ECOPOINTS',
  ADJUST_STOCK: 'ADJUST_STOCK',
  MENU_CRUD: 'MENU_CRUD',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const item = action.payload;
      const existing = state.cart.find(c => c.key === item.key);
      const newCart = existing
        ? state.cart.map(c => c.key === item.key ? { ...c, qty: c.qty + item.qty } : c)
        : [...state.cart, item];
      return { ...state, cart: newCart };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      return { ...state, cart: state.cart.filter(c => c.key !== action.payload.key) };
    }
    case ACTIONS.UPDATE_CART_ITEM: {
      const { key, updates } = action.payload;
      return { ...state, cart: state.cart.map(c => c.key === key ? { ...c, ...updates } : c) };
    }
    case ACTIONS.CLEAR_CART:
      return { ...state, cart: [] };
    case ACTIONS.PLACE_ORDER: {
      const order = action.payload;
      return { ...state, ordersQueue: [...state.ordersQueue, order], cart: [] };
    }
    case ACTIONS.UPDATE_ORDER_STATUS: {
      const { id, status } = action.payload;
      return {
        ...state,
        ordersQueue: state.ordersQueue.map(o => o.id === id ? { ...o, status } : o)
      };
    }
    case ACTIONS.TOGGLE_FAVORITE: {
      const fav = action.payload;
      const exists = state.favorites.find(f => f.id === fav.id);
      return {
        ...state,
        favorites: exists ? state.favorites.filter(f => f.id !== fav.id) : [...state.favorites, fav]
      };
    }
    case ACTIONS.AWARD_ECOPOINTS:
      return { ...state, ecoPoints: state.ecoPoints + (action.payload || 0) };
    case ACTIONS.ADJUST_STOCK: {
      const { id, delta } = action.payload;
      return {
        ...state,
        inventory: state.inventory.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i)
      };
    }
    case ACTIONS.MENU_CRUD: {
      const { op, item } = action.payload;
      if (op === 'create') return { ...state, menu: [...state.menu, item] };
      if (op === 'update') return { ...state, menu: state.menu.map(m => m.id === item.id ? item : m) };
      if (op === 'delete') return { ...state, menu: state.menu.filter(m => m.id !== item.id) };
      return state;
    }
    case ACTIONS.SET_LOADING:
      return { ...state, loading: !!action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const POSContext = createContext(null);

// PUBLIC_INTERFACE
export function POSProvider({ children }) {
  /** Provide POS state and actions via React Context. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => ({
    addToCart: (payload) => dispatch({ type: ACTIONS.ADD_TO_CART, payload }),
    removeFromCart: (payload) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload }),
    updateCartItem: (payload) => dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload }),
    clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),
    placeOrder: (order) => dispatch({ type: ACTIONS.PLACE_ORDER, payload: order }),
    updateOrderStatus: (id, status) => dispatch({ type: ACTIONS.UPDATE_ORDER_STATUS, payload: { id, status } }),
    toggleFavorite: (payload) => dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload }),
    awardEcoPoints: (amount) => dispatch({ type: ACTIONS.AWARD_ECOPOINTS, payload: amount }),
    adjustStock: (id, delta) => dispatch({ type: ACTIONS.ADJUST_STOCK, payload: { id, delta } }),
    menuCrud: (op, item) => dispatch({ type: ACTIONS.MENU_CRUD, payload: { op, item } }),
    setLoading: (flag) => dispatch({ type: ACTIONS.SET_LOADING, payload: flag }),
    setError: (err) => dispatch({ type: ACTIONS.SET_ERROR, payload: err }),
  }), []);

  return (
    <POSContext.Provider value={{ state, actions }}>
      {children}
    </POSContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function usePOS() {
  /** Hook to access POS state/actions. */
  const ctx = useContext(POSContext);
  if (!ctx) throw new Error('usePOS must be used within POSProvider');
  return ctx;
}

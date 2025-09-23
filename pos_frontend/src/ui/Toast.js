import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext(null);

// PUBLIC_INTERFACE
export function ToastProvider({ children }) {
  /** Simple toast provider to show temporary messages. */
  const [items, setItems] = useState([]);

  const push = useCallback((message, variant = 'info', ttl = 2800) => {
    const id = Date.now() + Math.random();
    setItems(prev => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id));
    }, ttl);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toast" aria-live="polite" aria-atomic="true">
        {items.map(i => (
          <div key={i.id} className="toast-item" role="status" aria-label={i.variant}>
            {i.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

// PUBLIC_INTERFACE
export function useToast() {
  /** Hook to use toasts. */
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

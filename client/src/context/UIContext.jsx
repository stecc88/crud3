import { createContext, useContext, useMemo, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, variant = "info", duration = 3000) {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }

  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const value = useMemo(() => ({ toasts, showToast, dismissToast }), [toasts]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);

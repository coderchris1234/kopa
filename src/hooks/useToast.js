import { useState, useCallback } from 'react';
import { generateId } from '../utils';

/**
 * Toast hook for managing toast notifications
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'success', title, message, duration = 5000 }) => {
    const id = generateId();
    const toast = { id, type, title, message };
    
    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title, message) => {
    return addToast({ type: 'success', title, message });
  }, [addToast]);

  const error = useCallback((title, message) => {
    return addToast({ type: 'error', title, message });
  }, [addToast]);

  const warning = useCallback((title, message) => {
    return addToast({ type: 'warning', title, message });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning
  };
}

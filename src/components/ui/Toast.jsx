import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle
};

export default function Toast({ type = 'success', title, message, onClose }) {
  const Icon = icons[type];
  
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {Icon && (
        <div className={styles.icon}>
          <Icon size={20} />
        </div>
      )}
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {message && <div className={styles.message}>{message}</div>}
      </div>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export function ToastContainer({ toasts = [] }) {
  if (toasts.length === 0) return null;
  
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

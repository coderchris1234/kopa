import styles from './Table.module.css';

export default function Table({ children, className = '' }) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead className={styles.thead}>{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className={styles.tbody}>{children}</tbody>;
}

export function TableRow({ children, onClick }) {
  return (
    <tr
      className={styles.tr}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </tr>
  );
}

export function TableHeader({ children, ...props }) {
  return (
    <th className={styles.th} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, ...props }) {
  return (
    <td className={styles.td} {...props}>
      {children}
    </td>
  );
}

export function TableEmpty({ title, message }) {
  return (
    <div className={styles.empty}>
      {title && <div className={styles.emptyTitle}>{title}</div>}
      {message && <div className={styles.emptyMessage}>{message}</div>}
    </div>
  );
}

export function TableLoading({ message = 'Loading...' }) {
  return <div className={styles.loading}>{message}</div>;
}

import styles from './Card.module.css';

export default function Card({
  children,
  variant = 'default',
  interactive = false,
  onClick,
  className = ''
}) {
  const classNames = [
    styles.card,
    styles[variant],
    interactive && styles.interactive,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, children }) {
  return (
    <div className={styles.header}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`${styles.content} ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`${styles.footer} ${className}`}>
      {children}
    </div>
  );
}

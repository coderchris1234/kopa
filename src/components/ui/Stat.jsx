import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './Stat.module.css';

export default function Stat({ label, value, change, helpText }) {
  const getChangeType = () => {
    if (!change || change === 0) return 'neutral';
    return change > 0 ? 'positive' : 'negative';
  };

  const changeType = getChangeType();
  const ChangeIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  return (
    <div className={styles.stat}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {change !== undefined && change !== null && (
        <div className={`${styles.change} ${styles[changeType]}`}>
          <ChangeIcon size={16} />
          <span>{Math.abs(change)}%</span>
        </div>
      )}
      {helpText && <div className={styles.helpText}>{helpText}</div>}
    </div>
  );
}

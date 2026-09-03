import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../../utils';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children, showBackLink = true }) {
  return (
    <div className={styles.layout}>
      {/* Left Side - Brand and Value Proposition */}
      <div className={styles.leftSide}>
        <Link to="/" className={styles.logo}>
          KOPA
        </Link>

        <div className={styles.leftContent}>
          <h1 className={styles.leftTitle}>
            Turn your audience into income
          </h1>
          <p className={styles.leftDescription}>
            Join thousands of African creators who are earning directly from their audience with KOPA.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatCurrency(24000000)}</span>
              <span className={styles.statLabel}>Earned by creators</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatNumber(12500)}</span>
              <span className={styles.statLabel}>Active creators</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{formatNumber(95000)}</span>
              <span className={styles.statLabel}>Supporters</span>
            </div>
          </div>
        </div>

        <div className={styles.leftFooter}>
          © 2026 KOPA. Building for African creators.
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          {showBackLink && (
            <Link to="/" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to home
            </Link>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { IoWalletOutline, IoBarChartSharp } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { Card } from '../../components/ui';
import { formatNumber, formatPercentage, formatCurrency } from '../../utils';
import styles from './AnalyticsPage.module.css';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30');

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>Where your money actually comes from</p>
        </div>
        <div className={styles.timeRange}>
          <button className={styles.timeButton}>Last 30 days</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {/* Page Visitor */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Page Visitor</span>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#EFF6FF' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
          </div>
          <div className={styles.statValue}>9700</div>
        </div>

        {/* Supporters */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Supporters</span>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#DBEAFE' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className={styles.statValue}>128</div>
        </div>

        {/* Conversion rate */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Conversion rate</span>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#F3E8FF' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16V8"/>
                <path d="M8 12l4-4 4 4"/>
              </svg>
            </div>
          </div>
          <div className={styles.statValue}>1.3%</div>
        </div>

        {/* Checkout Interest */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Checkout Interest</span>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#FEF3C7' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
          </div>
          <div className={styles.statValue}>1624</div>
        </div>

        {/* Successful payments */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Successful payments</span>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#D1FAE5' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
          <div className={styles.statValue}>128</div>
        </div>

        {/* Avg support amount */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Avg. support amount</span>
            <div className={styles.statIconWrapper} style={{ backgroundColor: '#F3E8FF' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
          </div>
          <div className={styles.statValue}>₦2,055</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Conversion Funnel */}
        <div className={styles.funnelCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Conversion funnel</h2>
            <p className={styles.cardSubtitle}>From visit to payment</p>
          </div>

          <div className={styles.funnelList}>
            {/* Page visits */}
            <div className={styles.funnelItem}>
              <div className={styles.funnelItemHeader}>
                <span className={styles.funnelLabel}>Page visits</span>
                <span className={styles.funnelValue}>9,700</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '100%', backgroundColor: '#DBEAFE' }}>
                  <span className={styles.progressLabel}>100%</span>
                </div>
              </div>
              <div className={styles.funnelArrow}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Support buttons clicked */}
            <div className={styles.funnelItem}>
              <div className={styles.funnelItemHeader}>
                <span className={styles.funnelLabel}>Support buttons clicked</span>
                <span className={styles.funnelValue}>2,619</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '27%', backgroundColor: '#93C5FD' }}>
                  <span className={styles.progressLabel}>27%</span>
                </div>
              </div>
              <div className={styles.funnelArrow}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Checkout initiated */}
            <div className={styles.funnelItem}>
              <div className={styles.funnelItemHeader}>
                <span className={styles.funnelLabel}>Checkout initiated</span>
                <span className={styles.funnelValue}>1,624</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '17%', backgroundColor: '#FED7AA' }}>
                  <span className={styles.progressLabel}>17%</span>
                </div>
              </div>
              <div className={styles.funnelArrow}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Successful payments */}
            <div className={styles.funnelItem}>
              <div className={styles.funnelItemHeader}>
                <span className={styles.funnelLabel}>Successful payments</span>
                <span className={styles.funnelValue}>128</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '1.3%', backgroundColor: '#86EFAC' }}>
                  <span className={styles.progressLabel}>1%</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.overallConversion}>
            <div className={styles.conversionLabel}>Overall conversion rate</div>
            <div className={styles.conversionValue}>1.3%</div>
          </div>
        </div>

        {/* Revenue by Platform */}
        <div className={styles.revenueCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Revenue by platform</h2>
            <p className={styles.cardSubtitle}>Where supporters and revenue comes from</p>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Visitors</th>
                  <th>Supporters</th>
                  <th>Revenue</th>
                  <th>Conv.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.platformCell}>Instagram</td>
                  <td>2,400</td>
                  <td>45</td>
                  <td className={styles.revenueCell}>₦65,000</td>
                  <td>
                    <span className={styles.convBadge}>19%</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.platformCell}>TikTok</td>
                  <td>2,100</td>
                  <td>24</td>
                  <td className={styles.revenueCell}>₦52,000</td>
                  <td>
                    <span className={styles.convBadge}>11%</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.platformCell}>WhatsApp</td>
                  <td>1,800</td>
                  <td>22</td>
                  <td className={styles.revenueCell}>₦48,000</td>
                  <td>
                    <span className={styles.convBadge}>12%</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.platformCell}>YouTube</td>
                  <td>1,250</td>
                  <td>16</td>
                  <td className={styles.revenueCell}>₦41,000</td>
                  <td>
                    <span className={styles.convBadge}>14%</span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.platformCell}>X</td>
                  <td>1,450</td>
                  <td>21</td>
                  <td className={styles.revenueCell}>₦47,000</td>
                  <td>
                    <span className={styles.convBadge}>3%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

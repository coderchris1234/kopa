import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Wallet, Users, TrendingUp as RateIcon } from 'lucide-react';
import { useDashboard } from '../../hooks/useApi';
import { formatCurrency, formatNumber } from '../../utils';
import { useState, useEffect } from 'react';
import styles from './DashboardOverviewPage.module.css';

export default function DashboardOverviewPage() {
  const { data: dashboardData, isLoading, error } = useDashboard();
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Log dashboard data for debugging - MUST be before any returns
  useEffect(() => {
    if (dashboardData) {
      console.log('Dashboard data loaded:', dashboardData);
    }
  }, [dashboardData]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.page}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '16px', color: '#EF4444', marginBottom: '8px' }}>Failed to load dashboard</p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {error.response?.data?.message || 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const userName = dashboardData?.data?.Name || 'Creator';
  const accountBalance = dashboardData?.data?.accountBalance || 0;
  const transactions = dashboardData?.data?.creatorTransactions || [];
  const notifications = dashboardData?.data?.notifications || [];

  // Calculate stats from real data
  const stats = {
    totalEarned: accountBalance,
    thisMonth: accountBalance, // TODO: Calculate from transactions when date filtering is available
    totalSupporters: transactions.length, // TODO: Get unique supporters count
    conversionRate: 0 // TODO: Calculate from analytics when available
  };

  // For now, show empty states for charts and lists
  const earningsData = [];
  const trafficSources = [];
  const recentSupport = transactions.slice(0, 5); // Show latest 5 transactions

  const maxValue = 160;

  // Create SVG path for area chart
  const createAreaPath = () => {
    const width = 600;
    const height = 200;
    const points = earningsData.map((d, i) => ({
      x: (i / (earningsData.length - 1)) * width,
      y: height - (d.value / maxValue) * height
    }));

    // Create smooth curve using quadratic bezier
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      
      path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      path += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
    }
    
    // Close the path for area fill
    path += ` L ${width} ${height} L 0 ${height} Z`;
    
    return path;
  };

  const createLinePath = () => {
    const width = 600;
    const height = 200;
    const points = earningsData.map((d, i) => ({
      x: (i / (earningsData.length - 1)) * width,
      y: height - (d.value / maxValue) * height
    }));

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      
      path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      path += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
    }
    
    return path;
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.greeting}>
          Good afternoon, {userName} 👋
        </h1>
        <p className={styles.subtitle}>
          Track your earnings, supporters, and audience growth.
        </p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Wallet size={16} color={isDark ? '#6EE7B7' : '#10B981'} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Total earned</div>
            <div className={styles.statValue}>₦{formatNumber(stats.totalEarned)}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <RateIcon size={16} color={isDark ? '#FCD34D' : '#F59E0B'} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>This month</div>
            <div className={styles.statValue}>₦{formatNumber(stats.thisMonth)}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={16} color={isDark ? '#93C5FD' : '#3B82F6'} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Total supporters</div>
            <div className={styles.statValue}>{stats.totalSupporters}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke={isDark ? '#C4B5FD' : '#8B5CF6'} strokeWidth="1.5" fill="none"/>
              <path d="M8 4v4l2 2" stroke={isDark ? '#C4B5FD' : '#8B5CF6'} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Conversion rate</div>
            <div className={styles.statValue}>{stats.conversionRate}%</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Earnings Overview */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Earnings overview</h3>
              <p className={styles.cardSubtitle}>Revenue over time</p>
            </div>
            <div className={styles.chartTabs}>
              <button className={`${styles.chartTab} ${styles.active}`}>1W</button>
              <button className={styles.chartTab}>30D</button>
              <button className={styles.chartTab}>3M</button>
            </div>
          </div>
          {earningsData.length > 0 ? (
            <div className={styles.areaChartContainer}>
              <div className={styles.chartYAxis}>
                <span>160k</span>
                <span>105k</span>
                <span>75k</span>
                <span>35k</span>
                <span>0</span>
              </div>
              <div className={styles.areaChartWrapper}>
                <svg viewBox="0 0 600 200" className={styles.areaChart} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.05 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d={createAreaPath()}
                    fill="url(#areaGradient)"
                  />
                  <path
                    d={createLinePath()}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
                <div className={styles.chartXAxis}>
                  {earningsData.map((point, index) => (
                    <span key={index}>{point.date}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: '14px', margin: 0 }}>No earnings data yet</p>
              <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.7 }}>Your revenue chart will appear here once you start receiving support</p>
            </div>
          )}
        </div>

        {/* Traffic Sources */}
        <div className={styles.trafficCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Traffic sources</h3>
              <p className={styles.cardSubtitle}>Revenue by platform</p>
            </div>
          </div>
          {trafficSources.length > 0 ? (
            <div className={styles.trafficList}>
              {trafficSources.map((source, index) => (
                <div key={index} className={styles.trafficItem}>
                  <div className={styles.trafficInfo}>
                    <span className={styles.trafficPlatform}>{source.platform}</span>
                    <span className={styles.trafficAmount}>₦{formatNumber(source.amount)}</span>
                  </div>
                  <div className={styles.trafficBar}>
                    <div 
                      className={styles.trafficBarFill}
                      style={{ 
                        width: `${(source.amount / trafficSources[0].amount) * 100}%`,
                        backgroundColor: source.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: '14px', margin: 0 }}>No traffic data available</p>
              <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.7 }}>Platform analytics will show here once you receive support</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Support */}
      <div className={styles.supportCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Recent support</h3>
          <Link to="/dashboard/supporters" className={styles.viewAllLink}>
            View supporters <ArrowRight size={14} />
          </Link>
        </div>
        {recentSupport.length > 0 ? (
          <div className={styles.supportList}>
            {recentSupport.map((supporter) => (
              <div key={supporter.id} className={styles.supportItem}>
                <div className={styles.supportAvatar}>
                  <span>{supporter.name ? supporter.name[0].toUpperCase() : 'S'}</span>
                </div>
                <div className={styles.supportInfo}>
                  <div className={styles.supportName}>{supporter.name || 'Anonymous'}</div>
                  <div className={styles.supportDate}>{supporter.date || 'Recently'}</div>
                </div>
                <div className={styles.supportAmount}>₦{formatNumber(supporter.amount)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ fontSize: '14px', margin: 0 }}>No supporters yet</p>
            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.7 }}>Share your KOPA page to start receiving support</p>
          </div>
        )}
      </div>
    </div>
  );
}

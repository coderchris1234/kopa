import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight, Wallet, Users, TrendingUp as RateIcon } from 'lucide-react';
import { useAuth } from '../../hooks';
import { formatCurrency, formatNumber } from '../../utils';
import styles from './DashboardOverviewPage.module.css';

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  // Mock data
  const stats = {
    totalEarned: 127000,
    thisMonth: 127000,
    totalSupporters: 17,
    conversionRate: 0.5
  };

  const trafficSources = [
    { platform: 'TikTok', amount: 82000, color: '#00D4FF' },
    { platform: 'YouTube', amount: 32000, color: '#FF0000' },
    { platform: 'Instagram', amount: 24000, color: '#E4405F' },
    { platform: 'WhatsApp', amount: 24000, color: '#25D366' },
    { platform: 'X', amount: 18000, color: '#000000' }
  ];

  const recentSupport = [
    { id: 1, name: 'Christobel N.', date: 'Tuesday, yesterday', amount: 500 },
    { id: 2, name: 'Tunde A.', date: 'Monday, yesterday', amount: 1000 },
    { id: 3, name: 'Christobel N.', date: 'Monday, yesterday', amount: 1000 },
    { id: 4, name: 'Christobel N.', date: 'Monday, yesterday', amount: 1000 },
    { id: 5, name: 'Christobel N.', date: 'Monday, yesterday', amount: 1000 }
  ];

  const earningsData = [
    { date: '3 Sept', value: 30 },
    { date: '4 Sept', value: 45 },
    { date: '5 Sept', value: 60 },
    { date: '6 Sept', value: 85 },
    { date: '7 Sept', value: 100 },
    { date: '8 Sept', value: 70 },
    { date: '9 Sept', value: 50 }
  ];

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
          Good afternoon, Chris 👋
        </h1>
        <p className={styles.subtitle}>
          Track your earnings, supporters, and audience growth.
        </p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Wallet size={16} color="#10B981" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Total earned</div>
            <div className={styles.statValue}>₦{formatNumber(stats.totalEarned)}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <RateIcon size={16} color="#F59E0B" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>This month</div>
            <div className={styles.statValue}>₦{formatNumber(stats.thisMonth)}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={16} color="#3B82F6" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Total supporters</div>
            <div className={styles.statValue}>{stats.totalSupporters}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
              <path d="M8 4v4l2 2" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
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
        </div>

        {/* Traffic Sources */}
        <div className={styles.trafficCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Traffic sources</h3>
              <p className={styles.cardSubtitle}>Revenue by platform</p>
            </div>
          </div>
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
        <div className={styles.supportList}>
          {recentSupport.map((supporter) => (
            <div key={supporter.id} className={styles.supportItem}>
              <div className={styles.supportAvatar}>
                <span>C</span>
              </div>
              <div className={styles.supportInfo}>
                <div className={styles.supportName}>{supporter.name}</div>
                <div className={styles.supportDate}>{supporter.date}</div>
              </div>
              <div className={styles.supportAmount}>₦{formatNumber(supporter.amount)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

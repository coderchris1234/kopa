import { useState, useEffect } from 'react';
import { Heart, TrendingUp, BarChart } from 'lucide-react';
import { formatCurrency } from '../../utils';
import styles from './NotificationsPage.module.css';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
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

  // Mock notifications data matching screenshot
  const notifications = [
    {
      id: 1,
      type: 'payment',
      icon: 'heart',
      iconBg: '#FEE2E2',
      iconBgDark: '#7F1D1D',
      iconColor: '#EF4444',
      iconColorDark: '#FCA5A5',
      title: 'New support from Bolatumi',
      message: 'Bolatumi O. just sent you ₦5,000.',
      time: '3 days ago',
      unread: true
    },
    {
      id: 2,
      type: 'milestone',
      icon: 'trending',
      iconBg: '#FEF3C7',
      iconBgDark: '#78350F',
      iconColor: '#F59E0B',
      iconColorDark: '#FCD34D',
      title: 'Milestone reached',
      message: 'You\'ve hit ₦200,000 in total support.',
      time: '3 days ago',
      unread: true
    },
    {
      id: 3,
      type: 'payment',
      icon: 'heart',
      iconBg: '#FEE2E2',
      iconBgDark: '#7F1D1D',
      iconColor: '#EF4444',
      iconColorDark: '#FCA5A5',
      title: 'New support from Tunde',
      message: 'Tunde A. just sent you ₦2,000.',
      time: '5 days ago',
      unread: false
    },
    {
      id: 4,
      type: 'update',
      icon: 'chart',
      iconBg: '#F3E8FF',
      iconBgDark: '#581C87',
      iconColor: '#9333EA',
      iconColorDark: '#D8B4FE',
      title: 'Weekly summary',
      message: 'You gained 12 supporters this week.',
      time: '3 days ago',
      unread: false
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'payments') return notification.type === 'payment';
    if (activeFilter === 'updates') return notification.type === 'milestone' || notification.type === 'update';
    return true;
  });

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'heart':
        return <Heart size={18} fill="currentColor" />;
      case 'trending':
        return <TrendingUp size={18} />;
      case 'chart':
        return <BarChart size={18} />;
      default:
        return <Heart size={18} />;
    }
  };

  const handleMarkAllRead = () => {
    // Mark all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.subtitle}>Stay on top of your and milestones.</p>
        </div>
        <button className={styles.markReadButton} onClick={handleMarkAllRead}>
          Mark all read
        </button>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${activeFilter === 'payments' ? styles.active : ''}`}
          onClick={() => setActiveFilter('payments')}
        >
          Payments
        </button>
        <button
          className={`${styles.filterButton} ${activeFilter === 'updates' ? styles.active : ''}`}
          onClick={() => setActiveFilter('updates')}
        >
          Updates
        </button>
      </div>

      {/* Notifications List */}
      <div className={styles.notificationsList}>
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`${styles.notificationCard} ${notification.unread ? styles.unread : ''}`}
          >
            <div 
              className={styles.notificationIcon}
              style={{ 
                backgroundColor: isDark ? notification.iconBgDark : notification.iconBg,
                color: isDark ? notification.iconColorDark : notification.iconColor
              }}
            >
              {getIcon(notification.icon)}
            </div>
            <div className={styles.notificationContent}>
              <div className={styles.notificationHeader}>
                <h3 className={styles.notificationTitle}>
                  {notification.title}
                  {notification.unread && <span className={styles.unreadDot}></span>}
                </h3>
              </div>
              <p className={styles.notificationMessage}>{notification.message}</p>
              <p className={styles.notificationTime}>{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

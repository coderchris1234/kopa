import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Link as LinkIcon, 
  Bell, 
  User, 
  Settings, 
  ExternalLink,
  Menu,
  X,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '../../hooks';
import styles from './DashboardLayout.module.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { id: 'supporters', label: 'Supporters', icon: Users, path: '/dashboard/supporters' },
  { id: 'links', label: 'Payment Links', icon: LinkIcon, path: '/dashboard/links' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/dashboard/notifications' }
];

const MANAGE_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' }
];

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="KOPA" className={styles.logoImage} />
            <span className={styles.logoText}>KOPA</span>
          </div>
        </div>

        <div className={styles.sidebarContent}>
          {/* Overview Section */}
          <div className={styles.navSection}>
            <div className={styles.navSectionLabel}>OVERVIEW</div>
            <nav className={styles.nav}>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={closeSidebar}
                  >
                    <Icon size={18} className={styles.navIcon} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Manage Section */}
          <div className={styles.navSection}>
            <div className={styles.navSectionLabel}>MANAGE</div>
            <nav className={styles.nav}>
              {MANAGE_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={closeSidebar}
                  >
                    <Icon size={18} className={styles.navIcon} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <Link 
            to={`/${user?.username || 'creator'}`} 
            target="_blank"
            className={styles.viewPageLink}
            onClick={closeSidebar}
          >
            <ExternalLink size={16} />
            View my KOPA page
          </Link>

          <div className={styles.userSection}>
            <div className={styles.userAvatar}>
              <span>C</span>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Christobel Nwachukwu</div>
              <div className={styles.userEmail}>ogbonnauche08@gmail.com</div>
            </div>
            <button className={styles.menuButton}>
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${sidebarOpen ? styles.visible : ''}`}
        onClick={closeSidebar}
      />

      {/* Main Content */}
      <main className={styles.main}>
        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className={styles.mobileLogo}>KOPA</div>
          <div style={{ width: '40px' }} />
        </div>

        {children}
      </main>
    </div>
  );
}

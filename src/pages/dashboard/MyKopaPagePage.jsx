import { useState } from 'react';
import { Copy, ExternalLink, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils';
import styles from './MyKopaPagePage.module.css';

export default function MyKopaPagePage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock payment links data matching screenshot
  const paymentLinks = [
    { 
      id: 1, 
      name: 'Instagram link', 
      url: 'kopa.africa/chitibubossman', 
      visits: 3200, 
      supporters: 45, 
      revenue: 85000,
      conversion: 14
    },
    { 
      id: 2, 
      name: 'TikTok link', 
      url: 'kopa.africa/chitibubos/tiktok', 
      visits: 2100, 
      supporters: 28, 
      revenue: 52000,
      conversion: 13
    },
    { 
      id: 3, 
      name: 'WhatsApp link', 
      url: 'kopa.africa/chitibubos/whatsapp', 
      visits: 1800, 
      supporters: 22, 
      revenue: 48000,
      conversion: 12
    },
    { 
      id: 4, 
      name: 'YouTube link', 
      url: 'kopa.africa/chitibubosyt/youtube', 
      visits: 1200, 
      supporters: 12, 
      revenue: 21000,
      conversion: 14
    },
    { 
      id: 5, 
      name: 'X link', 
      url: 'kopa.africa/chitibubos/x', 
      visits: 1400, 
      supporters: 21, 
      revenue: 47000,
      conversion: 33
    },
  ];

  const totalVisits = paymentLinks.reduce((sum, link) => sum + link.visits, 0);
  const totalRevenue = paymentLinks.reduce((sum, link) => sum + link.revenue, 0);
  const activeLinks = paymentLinks.length;

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(`https://${url}`);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Payment Links</h1>
          <p className={styles.subtitle}>Create a unique link for each platform to track where supporters come from</p>
        </div>
        <button className={styles.createButton}>
          <span className={styles.plusIcon}>+</span>
          Create payment link
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active links</div>
          <div className={styles.statValue}>{activeLinks}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total visits</div>
          <div className={styles.statValue}>{totalVisits.toLocaleString()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total revenue</div>
          <div className={styles.statValue}>{formatCurrency(totalRevenue)}</div>
        </div>
      </div>

      {/* Payment Links Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Link</th>
              <th>Visits</th>
              <th>Supporters</th>
              <th>Revenue</th>
              <th>Conv.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paymentLinks.map((link) => (
              <tr key={link.id}>
                <td>
                  <div className={styles.linkCell}>
                    <div className={styles.linkIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </div>
                    <div className={styles.linkInfo}>
                      <div className={styles.linkName}>{link.name}</div>
                      <div className={styles.linkUrl}>{link.url}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.dataCell}>{link.visits.toLocaleString()}</td>
                <td className={styles.dataCell}>{link.supporters}</td>
                <td className={styles.dataCell}>{formatCurrency(link.revenue)}</td>
                <td className={styles.dataCell}>
                  <span className={styles.convBadge}>{link.conversion}%</span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleCopyLink(link.url)}
                      title="Copy link"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      className={styles.actionButton}
                      title="Open link"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button 
                      className={styles.actionButton}
                      title="Delete link"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

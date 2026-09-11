import { useState } from 'react';
import { Search } from 'lucide-react';
import { formatCurrency } from '../../utils';
import styles from './SupportersPage.module.css';

export default function SupportersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock supporters data matching screenshot
  const supporters = [
    { id: 1, name: 'Hauwa K.', initials: 'H', supporters: 5, source: 'YouTube', date: 'Last 3 days ago', amount: 30000 },
    { id: 2, name: 'Emeka D.', initials: 'E', supporters: 1, source: 'WhatsApp', date: 'Last 3 days ago', amount: 15000 },
    { id: 3, name: 'Lola B.', initials: 'L', supporters: 2, source: 'Instagram', date: 'Last 3 days ago', amount: 10000 },
    { id: 4, name: 'Zainab M.', initials: 'Z', supporters: 1, source: 'WhatsApp', date: 'Last 5 days ago', amount: 30000 },
    { id: 5, name: 'Bola T.', initials: 'B', supporters: 2, source: 'TikTok', date: 'Last 5 days ago', amount: 6000 },
    { id: 6, name: 'Aisha V.', initials: 'A', supporters: 2, source: 'WhatsApp', date: 'Last 7 days ago', amount: 4000 },
    { id: 7, name: 'Tunde A.', initials: 'T', supporters: 1, source: 'TikTok', date: 'Last 9 days ago', amount: 3000 },
    { id: 8, name: 'Amara O.', initials: 'A', supporters: 2, source: 'X', date: 'Last 3 days ago', amount: 15000 },
    { id: 9, name: 'Ibrahim U.', initials: 'I', supporters: 2, source: 'TikTok', date: 'Last 5 days ago', amount: 10000 },
    { id: 10, name: 'Bolatumi O.', initials: 'B', supporters: 10, source: 'Instagram', date: 'Last 5 days ago', amount: 8500 },
    { id: 11, name: 'Kwame B.', initials: 'K', supporters: 1, source: 'YouTube', date: 'Last 5 days ago', amount: 6000 },
    { id: 12, name: 'Ngozi P.', initials: 'N', supporters: 2, source: 'Instagram', date: 'Last 9 days ago', amount: 4000 },
    { id: 13, name: 'Peter A.', initials: 'P', supporters: 2, source: 'Instagram', date: 'Last 5 days ago', amount: 4000 },
    { id: 14, name: 'Sam K.', initials: 'S', supporters: 3, source: 'TikTok', date: 'Last 7 days ago', amount: 2000 },
  ];

  const filteredSupporters = supporters.filter(supporter => {
    const matchesSearch = supporter.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'top') return matchesSearch && supporter.amount >= 15000;
    if (activeFilter === 'recent') return matchesSearch && supporter.date.includes('3 days');
    return matchesSearch;
  });

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Your supporters <span className={styles.heartIcon}>❤️</span>
          </h1>
          <p className={styles.subtitle}>The people who keep you creating</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search supporters"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'top' ? styles.active : ''}`}
            onClick={() => setActiveFilter('top')}
          >
            Top supporters
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'recent' ? styles.active : ''}`}
            onClick={() => setActiveFilter('recent')}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Supporters Grid */}
      <div className={styles.supportersGrid}>
        {filteredSupporters.map((supporter) => (
          <div key={supporter.id} className={styles.supporterCard}>
            <div className={styles.cardContent}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {supporter.initials}
                </div>
              </div>
              <div className={styles.supporterInfo}>
                <h3 className={styles.supporterName}>{supporter.name}</h3>
                <p className={styles.supporterMeta}>
                  {supporter.supporters} supporters • {supporter.source}
                </p>
                <p className={styles.supporterDate}>{supporter.date}</p>
              </div>
            </div>
            <div className={styles.amount}>{formatCurrency(supporter.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

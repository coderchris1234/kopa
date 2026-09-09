import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Input } from '../../components/ui';
import { formatCurrency, formatDate, formatRelativeTime, getInitials } from '../../utils';
import { allSupporters } from '../../data';
import styles from './SupportersPage.module.css';

export default function SupportersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupporter, setSelectedSupporter] = useState(null);

  // Calculate stats
  const totalSupporters = allSupporters.length;
  const totalRevenue = allSupporters.reduce((sum, s) => sum + s.totalAmount, 0);
  const averageSupport = totalRevenue / totalSupporters;
  const totalContributions = allSupporters.reduce((sum, s) => sum + s.contributionsCount, 0);

  // Filter supporters based on search
  const filteredSupporters = allSupporters.filter(supporter =>
    supporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supporter.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort supporters by total amount (highest first)
  const sortedSupporters = [...filteredSupporters].sort((a, b) => b.totalAmount - a.totalAmount);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Supporters</h1>
          <p className={styles.subtitle}>
            People who have supported your work
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total supporters</div>
          <div className={styles.statValue}>{totalSupporters}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total revenue</div>
          <div className={styles.statValue}>{formatCurrency(totalRevenue)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Average support</div>
          <div className={styles.statValue}>{formatCurrency(Math.round(averageSupport))}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total contributions</div>
          <div className={styles.statValue}>{totalContributions}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <Input
            type="search"
            placeholder="Search supporters by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search size={18} />}
          />
        </div>
      </div>

      {/* Supporters List */}
      <div className={styles.supportersList}>
        {/* Header Row */}
        <div className={`${styles.supporterRow} ${styles.header}`}>
          <div>Supporter</div>
          <div>Total support</div>
          <div>Contributions</div>
          <div>Average</div>
          <div>Last support</div>
        </div>

        {/* Data Rows */}
        {sortedSupporters.length === 0 ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            {searchTerm ? 'No supporters found matching your search' : 'No supporters yet'}
          </div>
        ) : (
          sortedSupporters.map((supporter) => (
            <div
              key={supporter.id}
              className={styles.supporterRow}
              onClick={() => setSelectedSupporter(supporter)}
            >
              <div className={styles.supporterInfo}>
                <div className={styles.avatar}>
                  {getInitials(supporter.name)}
                </div>
                <div className={styles.supporterDetails}>
                  <div className={styles.supporterName}>{supporter.name}</div>
                  <div className={styles.supporterEmail}>{supporter.email}</div>
                </div>
              </div>
              <div className={styles.supporterStat} data-label="Total support">
                {formatCurrency(supporter.totalAmount)}
              </div>
              <div className={styles.supporterStat} data-label="Contributions">
                {supporter.contributionsCount}
              </div>
              <div className={styles.supporterStat} data-label="Average">
                {formatCurrency(supporter.averageAmount)}
              </div>
              <div className={styles.supporterStat} data-label="Last support">
                {formatRelativeTime(supporter.lastSupport)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Supporter Detail Modal */}
      {selectedSupporter && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSupporter(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <div className={styles.modalAvatar}>
                  {getInitials(selectedSupporter.name)}
                </div>
                <div className={styles.modalTitleText}>
                  <h3>{selectedSupporter.name}</h3>
                  <p>{selectedSupporter.email}</p>
                </div>
              </div>
              <button className={styles.closeButton} onClick={() => setSelectedSupporter(null)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Stats */}
              <div className={styles.detailStats}>
                <div className={styles.detailStat}>
                  <div className={styles.detailStatLabel}>Total supported</div>
                  <div className={styles.detailStatValue}>
                    {formatCurrency(selectedSupporter.totalAmount)}
                  </div>
                </div>
                <div className={styles.detailStat}>
                  <div className={styles.detailStatLabel}>Contributions</div>
                  <div className={styles.detailStatValue}>
                    {selectedSupporter.contributionsCount}
                  </div>
                </div>
                <div className={styles.detailStat}>
                  <div className={styles.detailStatLabel}>Average amount</div>
                  <div className={styles.detailStatValue}>
                    {formatCurrency(selectedSupporter.averageAmount)}
                  </div>
                </div>
                <div className={styles.detailStat}>
                  <div className={styles.detailStatLabel}>First supported</div>
                  <div className={styles.detailStatValue} style={{ fontSize: 'var(--text-base)' }}>
                    {formatDate(selectedSupporter.firstSupport)}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className={styles.messagesSection}>
                <h4 className={styles.sectionTitle}>Messages</h4>
                {selectedSupporter.messages.length === 0 ? (
                  <div className={styles.noMessages}>
                    No messages from this supporter
                  </div>
                ) : (
                  <div className={styles.messagesList}>
                    {selectedSupporter.messages.map((message, index) => (
                      <div key={index} className={styles.messageItem}>
                        <div className={styles.messageText}>"{message.text}"</div>
                        <div className={styles.messageDate}>
                          {formatDate(message.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

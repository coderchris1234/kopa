import { useState } from 'react';
import { Search, Download, Receipt } from 'lucide-react';
import { Input, Select, Button, Badge } from '../../components/ui';
import { formatCurrency, formatDateTime, formatDate } from '../../utils';
import { transactions } from '../../data';
import styles from './TransactionsPage.module.css';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Calculate stats
  const totalTransactions = transactions.length;
  const successfulTransactions = transactions.filter(t => t.status === 'successful');
  const totalRevenue = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = successfulTransactions.reduce((sum, t) => sum + t.platformFee, 0);
  const netRevenue = successfulTransactions.reduce((sum, t) => sum + t.netAmount, 0);

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.supporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.supporterEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getStatusBadge = (status) => {
    return (
      <span className={`${styles.statusBadge} ${styles[status]}`}>
        <span className={styles.statusDot} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Export transactions');
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Transactions</h1>
          <p className={styles.subtitle}>
            Complete history of all payments and transactions
          </p>
        </div>
        <Button variant="outline" onClick={handleExport} className={styles.exportButton}>
          <Download size={18} />
          Export
        </Button>
      </div>

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total transactions</div>
          <div className={styles.statValue}>{totalTransactions}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total revenue</div>
          <div className={styles.statValue}>{formatCurrency(totalRevenue)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Platform fees</div>
          <div className={styles.statValue}>{formatCurrency(totalFees)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Net revenue</div>
          <div className={styles.statValue}>{formatCurrency(netRevenue)}</div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchInput}>
          <Input
            type="search"
            placeholder="Search by name, email, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search size={18} />}
          />
        </div>

        <div className={styles.filterGroup}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'successful', label: 'Successful' },
              { value: 'pending', label: 'Pending' },
              { value: 'failed', label: 'Failed' }
            ]}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className={styles.transactionsCard}>
        {sortedTransactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Receipt size={32} />
            </div>
            <h3 className={styles.emptyTitle}>No transactions found</h3>
            <p className={styles.emptyDescription}>
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Transactions will appear here once you receive support'}
            </p>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.th}>Supporter</th>
                    <th className={styles.th}>Amount</th>
                    <th className={styles.th}>Fee</th>
                    <th className={styles.th}>Net</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Tier</th>
                    <th className={styles.th}>Source</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Message</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {sortedTransactions.map((transaction) => (
                    <tr key={transaction.id} className={styles.tr}>
                      <td className={styles.td} data-label="Supporter">
                        <div className={styles.supporterCell}>
                          <span className={styles.supporterName}>
                            {transaction.supporterName}
                          </span>
                          <span className={styles.supporterEmail}>
                            {transaction.supporterEmail}
                          </span>
                        </div>
                      </td>
                      <td className={styles.td} data-label="Amount">
                        <span className={styles.amountCell}>
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className={styles.td} data-label="Fee">
                        {formatCurrency(transaction.platformFee)}
                      </td>
                      <td className={styles.td} data-label="Net">
                        <span className={styles.amountCell}>
                          {formatCurrency(transaction.netAmount)}
                        </span>
                      </td>
                      <td className={styles.td} data-label="Status">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className={styles.td} data-label="Tier">
                        {transaction.tier}
                      </td>
                      <td className={styles.td} data-label="Source">
                        <Badge variant="default">{transaction.source}</Badge>
                      </td>
                      <td className={styles.td} data-label="Date">
                        {formatDateTime(transaction.date)}
                      </td>
                      <td className={styles.td} data-label="Message">
                        {transaction.message ? (
                          <span className={styles.messageCell} title={transaction.message}>
                            "{transaction.message}"
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination (placeholder) */}
            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Showing {sortedTransactions.length} of {totalTransactions} transactions
              </div>
              <div className={styles.paginationButtons}>
                {/* Pagination buttons would go here */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

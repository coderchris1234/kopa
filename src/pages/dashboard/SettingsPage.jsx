import { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Button, Input, Select } from '../../components/ui';
import { useAuth } from '../../hooks';
import { getInitials, isValidEmail } from '../../utils';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();

  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  // Account state
  const [accountData, setAccountData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Payment state
  const [paymentData, setPaymentData] = useState({
    accountName: 'Christobel Nwachukwu',
    accountNumber: '0123456789',
    bankName: 'GTBank',
    isVerified: true
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    emailNewSupport: true,
    emailWeeklySummary: true,
    emailMonthlyReport: false,
    emailProductUpdates: true
  });

  const handleProfileSave = () => {
    updateUser({
      name: profileData.name,
      email: profileData.email,
      bio: profileData.bio
    });
    // Show success toast
  };

  const handlePasswordChange = () => {
    // Validate and change password
    console.log('Password change');
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Delete account logic
      console.log('Delete account');
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className={styles.sections}>
        {/* Profile Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <p className={styles.sectionDescription}>
              Update your profile information visible to your supporters
            </p>
          </div>

          {/* Avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {getInitials(profileData.name)}
            </div>
            <div className={styles.avatarInfo}>
              <div className={styles.avatarTitle}>Profile photo</div>
              <div className={styles.avatarDescription}>
                JPG, GIF or PNG. Max size of 2MB.
              </div>
              <div className={styles.avatarActions}>
                <Button size="sm" variant="outline">Upload photo</Button>
                <Button size="sm" variant="ghost">Remove</Button>
              </div>
            </div>
          </div>

          <div className={styles.form}>
            <Input
              label="Full name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              placeholder="Your full name"
            />

            <Input
              label="Username"
              value={user?.username || ''}
              disabled
              helpText="Username cannot be changed"
            />

            <div className={styles.saveActions}>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleProfileSave}>Save changes</Button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Account</h2>
            <p className={styles.sectionDescription}>
              Manage your email and password
            </p>
          </div>

          <div className={styles.form}>
            <Input
              label="Email address"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              placeholder="you@example.com"
            />

            <div style={{ 
              padding: 'var(--space-4)', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)'
            }}>
              <h3 style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-semibold)', 
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)'
              }}>
                Change password
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Input
                  label="Current password"
                  type="password"
                  value={accountData.currentPassword}
                  onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                />

                <Input
                  label="New password"
                  type="password"
                  value={accountData.newPassword}
                  onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                  placeholder="Enter new password"
                />

                <Input
                  label="Confirm new password"
                  type="password"
                  value={accountData.confirmPassword}
                  onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                />

                <Button variant="outline" size="sm" onClick={handlePasswordChange}>
                  Update password
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Payment</h2>
            <p className={styles.sectionDescription}>
              Manage your payout details and preferences
            </p>
          </div>

          {paymentData.isVerified ? (
            <div className={styles.bankCard}>
              <div className={styles.bankCardHeader}>
                <div className={styles.bankCardTitle}>Bank account</div>
                <span className={styles.verifiedBadge}>
                  <CheckCircle size={12} />
                  Verified
                </span>
              </div>
              <div className={styles.bankCardDetails}>
                <div className={styles.bankCardDetail}>
                  <strong>Account name:</strong> {paymentData.accountName}
                </div>
                <div className={styles.bankCardDetail}>
                  <strong>Account number:</strong> {paymentData.accountNumber}
                </div>
                <div className={styles.bankCardDetail}>
                  <strong>Bank:</strong> {paymentData.bankName}
                </div>
              </div>
            </div>
          ) : null}

          <div className={styles.form}>
            <div className={styles.formRow}>
              <Input
                label="Account name"
                value={paymentData.accountName}
                onChange={(e) => setPaymentData({ ...paymentData, accountName: e.target.value })}
                placeholder="Account holder name"
              />

              <Input
                label="Account number"
                value={paymentData.accountNumber}
                onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                placeholder="0123456789"
              />
            </div>

            <Select
              label="Bank"
              value={paymentData.bankName}
              onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
              options={[
                { value: 'GTBank', label: 'GTBank' },
                { value: 'Access Bank', label: 'Access Bank' },
                { value: 'Zenith Bank', label: 'Zenith Bank' },
                { value: 'First Bank', label: 'First Bank' },
                { value: 'UBA', label: 'UBA' },
                { value: 'Stanbic IBTC', label: 'Stanbic IBTC' }
              ]}
            />

            <div className={styles.saveActions}>
              <Button variant="outline">Cancel</Button>
              <Button>Save bank details</Button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notifications</h2>
            <p className={styles.sectionDescription}>
              Choose what notifications you want to receive
            </p>
          </div>

          <div className={styles.form}>
            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <div className={styles.notificationTitle}>New support received</div>
                <div className={styles.notificationDescription}>
                  Get notified when someone supports you
                </div>
              </div>
              <div 
                className={`${styles.toggle} ${notifications.emailNewSupport ? styles.active : ''}`}
                onClick={() => handleNotificationToggle('emailNewSupport')}
              >
                <div className={styles.toggleHandle} />
              </div>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <div className={styles.notificationTitle}>Weekly summary</div>
                <div className={styles.notificationDescription}>
                  Receive a summary of your earnings every week
                </div>
              </div>
              <div 
                className={`${styles.toggle} ${notifications.emailWeeklySummary ? styles.active : ''}`}
                onClick={() => handleNotificationToggle('emailWeeklySummary')}
              >
                <div className={styles.toggleHandle} />
              </div>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <div className={styles.notificationTitle}>Monthly report</div>
                <div className={styles.notificationDescription}>
                  Detailed monthly report with insights
                </div>
              </div>
              <div 
                className={`${styles.toggle} ${notifications.emailMonthlyReport ? styles.active : ''}`}
                onClick={() => handleNotificationToggle('emailMonthlyReport')}
              >
                <div className={styles.toggleHandle} />
              </div>
            </div>

            <div className={styles.notificationItem}>
              <div className={styles.notificationInfo}>
                <div className={styles.notificationTitle}>Product updates</div>
                <div className={styles.notificationDescription}>
                  News about KOPA features and improvements
                </div>
              </div>
              <div 
                className={`${styles.toggle} ${notifications.emailProductUpdates ? styles.active : ''}`}
                onClick={() => handleNotificationToggle('emailProductUpdates')}
              >
                <div className={styles.toggleHandle} />
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`${styles.section} ${styles.dangerZone}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <AlertTriangle size={20} style={{ display: 'inline', marginRight: 'var(--space-2)' }} />
              Danger Zone
            </h2>
            <p className={styles.sectionDescription}>
              Irreversible and destructive actions
            </p>
          </div>

          <div className={styles.form}>
            <div style={{ 
              padding: 'var(--space-4)', 
              backgroundColor: 'white', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--error)'
            }}>
              <h3 style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-semibold)', 
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)'
              }}>
                Delete account
              </h3>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)'
              }}>
                Once you delete your account, there is no going back. All your data, supporters, and transaction history will be permanently deleted.
              </p>
              <Button 
                variant="danger" 
                size="sm"
                onClick={handleDeleteAccount}
              >
                Delete my account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

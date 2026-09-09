import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Download, Music, ExternalLink } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';
import styles from './PaymentSuccessPage.module.css';

export default function PaymentSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from CheckoutPage
  const { creator, amount, platformFee, message, tier, transactionId, paymentMethod } = location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!creator || !amount) {
      navigate('/');
    }
  }, [creator, amount, navigate]);

  if (!creator || !amount) {
    return null;
  }

  const handleSupportAgain = () => {
    navigate(`/${creator.username}`);
  };

  const handleExploreKopa = () => {
    navigate('/');
  };

  const handleDownloadReceipt = () => {
    // In production, generate and download PDF receipt
    alert('Receipt download functionality would be implemented here');
  };

  const handleShare = (platform) => {
    const shareText = `I just supported ${creator.name} on KOPA! 🎉`;
    const shareUrl = `https://kopa.africa/${creator.username}`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.successIcon}>
          <Check size={64} strokeWidth={3} className={styles.checkmark} />
        </div>

        {/* Message */}
        <h1 className={styles.title}>Thank you! 🎉</h1>
        <p className={styles.message}>
          Your support means the world to{' '}
          <span className={styles.creatorName}>{creator.name}</span>.
          You're helping them continue creating amazing content.
        </p>

        {/* Details Card */}
        <div className={styles.detailsCard}>
          <div className={styles.detailsTitle}>Payment Details</div>
          
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Support tier</span>
              <span className={styles.detailValue}>{tier}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment method</span>
              <span className={styles.detailValue}>
                {paymentMethod === 'card' ? 'Card Payment' : 'Bank Transfer'}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Transaction ID</span>
              <span className={`${styles.detailValue} ${styles.transactionId}`}>
                {transactionId}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date</span>
              <span className={styles.detailValue}>
                {formatDate(new Date().toISOString())}
              </span>
            </div>

            <div className={`${styles.detailRow} ${styles.amount}`}>
              <span className={styles.detailLabel}>Amount paid</span>
              <span className={styles.detailValue}>{formatCurrency(amount)}</span>
            </div>
          </div>

          {message && (
            <div className={styles.messageBox}>
              <div className={styles.messageBoxLabel}>Your message</div>
              <div className={styles.messageBoxText}>"{message}"</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={handleSupportAgain}>
            Support again
          </button>
          <button className={styles.secondaryButton} onClick={handleExploreKopa}>
            Explore KOPA
          </button>
        </div>

        {/* Share Section */}
        <div className={styles.shareSection}>
          <div className={styles.shareTitle}>
            Share your support and inspire others
          </div>
          <div className={styles.shareButtons}>
            <button
              className={styles.shareButton}
              onClick={() => handleShare('twitter')}
              title="Share on X"
            >
              <ExternalLink size={20} />
            </button>
            <button
              className={styles.shareButton}
              onClick={() => handleShare('facebook')}
              title="Share on Facebook"
            >
              <ExternalLink size={20} />
            </button>
            <button
              className={styles.shareButton}
              onClick={() => handleShare('whatsapp')}
              title="Share on WhatsApp"
            >
              <ExternalLink size={20} />
            </button>
          </div>
        </div>

        {/* Receipt Download */}
        <div className={styles.receiptLink}>
          <button className={styles.receiptButton} onClick={handleDownloadReceipt}>
            <Download size={16} />
            Download receipt
          </button>
        </div>
      </div>
    </div>
  );
}

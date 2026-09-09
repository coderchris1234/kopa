import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Lock } from 'lucide-react';
import { getInitials, formatCurrency } from '../utils';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data passed from PublicCreatorPage
  const { creator, amount, message, tier } = location.state || {};
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if no data
  if (!creator || !amount) {
    navigate('/');
    return null;
  }

  const platformFee = Math.round(amount * 0.03); // 3% platform fee
  const totalAmount = amount;

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      description: 'Pay with Visa, Mastercard, or Verve',
      icon: CreditCard
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer via Paystack',
      icon: Smartphone
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Navigate to success page with transaction details
      navigate('/payment-success', {
        state: {
          creator,
          amount: totalAmount,
          platformFee,
          message,
          tier,
          transactionId: `TXN${Date.now()}`,
          paymentMethod: selectedPaymentMethod
        }
      });
    }, 2000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBack}>
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className={styles.title}>Complete your support</h1>
          <p className={styles.subtitle}>Review your support details</p>
        </div>

        {/* Creator Card */}
        <div className={styles.creatorCard}>
          <div className={styles.creatorAvatar}>
            {getInitials(creator.name)}
          </div>
          <div className={styles.creatorInfo}>
            <div className={styles.creatorName}>{creator.name}</div>
            <div className={styles.creatorUsername}>
              kopa.africa/{creator.username}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Summary</h2>
          
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Support tier</span>
            <span className={styles.summaryValue}>{tier}</span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Support amount</span>
            <span className={styles.summaryValue}>{formatCurrency(amount)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Platform fee (3%)</span>
            <span className={styles.summaryValue}>{formatCurrency(platformFee)}</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>{formatCurrency(totalAmount)}</span>
          </div>

          {message && (
            <div className={styles.messageDisplay}>
              <div className={styles.messageLabel}>Your message</div>
              <div className={styles.messageText}>"{message}"</div>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className={styles.paymentSection}>
          <h2 className={styles.paymentTitle}>Payment method</h2>
          
          <div className={styles.paymentMethods}>
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`${styles.paymentMethod} ${
                    selectedPaymentMethod === method.id ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className={styles.paymentRadio}>
                    <div className={styles.dot} />
                  </div>
                  <div className={styles.paymentIcon}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.paymentInfo}>
                    <div className={styles.paymentName}>{method.name}</div>
                    <div className={styles.paymentDescription}>
                      {method.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.payButton}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              'Processing...'
            ) : (
              <>
                <Lock size={18} />
                Pay {formatCurrency(totalAmount)}
              </>
            )}
          </button>

          <button className={styles.cancelButton} onClick={handleBack}>
            Cancel
          </button>
        </div>

        {/* Security Notice */}
        <div className={styles.securityNotice}>
          <Lock size={14} />
          <span>Your payment is secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}

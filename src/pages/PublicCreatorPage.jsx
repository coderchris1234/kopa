import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Heart, Music, ExternalLink } from 'lucide-react';
import { getInitials, formatCurrency } from '../utils';
import { mockPublicCreator } from '../data';
import styles from './PublicCreatorPage.module.css';

export default function PublicCreatorPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  // In production, fetch creator data by username
  const creator = mockPublicCreator;

  const [selectedTier, setSelectedTier] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setCustomAmount(''); // Clear custom amount when tier is selected
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedTier(null); // Clear tier selection when custom amount is entered
  };

  const handleSupport = () => {
    const amount = customAmount || selectedTier?.amount;
    
    if (!amount) {
      alert('Please select a support tier or enter a custom amount');
      return;
    }

    // Navigate to checkout page with selected amount and message
    navigate('/checkout', {
      state: {
        creator,
        amount: parseInt(amount),
        message,
        tier: selectedTier?.title || 'Custom Support'
      }
    });
  };

  const getSocialIcon = (platform) => {
    const icons = {
      instagram: ExternalLink,
      tiktok: Music,
      x: ExternalLink,
      youtube: ExternalLink,
      website: ExternalLink
    };
    return icons[platform.toLowerCase()] || ExternalLink;
  };

  const activeSocials = creator.socialLinks.filter(link => link.url);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            {getInitials(creator.name)}
          </div>
          <h1 className={styles.name}>{creator.name}</h1>
          <p className={styles.username}>kopa.africa/{creator.username}</p>
          <p className={styles.bio}>{creator.bio}</p>

          {/* Social Links */}
          {activeSocials.length > 0 && (
            <div className={styles.socialLinks}>
              {activeSocials.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    title={social.platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className={styles.supportSection}>
          <h2 className={styles.supportTitle}>Support my work</h2>
          <p className={styles.supportSubtitle}>
            Choose an amount to show your support
          </p>

          {/* Support Tiers */}
          <div className={styles.tiers}>
            {creator.supportTiers.map((tier) => (
              <div
                key={tier.id}
                className={`${styles.tierCard} ${selectedTier?.id === tier.id ? styles.selected : ''}`}
                onClick={() => handleTierSelect(tier)}
              >
                <div className={styles.tierInfo}>
                  <div className={styles.tierTitle}>{tier.title}</div>
                  <div className={styles.tierAmount}>
                    {formatCurrency(tier.amount)}
                  </div>
                </div>
                <div className={styles.tierCheckmark}>
                  <Check size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Custom Amount */}
          <div className={styles.customAmount}>
            <label className={styles.customAmountLabel}>
              Or enter a custom amount
            </label>
            <input
              type="text"
              inputMode="numeric"
              className={styles.customAmountInput}
              placeholder="₦0"
              value={customAmount ? `₦${customAmount}` : ''}
              onChange={handleCustomAmountChange}
            />
          </div>

          {/* Message */}
          <div className={styles.messageSection}>
            <label className={styles.messageLabel}>
              Leave a message (optional)
            </label>
            <textarea
              className={styles.messageTextarea}
              placeholder="Say something nice..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={300}
            />
          </div>

          {/* Support Button */}
          <button
            className={styles.supportButton}
            onClick={handleSupport}
            disabled={!selectedTier && !customAmount}
          >
            <Heart size={20} fill="currentColor" />
            Support {creator.name.split(' ')[0]}
          </button>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{creator.totalSupporters}</span>
            <span className={styles.statLabel}>Supporters</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {formatCurrency(creator.totalEarnings)}
            </span>
            <span className={styles.statLabel}>Total Support</span>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Want your own support page?{' '}
            <a href="/signup" className={styles.footerLink}>
              Join KOPA
            </a>
          </p>
          <div className={styles.poweredBy}>
            <span>Powered by</span>
            <span className={styles.logo}>KOPA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

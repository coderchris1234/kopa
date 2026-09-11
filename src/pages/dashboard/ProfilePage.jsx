import { useState } from 'react';
import { Camera } from 'lucide-react';
import { FaTiktok, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useAuth } from '../../hooks';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    displayName: 'Chris The Photographer',
    username: 'christobel',
    bio: 'Lagos-based portrait & street photographer. Capturing the soul of the city, one frame at a time. Available for bookings & workshops.',
    category: 'Photography',
    instagram: '@christobelphotos',
    tiktok: '@christobel',
    x: '@christobel',
    youtube: '@ChristobelPhoto',
    whatsapp: '+2348012345678'
  });

  const [supportTiers, setSupportTiers] = useState([
    { id: 1, name: 'Buy me a coffee', amount: '₦500' },
    { id: 2, name: 'Support my work', amount: '₦2,000' },
    { id: 3, name: 'Premium supporter', amount: '₦5,000' }
  ]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>Manage what your supporters see</p>
      </div>

      <div className={styles.content}>
        {/* Left Column - Profile Card */}
        <div className={styles.leftColumn}>
          <div className={styles.profileCard}>
            {/* Cover Image */}
            <div className={styles.coverImage}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {formData.displayName.charAt(0)}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{formData.displayName}</h2>
              <p className={styles.profileUsername}>@{formData.username}</p>
              <p className={styles.profileBio}>{formData.bio}</p>

              {/* Social Links Preview */}
              <div className={styles.socialPreview}>
                <a href="#" className={styles.socialLink}>
                  <FaInstagram size={14} />
                  Instagram
                </a>
                <a href="#" className={styles.socialLink}>
                  <FaTiktok size={14} />
                  TikTok
                </a>
                <a href="#" className={styles.socialLink}>
                  <FaXTwitter size={14} />
                  X
                </a>
              </div>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <path d="M20 8v6M23 11h-6"/>
                  </svg>
                  YouTube
                </div>
                <div className={styles.stat}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  WhatsApp
                </div>
              </div>

              <a href="#" className={styles.viewPageLink}>
                View live page →
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Details Form */}
        <div className={styles.rightColumn}>
          {/* Profile Details */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile details</h3>

            <div className={styles.uploadSection}>
              <button className={styles.uploadButton}>
                <Camera size={16} />
                Upload photo
              </button>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Display name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  className={styles.input}
                  placeholder="Chris The Photographer"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className={styles.input}
                  placeholder="kopa.africa/christobel"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className={styles.textarea}
                placeholder="Tell supporters what you create"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={styles.select}
              >
                <option value="Photography">Photography</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Writing">Writing</option>
                <option value="Video">Video</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Social links</h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Instagram</label>
                <div className={styles.inputWithIcon}>
                  <FaInstagram size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    className={styles.inputWithIconField}
                    placeholder="@christobelphotos"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>TikTok</label>
                <div className={styles.inputWithIcon}>
                  <FaTiktok size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={formData.tiktok}
                    onChange={(e) => handleChange('tiktok', e.target.value)}
                    className={styles.inputWithIconField}
                    placeholder="@christobel"
                  />
                </div>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>X</label>
                <div className={styles.inputWithIcon}>
                  <FaXTwitter size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={formData.x}
                    onChange={(e) => handleChange('x', e.target.value)}
                    className={styles.inputWithIconField}
                    placeholder="@christobel"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>YouTube</label>
                <div className={styles.inputWithIcon}>
                  <FaYoutube size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    value={formData.youtube}
                    onChange={(e) => handleChange('youtube', e.target.value)}
                    className={styles.inputWithIconField}
                    placeholder="@ChristobelPhoto"
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>WhatsApp</label>
              <div className={styles.inputWithIcon}>
                <FaWhatsapp size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className={styles.inputWithIconField}
                  placeholder="+2348012345678"
                />
              </div>
            </div>
          </div>

          {/* Support Tiers */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>Support tiers</h3>
                <p className={styles.sectionSubtitle}>Set the amounts supporters can choose.</p>
              </div>
              <button className={styles.addButton}>+ Add tier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

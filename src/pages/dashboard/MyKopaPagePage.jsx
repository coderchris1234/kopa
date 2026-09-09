import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Share2, ExternalLink, Eye, Music2, Globe } from 'lucide-react';
import { Button, Input, Textarea } from '../../components/ui';
import { useAuth } from '../../hooks';
import { generateKopaLink, copyToClipboard, getInitials, formatCurrency } from '../../utils';
import styles from './MyKopaPagePage.module.css';

const SOCIAL_ICONS = {
  instagram: Globe,
  tiktok: Music2,
  x: Globe,
  youtube: Globe,
  facebook: Globe,
  website: Globe
};

export default function MyKopaPagePage() {
  const { user, updateUser } = useAuth();
  
  // Editor state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    instagram: user?.socialLinks?.instagram || '',
    tiktok: user?.socialLinks?.tiktok || '',
    x: user?.socialLinks?.x || '',
    youtube: user?.socialLinks?.youtube || '',
    website: user?.socialLinks?.website || ''
  });

  const [isPublic, setIsPublic] = useState(true);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      bio: formData.bio,
      socialLinks: {
        instagram: formData.instagram,
        tiktok: formData.tiktok,
        x: formData.x,
        youtube: formData.youtube,
        website: formData.website
      }
    });
    // Show success toast here
  };

  const handleCopyLink = async () => {
    const link = generateKopaLink(user?.username || 'creator');
    await copyToClipboard(`https://${link}`);
  };

  // Get active social links for preview
  const activeSocialLinks = Object.entries({
    instagram: formData.instagram,
    tiktok: formData.tiktok,
    x: formData.x,
    youtube: formData.youtube,
    website: formData.website
  }).filter(([_, url]) => url);

  // Mock support tiers (in real app, these would come from user data)
  const supportTiers = [
    { id: '1', title: 'Buy me a coffee', amount: 500 },
    { id: '2', title: 'Support my work', amount: 2000 },
    { id: '3', title: 'Super Supporter', amount: 5000 }
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>My KOPA Page</h1>
        <p className={styles.subtitle}>
          Manage your public support page and share it with your audience
        </p>
      </div>

      <div className={styles.layout}>
        {/* Editor Section */}
        <div className={styles.editorSection}>
          <h2 className={styles.sectionTitle}>Edit your page</h2>

          {/* Public Link */}
          <div className={styles.linkSection}>
            <div className={styles.linkLabel}>Your public link</div>
            <div className={styles.linkValue}>
              {generateKopaLink(user?.username || 'creator')}
            </div>
            <div className={styles.linkActions}>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy size={16} />
                Copy link
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} />
                Share
              </Button>
            </div>
          </div>

          {/* Profile Editor */}
          <div className={styles.editorCard}>
            <div className={styles.form}>
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your display name"
              />

              <Textarea
                label="Bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Tell your audience about yourself..."
                rows={4}
              />

              <Input
                label="Instagram"
                value={formData.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                placeholder="https://instagram.com/yourhandle"
              />

              <Input
                label="TikTok"
                value={formData.tiktok}
                onChange={(e) => handleChange('tiktok', e.target.value)}
                placeholder="https://tiktok.com/@yourhandle"
              />

              <Input
                label="X (Twitter)"
                value={formData.x}
                onChange={(e) => handleChange('x', e.target.value)}
                placeholder="https://x.com/yourhandle"
              />

              <Input
                label="YouTube"
                value={formData.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
                placeholder="https://youtube.com/@yourchannel"
              />

              <Input
                label="Website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />

              {/* Page Visibility */}
              <div className={styles.visibilitySection}>
                <div className={styles.visibilityLabel}>
                  <span className={styles.visibilityTitle}>Page is public</span>
                  <span className={styles.visibilityDescription}>
                    Anyone with the link can support you
                  </span>
                </div>
                <div 
                  className={`${styles.toggle} ${isPublic ? styles.active : ''}`}
                  onClick={() => setIsPublic(!isPublic)}
                >
                  <div className={styles.toggleHandle} />
                </div>
              </div>

              <Button onClick={handleSave} className={styles.saveButton}>
                Save changes
              </Button>

              <Link to={`/${user?.username || 'creator'}`} target="_blank">
                <Button variant="outline" fullWidth>
                  <ExternalLink size={18} />
                  View public page
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={styles.previewSection}>
          <div className={styles.previewLabel}>
            <Eye size={16} />
            Live Preview
          </div>

          <div className={styles.previewCard}>
            {/* Header */}
            <div className={styles.previewHeader}>
              <div className={styles.previewAvatar}>
                {getInitials(formData.name || user?.name || 'User')}
              </div>
              <h2 className={styles.previewName}>
                {formData.name || user?.name || 'Your Name'}
              </h2>
              {formData.bio && (
                <p className={styles.previewBio}>{formData.bio}</p>
              )}

              {/* Social Links */}
              {activeSocialLinks.length > 0 && (
                <div className={styles.previewSocial}>
                  {activeSocialLinks.map(([platform, url]) => {
                    const Icon = SOCIAL_ICONS[platform];
                    return (
                      <a 
                        key={platform}
                        href={url}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon size={16} />
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Support Section */}
            <div className={styles.previewSupport}>
              <h3 className={styles.previewSupportTitle}>Support my work</h3>
              <p className={styles.previewSupportDescription}>
                If my work brings you value, you can support what I do.
              </p>

              <div className={styles.previewTiers}>
                {supportTiers.map(tier => (
                  <div key={tier.id} className={styles.previewTier}>
                    <span className={styles.previewTierTitle}>{tier.title}</span>
                    <span className={styles.previewTierAmount}>
                      {formatCurrency(tier.amount)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Custom Amount */}
              <div className={styles.previewCustom}>
                <div className={styles.previewCustomTitle}>Or enter a custom amount</div>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className={styles.previewCustomInput}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

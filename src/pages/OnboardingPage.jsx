import { useState } from 'react';
import { IoCamera } from 'react-icons/io5';
import { FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useCompleteOnboarding } from '../hooks/useApi';
import { validateUsername } from '../utils';
import styles from './OnboardingPage.module.css';

export default function OnboardingPage() {
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const [profile, setProfile] = useState({
    fullName: '',
    userName: '',
    accountName: '',
    bio: '',
    category: 'Photography',
    phoneNumber: ''
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    tiktok: '',
    x: '',
    youtube: '',
    whatsapp: ''
  });

  const [supportTiers, setSupportTiers] = useState([
    { id: 1, emoji: '☕', title: 'Small support', amount: '1000', description: '' },
    { id: 2, emoji: '❤️', title: 'Show some love', amount: '3000', description: '' },
    { id: 3, emoji: '🎁', title: 'Big support', amount: '5000', description: '' },
    { id: 4, emoji: '⭐', title: 'Super fan', amount: '10000', description: '' }
  ]);

  const [allowCustomAmount, setAllowCustomAmount] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialChange = (platform, value) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const handleTierChange = (id, field, value) => {
    setSupportTiers(prev => prev.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profile.fullName.trim()) {
      newErrors.fullName = 'Display name is required';
    }

    const usernameValidation = validateUsername(profile.userName);
    if (!usernameValidation.isValid) {
      newErrors.userName = usernameValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 1 && !validateForm()) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit onboarding
      completeOnboarding(profile, {
        onError: (error) => {
          const errorMessage = error.response?.data?.message || 'Failed to complete onboarding. Please try again.';
          setErrors({ submit: errorMessage });
        }
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepImage = () => {
    if (currentStep === 1) return '/woman.jpg';
    if (currentStep === 2) return '/secondStep.jpg';
    if (currentStep === 3) return '/ringLight.jpg';
    if (currentStep === 4) return '/male.jpg';
    return '/woman.jpg'; // Default for other steps
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Image */}
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="KOPA" className={styles.logo} />
          <span className={styles.logoText}>KOPA</span>
        </div>
        <img src={getStepImage()} alt="Set up profile" className={styles.heroImage} />
      </div>

      {/* Right Side - Form */}
      <div className={styles.rightSide}>
        <div className={styles.formCard}>
          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            <div className={`${styles.progressStep} ${currentStep === 1 ? styles.active : currentStep > 1 ? styles.completed : ''}`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <div className={styles.progressLine}></div>
            <div className={`${styles.progressStep} ${currentStep === 2 ? styles.active : currentStep > 2 ? styles.completed : ''}`}>
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <div className={styles.progressLine}></div>
            <div className={`${styles.progressStep} ${currentStep === 3 ? styles.active : currentStep > 3 ? styles.completed : ''}`}>
              {currentStep > 3 ? '✓' : '3'}
            </div>
            <div className={styles.progressLine}></div>
            <div className={`${styles.progressStep} ${currentStep === 4 ? styles.active : ''}`}>4</div>
          </div>

          {/* Step 1: Profile Setup */}
          {currentStep === 1 && (
            <>
              {/* Form Header */}
              <div className={styles.formHeader}>
                <h1 className={styles.title}>Set up your profile</h1>
                <p className={styles.subtitle}>This is what your supporters will see.</p>
              </div>

              {/* Form */}
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                {/* Photo Upload */}
                <div className={styles.photoUpload}>
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className={styles.photoInput}
                  />
                  <label htmlFor="photo-upload" className={styles.photoLabel}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className={styles.photoPreview} />
                    ) : (
                      <div className={styles.photoPlaceholder}>
                        <IoCamera size={20} color="#6B7280" />
                      </div>
                    )}
                  </label>
                  <label htmlFor="photo-upload" className={styles.uploadText}>
                    Upload photo
                  </label>
                </div>

                {/* Display Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName" className={styles.label}>Display name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={profile.fullName}
                    onChange={handleChange}
                    placeholder="Chris The Photographer"
                    className={styles.input}
                    disabled={isPending}
                    required
                  />
                  {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
                </div>

                {/* Username */}
                <div className={styles.inputGroup}>
                  <label htmlFor="userName" className={styles.label}>Username</label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={profile.userName}
                    onChange={handleChange}
                    placeholder="christobel"
                    className={styles.input}
                    disabled={isPending}
                    required
                  />
                  {errors.userName && <span className={styles.error}>{errors.userName}</span>}
                </div>

                {/* Account Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="accountName" className={styles.label}>Account Name</label>
                  <input
                    id="accountName"
                    name="accountName"
                    type="text"
                    value={profile.accountName}
                    onChange={handleChange}
                    placeholder="Chris's Store"
                    className={styles.input}
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Bio */}
                <div className={styles.inputGroup}>
                  <label htmlFor="bio" className={styles.label}>Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Tell supporters what you create"
                    className={styles.textarea}
                    disabled={isPending}
                    rows={3}
                  />
                </div>

                {/* Phone Number */}
                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    placeholder="+2348012345678"
                    className={styles.input}
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Category */}
                <div className={styles.inputGroup}>
                  <label htmlFor="category" className={styles.label}>Category</label>
                  <select
                    id="category"
                    name="category"
                    value={profile.category}
                    onChange={handleChange}
                    className={styles.select}
                    disabled={isPending}
                  >
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Writing">Writing</option>
                    <option value="Video">Video</option>
                    <option value="Podcasting">Podcasting</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {errors.submit && (
                  <div className={styles.submitError}>{errors.submit}</div>
                )}

                {/* Continue Button */}
                <button type="submit" className={styles.continueButton} disabled={isPending}>
                  {isPending ? 'Saving...' : 'Continue →'}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Connect Platforms */}
          {currentStep === 2 && (
            <>
              {/* Form Header */}
              <div className={styles.formHeader}>
                <h1 className={styles.title}>Connect your platforms</h1>
                <p className={styles.subtitle}>So supporters can find you anywhere.</p>
              </div>

              {/* Form */}
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                {/* Instagram */}
                <div className={styles.inputGroup}>
                  <label htmlFor="instagram" className={styles.label}>Instagram</label>
                  <div className={styles.inputWithIcon}>
                    <FaInstagram className={styles.inputIcon} />
                    <input
                      id="instagram"
                      type="text"
                      value={socialLinks.instagram}
                      onChange={(e) => handleSocialChange('instagram', e.target.value)}
                      placeholder="@handle"
                      className={styles.inputWithIconField}
                    />
                  </div>
                </div>

                {/* TikTok */}
                <div className={styles.inputGroup}>
                  <label htmlFor="tiktok" className={styles.label}>TikTok</label>
                  <div className={styles.inputWithIcon}>
                    <FaTiktok className={styles.inputIcon} />
                    <input
                      id="tiktok"
                      type="text"
                      value={socialLinks.tiktok}
                      onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                      placeholder="@handle"
                      className={styles.inputWithIconField}
                    />
                  </div>
                </div>

                {/* X (Twitter) */}
                <div className={styles.inputGroup}>
                  <label htmlFor="x" className={styles.label}>X</label>
                  <div className={styles.inputWithIcon}>
                    <FaXTwitter className={styles.inputIcon} />
                    <input
                      id="x"
                      type="text"
                      value={socialLinks.x}
                      onChange={(e) => handleSocialChange('x', e.target.value)}
                      placeholder="@handle"
                      className={styles.inputWithIconField}
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className={styles.inputGroup}>
                  <label htmlFor="youtube" className={styles.label}>YouTube</label>
                  <div className={styles.inputWithIcon}>
                    <FaYoutube className={styles.inputIcon} />
                    <input
                      id="youtube"
                      type="text"
                      value={socialLinks.youtube}
                      onChange={(e) => handleSocialChange('youtube', e.target.value)}
                      placeholder="@handle"
                      className={styles.inputWithIconField}
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className={styles.inputGroup}>
                  <label htmlFor="whatsapp" className={styles.label}>WhatsApp</label>
                  <div className={styles.inputWithIcon}>
                    <FaWhatsapp className={styles.inputIcon} />
                    <input
                      id="whatsapp"
                      type="text"
                      value={socialLinks.whatsapp}
                      onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                      placeholder="+234"
                      className={styles.inputWithIconField}
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className={styles.navigationButtons}>
                  <button type="button" onClick={handleBack} className={styles.backButton}>
                    ← Back
                  </button>
                  <button type="submit" className={styles.continueButton}>
                    Continue →
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 3: Set Support Levels */}
          {currentStep === 3 && (
            <>
              {/* Form Header */}
              <div className={styles.formHeader}>
                <h1 className={styles.title}>Set your support levels</h1>
                <p className={styles.subtitle}>What preset amounts that make it easy for your audience to support you.</p>
              </div>

              {/* Form */}
              <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                {/* Support Tiers */}
                <div className={styles.tiersList}>
                  {supportTiers.map((tier) => (
                    <div key={tier.id} className={styles.tierItem}>
                      <div className={styles.tierEmoji}>{tier.emoji}</div>
                      <div className={styles.tierInfo}>
                        <input
                          type="text"
                          value={tier.title}
                          onChange={(e) => handleTierChange(tier.id, 'title', e.target.value)}
                          placeholder="Support name"
                          className={styles.tierTitle}
                        />
                        <input
                          type="number"
                          value={tier.amount}
                          onChange={(e) => handleTierChange(tier.id, 'amount', e.target.value)}
                          placeholder="Amount"
                          className={styles.tierAmount}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount Toggle */}
                <div className={styles.toggleOption}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Allow custom amounts</span>
                    <span className={styles.toggleDescription}>Let supporters enter their own amount</span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={allowCustomAmount}
                      onChange={(e) => setAllowCustomAmount(e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                {/* Live Preview */}
                <div className={styles.livePreviewSection}>
                  <div className={styles.previewLabel}>LIVE PREVIEW</div>
                  
                  <div className={styles.previewCard}>
                    <div className={styles.previewHeader}>
                      <div className={styles.previewAvatar}>
                        <span>C</span>
                      </div>
                      <div className={styles.previewInfo}>
                        <h3 className={styles.previewName}>Support Chris The Photographer</h3>
                        <p className={styles.previewDescription}>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                          Iste est atque, quis maxime mollis ita Quo
                        </p>
                      </div>
                    </div>

                    <div className={styles.previewTiers}>
                      {supportTiers.map((tier) => (
                        <div key={tier.id} className={styles.previewTier}>
                          <div className={styles.previewTierLeft}>
                            <span className={styles.previewTierEmoji}>{tier.emoji}</span>
                            <span className={styles.previewTierTitle}>{tier.title}</span>
                          </div>
                          <span className={styles.previewTierAmount}>₦{parseInt(tier.amount).toLocaleString()}</span>
                        </div>
                      ))}
                      
                      {allowCustomAmount && (
                        <div className={`${styles.previewTier} ${styles.customAmountTier}`}>
                          <div className={styles.previewTierLeft}>
                            <span className={styles.previewTierEmoji}>✏️</span>
                            <span className={styles.previewTierTitle}>Custom amount</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button className={styles.previewSupportButton}>
                      Support Chris The Photographer
                    </button>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className={styles.navigationButtons}>
                  <button type="button" onClick={handleBack} className={styles.backButton}>
                    ← Back
                  </button>
                  <button type="submit" className={styles.continueButton}>
                    Continue →
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 4: You're All Set */}
          {currentStep === 4 && (
            <>
              <div className={styles.completionSection}>
                <div className={styles.completionIcon}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="#EEF2FF"/>
                    <path d="M25 40L35 50L55 30" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h1 className={styles.completionTitle}>You're all set! 🎉</h1>
                <p className={styles.completionDescription}>
                  Your KOPA page is ready and live. Share your link to start receiving support from your audience.
                </p>

                <div className={styles.completionButtons}>
                  <button 
                    onClick={() => completeOnboarding(profile, {
                      onError: (error) => {
                        const errorMessage = error.response?.data?.message || 'Failed to complete onboarding. Please try again.';
                        alert(errorMessage);
                      }
                    })} 
                    className={styles.goToDashboardButton}
                    disabled={isPending}
                  >
                    {isPending ? 'Saving...' : 'Go to dashboard'}
                  </button>
                  <button 
                    onClick={() => {
                      const link = `kopa.africa/@${profile.userName || 'yourname'}`;
                      navigator.clipboard.writeText(link);
                      alert('Link copied to clipboard!');
                    }} 
                    className={styles.sharePageButton}
                    disabled={isPending}
                  >
                    Share my page
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

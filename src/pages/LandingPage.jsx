import { Link } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import { HiLink } from 'react-icons/hi2';
import { BsEmojiSmile } from 'react-icons/bs';
import { IoBarChartSharp } from 'react-icons/io5';
import { FiLink } from 'react-icons/fi';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineLocalAtm } from 'react-icons/md';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaInstagram, FaWhatsapp, FaTiktok, FaYoutube } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui';
import { formatCurrency, formatNumber } from '../utils';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Header/Navigation */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="KOPA" className={styles.logoImage} />
            <span className={styles.logoText}>KOPA</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#how-it-works" className={styles.navLink}>How it works</a>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#analytics" className={styles.navLink}>Analytics</a>
            <a href="#pricing" className={styles.navLink}>Pricing</a>
          </div>
          <div className={styles.navActions}>
            <Link to="/login">
              <button className={styles.signInButton}>Sign in</button>
            </Link>
            <Link to="/signup">
              <button className={styles.getStartedButton}>Get started</button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✨</span>
            Built for African creators
          </div>
          <h1 className={styles.heroTitle}>
            Turn your audience into <span className={styles.highlight}>income.</span>
          </h1>
          <p className={styles.heroDescription}>
            Create one link, share it anywhere, and let your audience support what you make.
          </p>
          <div className={styles.heroActions}>
            <Link to="/signup">
              <button className={styles.primaryButton}>Get Started</button>
            </Link>
            <button className={styles.secondaryButton}>See How it Works</button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImageContainer}>
            <img src="/hero-img.png" alt="Creator dashboard" className={styles.heroImage} />
            
            {/* Support Card Overlay */}
            <div className={styles.supportCard}>
              <div className={styles.supportCardHeader}>
                <div className={styles.creatorAvatar}>
                  <img src="/logo.png" alt="Chris" />
                </div>
                <div className={styles.creatorInfo}>
                  <div className={styles.creatorName}>
                    Chris The Photographer
                    <span className={styles.verifiedBadge}>✓</span>
                  </div>
                  <div className={styles.creatorHandle}>@christobel</div>
                </div>
              </div>
              
              <div className={styles.supportOptions}>
                <div className={styles.supportOption}>
                  <div className={styles.optionIcon}>☕</div>
                  <div className={styles.optionAmount}>₦1,000</div>
                  <div className={styles.optionLabel}>Small support</div>
                </div>
                <div className={styles.supportOption}>
                  <div className={styles.optionIcon}>❤️</div>
                  <div className={styles.optionAmount}>₦5,000</div>
                  <div className={styles.optionLabel}>Show love</div>
                </div>
              </div>
              
              <button className={styles.supportButton}>
                Support Chris ❤️
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              Four steps from sign-up to your first support.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepIconWrapper}>
                <IoAdd className={styles.stepIcon} />
              </div>
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>Create your page</h3>
              <p className={styles.stepDescription}>
                Sign up your creator account in minutes. Add your photo, bio, and support amounts.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepIconWrapper}>
                <HiLink className={styles.stepIcon} />
              </div>
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>Share your link</h3>
              <p className={styles.stepDescription}>
                Different personalized link for each platforms; Instagram, TikTok, WhatsApp, X, etc.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepIconWrapper}>
                <BsEmojiSmile className={styles.stepIcon} />
              </div>
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>Receive support</h3>
              <p className={styles.stepDescription}>
                Supporters pay in seconds. No account needed. Local payment options.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepIconWrapper}>
                <IoBarChartSharp className={styles.stepIcon} />
              </div>
              <div className={styles.stepNumber}>04</div>
              <h3 className={styles.stepTitle}>Track your income</h3>
              <p className={styles.stepDescription}>
                See exactly where your money comes from and what drives it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why KOPA Section */}
      <section className={styles.whyKopa}>
        <div className={styles.sectionContainer}>
          <div className={styles.whyKopaHeader}>
            <h2 className={styles.whyKopaTitle}>Why KOPA</h2>
            <p className={styles.whyKopaSubtitle}>
              Everything you need to turn attention into support.
            </p>
          </div>

          <div className={styles.whyKopaGrid}>
            <div className={styles.whyKopaCard}>
              <div className={styles.whyKopaIcon}>
                <FiLink size={24} />
              </div>
              <h3 className={styles.whyKopaCardTitle}>Personalised link</h3>
              <p className={styles.whyKopaCardDescription}>
                Special links for each platform. Share it on your bio, stories, or DMs.
              </p>
            </div>

            <div className={styles.whyKopaCard}>
              <div className={styles.whyKopaIcon}>
                <IoWalletOutline size={24} />
              </div>
              <h3 className={styles.whyKopaCardTitle}>Flexible support amounts</h3>
              <p className={styles.whyKopaCardDescription}>
                Let supporters choose a tier or set a custom amount that feels right.
              </p>
            </div>

            <div className={styles.whyKopaCard}>
              <div className={styles.whyKopaIcon}>
                <MdOutlineLocalAtm size={24} />
              </div>
              <h3 className={styles.whyKopaCardTitle}>Local payment options</h3>
              <p className={styles.whyKopaCardDescription}>
                Payments that works for your audience; card, transfer, and mobile money. 🇳🇬
              </p>
            </div>

            <div className={styles.whyKopaCard}>
              <div className={styles.whyKopaIcon}>
                <HiOutlineChartBar size={24} />
              </div>
              <h3 className={styles.whyKopaCardTitle}>Audience insights</h3>
              <p className={styles.whyKopaCardDescription}>
                Know which platform converts best and double down on what works.
              </p>
            </div>
          </div>

          <div className={styles.platformBadges}>
            <div className={styles.platformBadge}>
              <FaInstagram size={16} style={{ color: '#E4405F' }} />
              <span>Instagram</span>
            </div>
            <div className={styles.platformBadge}>
              <FaWhatsapp size={16} style={{ color: '#25D366' }} />
              <span>WhatsApp</span>
            </div>
            <div className={styles.platformBadge}>
              <FaTiktok size={16} style={{ color: '#000000' }} />
              <span>TikTok</span>
            </div>
            <div className={styles.platformBadge}>
              <FaYoutube size={16} style={{ color: '#FF0000' }} />
              <span>YouTube</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className={styles.analyticsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.analyticsLayout}>
            {/* Left Content */}
            <div className={styles.analyticsContent}>
              <div className={styles.analyticsLabel}>Analytics</div>
              <h2 className={styles.analyticsTitle}>
                Know what actually drives your income
              </h2>
              <p className={styles.analyticsDescription}>
                KOPA tracks every visit, click, and payment so you can see which platforms convert and where to focus your energy.
              </p>

              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Total earned</div>
                  <div className={styles.statValue}>₦245,000</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Supporters</div>
                  <div className={styles.statValue}>124</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Conversion rate</div>
                  <div className={styles.statValue}>4.8%</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Top platform</div>
                  <div className={styles.statValue}>Instagram</div>
                </div>
              </div>
            </div>

            {/* Right Content - Revenue Chart */}
            <div className={styles.revenueCard}>
              <h3 className={styles.revenueTitle}>Revenue by platform</h3>
              <div className={styles.platformList}>
                <div className={styles.platformItem}>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>Instagram</span>
                    <span className={styles.platformAmount}>₦85,000</span>
                  </div>
                  <div className={styles.platformBar}>
                    <div className={styles.platformBarFill} style={{width: '65%', backgroundColor: '#E11D48'}}></div>
                  </div>
                </div>

                <div className={styles.platformItem}>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>WhatsApp</span>
                    <span className={styles.platformAmount}>₦62,000</span>
                  </div>
                  <div className={styles.platformBar}>
                    <div className={styles.platformBarFill} style={{width: '47%', backgroundColor: '#10B981'}}></div>
                  </div>
                </div>

                <div className={styles.platformItem}>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>TikTok</span>
                    <span className={styles.platformAmount}>₦43,000</span>
                  </div>
                  <div className={styles.platformBar}>
                    <div className={styles.platformBarFill} style={{width: '33%', backgroundColor: '#06B6D4'}}></div>
                  </div>
                </div>

                <div className={styles.platformItem}>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>X (formerly Twitter)</span>
                    <span className={styles.platformAmount}>₦34,000</span>
                  </div>
                  <div className={styles.platformBar}>
                    <div className={styles.platformBarFill} style={{width: '26%', backgroundColor: '#8B5CF6'}}></div>
                  </div>
                </div>

                <div className={styles.platformItem}>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>YouTube</span>
                    <span className={styles.platformAmount}>₦21,000</span>
                  </div>
                  <div className={styles.platformBar}>
                    <div className={styles.platformBarFill} style={{width: '16%', backgroundColor: '#EF4444'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaHeading}>
              Your audience already supports your work. Make it easier for them to support you financially.
            </h2>
            <Link to="/signup">
              <button className={styles.ctaJoinButton}>
                Join KOPA
                <ArrowRight size={20} />
              </button>
            </Link>
            <p className={styles.ctaSubtext}>
              Free to start. No monthly fees. Set up in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogo}>
              <img src="/logo.png" alt="KOPA" className={styles.footerLogoImage} />
              <span className={styles.footerLogoText}>KOPA</span>
            </div>
            <p className={styles.footerTagline}>
              Turn your audience into income. One link, one payment flow, one dashboard built for creators.
            </p>
            <p className={styles.footerCopyright}>
              © 2025 KOPA. All rights reserved.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Product</h4>
              <a href="#how-it-works" className={styles.footerLink}>How it works</a>
              <a href="#features" className={styles.footerLink}>Features</a>
              <a href="#analytics" className={styles.footerLink}>Analytics</a>
              <a href="#pricing" className={styles.footerLink}>Pricing</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>For Creators</h4>
              <Link to="/signup" className={styles.footerLink}>Create your KOPA account</Link>
              <a href="#" className={styles.footerLink}>Creator Resources</a>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Company</h4>
              <a href="#" className={styles.footerLink}>Privacy</a>
              <a href="#" className={styles.footerLink}>Terms</a>
              <a href="#" className={styles.footerLink}>Policy</a>
            </div>
          </div>

          <div className={styles.footerRight}>
            <p className={styles.footerMadeFor}>Made for creators across Africa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

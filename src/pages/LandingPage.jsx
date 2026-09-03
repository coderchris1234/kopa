import { Link } from 'react-router-dom';
import { ArrowRight, Link as LinkIcon, TrendingUp, BarChart3, Check } from 'lucide-react';
import { Button } from '../components/ui';
import { formatCurrency, formatNumber } from '../utils';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Header/Navigation */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>KOPA</div>
          <div className={styles.navActions}>
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Start earning</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Turn your audience into income.
          </h1>
          <p className={styles.heroDescription}>
            KOPA gives creators one simple link their audience can use to support their work, while providing the insights needed to understand where that support comes from.
          </p>
          <div className={styles.heroActions}>
            <Link to="/signup">
              <Button size="lg">
                Start earning
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              See how it works
            </Button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          {/* Creator Page Mockup */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupAvatar}>CN</div>
              <div>
                <div className={styles.mockupName}>Christobel Nwachukwu</div>
                <div className={styles.mockupUsername}>kopa.africa/christobel</div>
              </div>
            </div>
            <div className={styles.mockupTiers}>
              <div className={styles.mockupTier}>
                <span>Buy me a coffee</span>
                <span className={styles.mockupTierAmount}>₦500</span>
              </div>
              <div className={styles.mockupTier}>
                <span>Support my work</span>
                <span className={styles.mockupTierAmount}>₦2,000</span>
              </div>
              <div className={styles.mockupTier}>
                <span>Super Supporter</span>
                <span className={styles.mockupTierAmount}>₦5,000</span>
              </div>
            </div>
          </div>

          {/* Analytics Preview */}
          <div className={styles.analyticsPreview}>
            <div className={styles.analyticsHeader}>This month</div>
            <div className={styles.analyticsValue}>{formatCurrency(384000)}</div>
            <div className={styles.analyticsMetrics}>
              <div className={styles.analyticsMetric}>
                <span className={styles.metricValue}>{formatNumber(4820)}</span>
                <span className={styles.metricLabel}>Visits</span>
              </div>
              <div className={styles.analyticsMetric}>
                <span className={styles.metricValue}>386</span>
                <span className={styles.metricLabel}>Clicks</span>
              </div>
              <div className={styles.analyticsMetric}>
                <span className={styles.metricValue}>74</span>
                <span className={styles.metricLabel}>Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How it works</h2>
            <p className={styles.sectionDescription}>
              Start receiving support from your audience in three simple steps
            </p>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>Create your KOPA page</h3>
              <p className={styles.stepDescription}>
                Set up your profile and personalize your support options.
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>Share your link</h3>
              <p className={styles.stepDescription}>
                Add your KOPA link to your social media profiles and content.
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>Get supported</h3>
              <p className={styles.stepDescription}>
                Your audience can support your work while you track your earnings and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionContainer}>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <LinkIcon size={32} />
              </div>
              <h3 className={styles.featureTitle}>One link</h3>
              <p className={styles.featureDescription}>
                Share one personalized link everywhere your audience follows you.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <TrendingUp size={32} />
              </div>
              <h3 className={styles.featureTitle}>Direct support</h3>
              <p className={styles.featureDescription}>
                Allow your audience to financially support your work without unnecessary friction.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <BarChart3 size={32} />
              </div>
              <h3 className={styles.featureTitle}>Know what works</h3>
              <p className={styles.featureDescription}>
                Understand where your supporters come from and how your audience converts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className={styles.analyticsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.analyticsContent}>
            <div className={styles.analyticsText}>
              <h2 className={styles.analyticsTitle}>
                Understand your audience
              </h2>
              <p className={styles.analyticsDescription}>
                KOPA gives you meaningful insights about how your audience converts into income.
              </p>
              <ul className={styles.analyticsList}>
                <li className={styles.analyticsListItem}>
                  <Check size={20} className={styles.checkIcon} />
                  Track earnings across all platforms
                </li>
                <li className={styles.analyticsListItem}>
                  <Check size={20} className={styles.checkIcon} />
                  See which platforms drive the most support
                </li>
                <li className={styles.analyticsListItem}>
                  <Check size={20} className={styles.checkIcon} />
                  Monitor conversion rates in real-time
                </li>
                <li className={styles.analyticsListItem}>
                  <Check size={20} className={styles.checkIcon} />
                  Identify your highest-value supporters
                </li>
              </ul>
            </div>

            <div className={styles.analyticsDemo}>
              <div className={styles.statGrid}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Total Earnings
                  </div>
                  <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                    {formatCurrency(384000)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Conversion Rate
                  </div>
                  <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
                    1.53%
                  </div>
                </div>
              </div>

              <div className={styles.trafficSources}>
                <div className={styles.trafficSource}>
                  <span className={styles.sourceName}>Instagram</span>
                  <span className={styles.sourcePercentage}>48%</span>
                </div>
                <div className={styles.trafficSource}>
                  <span className={styles.sourceName}>TikTok</span>
                  <span className={styles.sourcePercentage}>27%</span>
                </div>
                <div className={styles.trafficSource}>
                  <span className={styles.sourceName}>WhatsApp</span>
                  <span className={styles.sourcePercentage}>15%</span>
                </div>
                <div className={styles.trafficSource}>
                  <span className={styles.sourceName}>X</span>
                  <span className={styles.sourcePercentage}>10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Your audience already values your work. Give them a way to support it.
          </h2>
          <Link to="/signup">
            <Button size="lg" className={styles.ctaButton}>
              Create your KOPA link
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>KOPA</div>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>About</a>
            <a href="#" className={styles.footerLink}>Help</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

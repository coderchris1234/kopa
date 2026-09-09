import { useState } from 'react';
import { TrendingUp, TrendingDown, Award, Lightbulb, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardContent, Select, Badge } from '../../components/ui';
import { formatNumber, formatPercentage, formatCurrency } from '../../utils';
import { conversionFunnel, trafficSources } from '../../data';
import styles from './AnalyticsPage.module.css';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30');

  // Find the top performing source
  const topSource = trafficSources.reduce((prev, current) => 
    current.revenue > prev.revenue ? current : prev
  );

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>
          Understand how your audience becomes income
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          options={[
            { value: '7', label: 'Last 7 days' },
            { value: '30', label: 'Last 30 days' },
            { value: '90', label: 'Last 3 months' },
            { value: '365', label: 'Last 12 months' }
          ]}
        />
      </div>

      {/* Conversion Funnel */}
      <Card className={styles.funnelCard}>
        <CardHeader
          title="Conversion Funnel"
          description="Track how visitors become supporters"
        />
        <CardContent>
          <div className={styles.funnel}>
            {conversionFunnel.stages.map((stage, index) => (
              <div key={stage.stage} className={styles.funnelStage}>
                <div className={styles.stageNumber}>{index + 1}</div>
                <div className={styles.stageInfo}>
                  <div className={styles.stageName}>{stage.stage}</div>
                  <div className={styles.stageCount}>
                    {formatNumber(stage.count)}
                  </div>
                  {index > 0 && (
                    <div className={styles.stagePercentage}>
                      {formatPercentage(stage.percentage)} of previous stage
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.conversionRate}>
            <div className={styles.conversionRateLabel}>
              Overall Conversion Rate
            </div>
            <div className={styles.conversionRateValue}>
              {formatPercentage(conversionFunnel.conversionRate)}
            </div>
            <div className={styles.conversionRateDescription}>
              {conversionFunnel.successfulPayments} payments from {formatNumber(conversionFunnel.pageVisits)} visitors
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card>
        <CardHeader
          title="Traffic Sources"
          description="Where your supporters come from"
        />
        <CardContent>
          <div className={styles.sourcesGrid}>
            {trafficSources.map((source) => (
              <div 
                key={source.id} 
                className={`${styles.sourceCard} ${source.id === topSource.id ? styles.topSource : ''}`}
              >
                <div className={styles.sourceHeader}>
                  <div className={styles.sourceName}>{source.source}</div>
                  <div className={styles.sourcePercentage}>{source.percentage}%</div>
                </div>

                <div className={styles.sourceMetrics}>
                  <div className={styles.sourceMetric}>
                    <span className={styles.metricValue}>
                      {formatNumber(source.visitors)}
                    </span>
                    <span className={styles.metricLabel}>Visitors</span>
                  </div>
                  <div className={styles.sourceMetric}>
                    <span className={styles.metricValue}>
                      {source.supporters}
                    </span>
                    <span className={styles.metricLabel}>Supporters</span>
                  </div>
                  <div className={styles.sourceMetric}>
                    <span className={styles.metricValue}>
                      {formatCurrency(source.revenue)}
                    </span>
                    <span className={styles.metricLabel}>Revenue</span>
                  </div>
                </div>

                <div className={`${styles.sourceGrowth} ${
                  source.growth >= 0 ? styles.positive : styles.negative
                }`}>
                  {source.growth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {Math.abs(source.growth)}% vs last period
                </div>

                {source.id === topSource.id && (
                  <div className={styles.topSourceBadge}>
                    <Award size={14} />
                    Top performing platform
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className={styles.insights}>
        <div className={styles.insightsTitle}>
          <Lightbulb size={20} style={{ display: 'inline', marginRight: 'var(--space-2)' }} />
          Key Insights
        </div>
        <div className={styles.insightsList}>
          <div className={styles.insightItem}>
            <div className={styles.insightIcon}>
              <Award size={20} />
            </div>
            <div className={styles.insightContent}>
              <p className={styles.insightText}>
                <strong>{topSource.source}</strong> is your highest-converting platform with {topSource.supporters} supporters 
                generating {formatCurrency(topSource.revenue)} in revenue.
              </p>
            </div>
          </div>

          <div className={styles.insightItem}>
            <div className={styles.insightIcon}>
              <TrendingUp size={20} />
            </div>
            <div className={styles.insightContent}>
              <p className={styles.insightText}>
                Your conversion rate is <strong>{formatPercentage(conversionFunnel.conversionRate)}</strong>. 
                This means {conversionFunnel.successfulPayments} out of every {formatNumber(conversionFunnel.pageVisits)} 
                visitors complete a payment.
              </p>
            </div>
          </div>

          {trafficSources.filter(s => s.growth > 10).length > 0 && (
            <div className={styles.insightItem}>
              <div className={styles.insightIcon}>
                <TrendingUp size={20} />
              </div>
              <div className={styles.insightContent}>
                <p className={styles.insightText}>
                  Strong growth on{' '}
                  {trafficSources
                    .filter(s => s.growth > 10)
                    .map(s => <strong key={s.id}>{s.source}</strong>)
                    .reduce((prev, curr, i, arr) => {
                      if (i === 0) return [curr];
                      if (i === arr.length - 1) return [...prev, ' and ', curr];
                      return [...prev, ', ', curr];
                    }, [])}
                  . Consider focusing more content on these platforms.
                </p>
              </div>
            </div>
          )}

          <div className={styles.insightItem}>
            <div className={styles.insightIcon}>
              <Lightbulb size={20} />
            </div>
            <div className={styles.insightContent}>
              <p className={styles.insightText}>
                <strong>{conversionFunnel.supportButtonClicks}</strong> people clicked the support button but 
                only <strong>{conversionFunnel.checkoutStarted}</strong> started checkout. 
                Consider simplifying your support options to improve this step.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

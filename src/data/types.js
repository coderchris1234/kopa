/**
 * Type definitions for KOPA platform
 * These are JSDoc type definitions that provide TypeScript-like type safety
 */

/**
 * @typedef {Object} Creator
 * @property {string} id - Unique creator ID
 * @property {string} name - Creator's full name
 * @property {string} username - Unique username (used in URLs)
 * @property {string} email - Creator's email address
 * @property {string|null} profileImage - URL to profile image
 * @property {string} bio - Creator biography/description
 * @property {SocialLinks} socialLinks - Social media links
 * @property {SupportTier[]} supportTiers - Available support tiers
 * @property {boolean} allowCustomAmount - Whether custom amounts are allowed
 * @property {boolean} isActive - Account active status
 * @property {string} createdAt - ISO date string of account creation
 * @property {BankAccount} bankAccount - Bank account information
 */

/**
 * @typedef {Object} SocialLinks
 * @property {string|null} instagram - Instagram profile URL
 * @property {string|null} tiktok - TikTok profile URL
 * @property {string|null} x - X (Twitter) profile URL
 * @property {string|null} youtube - YouTube channel URL
 * @property {string|null} facebook - Facebook profile URL
 * @property {string|null} website - Personal website URL
 */

/**
 * @typedef {Object} SupportTier
 * @property {string} id - Unique tier ID
 * @property {string} title - Tier display title
 * @property {number} amount - Amount in Naira
 * @property {string|null} description - Optional tier description
 * @property {boolean} isDefault - Whether this is a default tier
 */

/**
 * @typedef {Object} BankAccount
 * @property {string} accountName - Account holder name
 * @property {string} accountNumber - Bank account number
 * @property {string} bankName - Bank name
 * @property {boolean} isVerified - Verification status
 */

/**
 * @typedef {Object} AnalyticsOverview
 * @property {MonthMetrics} currentMonth - Current month metrics
 * @property {MonthMetrics} previousMonth - Previous month metrics
 */

/**
 * @typedef {Object} MonthMetrics
 * @property {number} earnings - Total earnings
 * @property {number} earningsChange - Percentage change in earnings
 * @property {number} pageVisits - Total page visits
 * @property {number} visitsChange - Percentage change in visits
 * @property {number} supportClicks - Total support button clicks
 * @property {number} clicksChange - Percentage change in clicks
 * @property {number} successfulPayments - Number of successful payments
 * @property {number} paymentsChange - Percentage change in payments
 * @property {number} conversionRate - Conversion rate percentage
 * @property {number} conversionChange - Change in conversion rate
 */

/**
 * @typedef {Object} EarningsDataPoint
 * @property {string} date - Date in YYYY-MM-DD format
 * @property {number} amount - Earnings amount for that date
 */

/**
 * @typedef {Object} TrafficSource
 * @property {string} id - Unique source ID
 * @property {string} source - Source name (Instagram, TikTok, etc.)
 * @property {number} visitors - Total visitors from source
 * @property {number} supportClicks - Support clicks from source
 * @property {number} supporters - Number of supporters from source
 * @property {number} revenue - Revenue generated from source
 * @property {number} percentage - Percentage of total traffic
 * @property {number} growth - Growth percentage
 */

/**
 * @typedef {Object} Supporter
 * @property {string} id - Unique supporter ID
 * @property {string} name - Supporter's name
 * @property {string} email - Supporter's email
 * @property {number} totalAmount - Total amount supported
 * @property {number} contributionsCount - Number of contributions
 * @property {string} firstSupport - ISO date of first support
 * @property {string} lastSupport - ISO date of last support
 * @property {number} averageAmount - Average support amount
 * @property {SupportMessage[]} messages - Messages left by supporter
 */

/**
 * @typedef {Object} SupportMessage
 * @property {string} date - ISO date string
 * @property {string} text - Message text
 */

/**
 * @typedef {Object} RecentSupport
 * @property {string} id - Unique support ID
 * @property {string} name - Supporter name
 * @property {number} amount - Support amount
 * @property {string|null} message - Optional message
 * @property {string} timestamp - ISO timestamp
 * @property {string} source - Traffic source
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id - Unique transaction ID
 * @property {string} supporterName - Name of supporter
 * @property {string} supporterEmail - Email of supporter
 * @property {number} amount - Transaction amount
 * @property {number} platformFee - Platform fee amount
 * @property {number} netAmount - Net amount after fees
 * @property {'successful'|'pending'|'failed'} status - Transaction status
 * @property {string} date - ISO date string
 * @property {string} tier - Support tier name
 * @property {string} source - Traffic source
 * @property {string|null} message - Optional message
 */

/**
 * @typedef {Object} ConversionFunnel
 * @property {number} pageVisits - Total page visits
 * @property {number} supportButtonClicks - Total support button clicks
 * @property {number} checkoutStarted - Checkouts started
 * @property {number} successfulPayments - Successful payments
 * @property {number} conversionRate - Overall conversion rate
 * @property {FunnelStage[]} stages - Funnel stage breakdown
 */

/**
 * @typedef {Object} FunnelStage
 * @property {string} stage - Stage name
 * @property {number} count - Count at this stage
 * @property {number} percentage - Percentage relative to previous stage
 */

/**
 * @typedef {Object} PublicCreator
 * @property {string} username - Creator username
 * @property {string} name - Creator name
 * @property {string|null} profileImage - Profile image URL
 * @property {string} bio - Creator bio
 * @property {SocialLinks} socialLinks - Social media links
 * @property {SupportTier[]} supportTiers - Available support tiers
 * @property {boolean} allowCustomAmount - Whether custom amounts allowed
 */

// Export empty object to make this a module
export {};

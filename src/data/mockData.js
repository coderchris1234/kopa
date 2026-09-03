// Mock data for KOPA platform
// This provides realistic data structures that can be replaced with API calls

/**
 * Current authenticated creator
 */
export const currentCreator = {
  id: '1',
  name: 'Christobel Nwachukwu',
  username: 'christobel',
  email: 'christobel@example.com',
  profileImage: null,
  bio: 'Founder, builder, and creator sharing ideas and building products for Africa.',
  socialLinks: {
    instagram: 'https://instagram.com/christobel',
    tiktok: 'https://tiktok.com/@christobel',
    x: 'https://x.com/christobel',
    youtube: null,
    facebook: null,
    website: null
  },
  supportTiers: [
    {
      id: 't1',
      title: 'Buy me a coffee',
      amount: 500,
      description: null,
      isDefault: true
    },
    {
      id: 't2',
      title: 'Support my work',
      amount: 2000,
      description: null,
      isDefault: true
    },
    {
      id: 't3',
      title: 'Super Supporter',
      amount: 5000,
      description: null,
      isDefault: true
    }
  ],
  allowCustomAmount: true,
  isActive: true,
  createdAt: '2026-01-15T10:00:00Z',
  bankAccount: {
    accountName: 'Christobel Nwachukwu',
    accountNumber: '0123456789',
    bankName: 'GTBank',
    isVerified: true
  }
};

/**
 * Analytics overview data
 */
export const analyticsOverview = {
  currentMonth: {
    earnings: 384000,
    earningsChange: 18.4,
    pageVisits: 4820,
    visitsChange: 12.3,
    supportClicks: 386,
    clicksChange: 8.7,
    successfulPayments: 74,
    paymentsChange: 15.2,
    conversionRate: 1.53,
    conversionChange: 0.3
  },
  previousMonth: {
    earnings: 325000,
    pageVisits: 4290,
    supportClicks: 355,
    successfulPayments: 64,
    conversionRate: 1.49
  }
};

/**
 * Earnings chart data (last 30 days)
 */
export const earningsChartData = [
  { date: '2026-08-04', amount: 8500 },
  { date: '2026-08-05', amount: 12000 },
  { date: '2026-08-06', amount: 15500 },
  { date: '2026-08-07', amount: 9000 },
  { date: '2026-08-08', amount: 11000 },
  { date: '2026-08-09', amount: 14500 },
  { date: '2026-08-10', amount: 13000 },
  { date: '2026-08-11', amount: 16000 },
  { date: '2026-08-12', amount: 10500 },
  { date: '2026-08-13', amount: 12500 },
  { date: '2026-08-14', amount: 18000 },
  { date: '2026-08-15', amount: 14000 },
  { date: '2026-08-16', amount: 11500 },
  { date: '2026-08-17', amount: 13500 },
  { date: '2026-08-18', amount: 17000 },
  { date: '2026-08-19', amount: 12000 },
  { date: '2026-08-20', amount: 15000 },
  { date: '2026-08-21', amount: 19000 },
  { date: '2026-08-22', amount: 13000 },
  { date: '2026-08-23', amount: 14500 },
  { date: '2026-08-24', amount: 16500 },
  { date: '2026-08-25', amount: 12500 },
  { date: '2026-08-26', amount: 11000 },
  { date: '2026-08-27', amount: 14000 },
  { date: '2026-08-28', amount: 17500 },
  { date: '2026-08-29', amount: 13500 },
  { date: '2026-08-30', amount: 15500 },
  { date: '2026-08-31', amount: 18500 },
  { date: '2026-09-01', amount: 14500 },
  { date: '2026-09-02', amount: 16000 }
];

/**
 * Traffic sources data
 */
export const trafficSources = [
  {
    id: 's1',
    source: 'Instagram',
    visitors: 2400,
    supportClicks: 156,
    supporters: 48,
    revenue: 184000,
    percentage: 48,
    growth: 12.5
  },
  {
    id: 's2',
    source: 'TikTok',
    visitors: 1500,
    supportClicks: 98,
    supporters: 15,
    revenue: 104000,
    percentage: 27,
    growth: 8.3
  },
  {
    id: 's3',
    source: 'WhatsApp',
    visitors: 600,
    supportClicks: 78,
    supporters: 8,
    revenue: 64000,
    percentage: 15,
    growth: -2.1
  },
  {
    id: 's4',
    source: 'X',
    visitors: 320,
    supportClicks: 54,
    supporters: 3,
    revenue: 32000,
    percentage: 10,
    growth: 5.7
  }
];

/**
 * Recent supporters list
 */
export const recentSupporters = [
  {
    id: 'sup1',
    name: 'Sarah A.',
    amount: 5000,
    message: 'Love the work you\'re doing!',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    source: 'Instagram'
  },
  {
    id: 'sup2',
    name: 'Daniel O.',
    amount: 2000,
    message: null,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    source: 'TikTok'
  },
  {
    id: 'sup3',
    name: 'Grace M.',
    amount: 10000,
    message: 'Keep creating amazing content!',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    source: 'WhatsApp'
  },
  {
    id: 'sup4',
    name: 'Ade B.',
    amount: 500,
    message: 'Small but sincere support',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'X'
  },
  {
    id: 'sup5',
    name: 'Chioma N.',
    amount: 2000,
    message: null,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'Instagram'
  }
];

/**
 * All supporters with full details
 */
export const allSupporters = [
  {
    id: 'sup_1',
    name: 'Sarah Adeyemi',
    email: 'sarah.a@example.com',
    totalAmount: 18000,
    contributionsCount: 4,
    firstSupport: '2026-03-12T14:30:00Z',
    lastSupport: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    averageAmount: 4500,
    messages: [
      { date: new Date(Date.now() - 2 * 60 * 1000).toISOString(), text: 'Love the work you\'re doing!' },
      { date: '2026-07-15T10:20:00Z', text: 'Keep it up!' }
    ]
  },
  {
    id: 'sup_2',
    name: 'Daniel Okafor',
    email: 'daniel.o@example.com',
    totalAmount: 12000,
    contributionsCount: 6,
    firstSupport: '2026-02-20T09:15:00Z',
    lastSupport: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    averageAmount: 2000,
    messages: []
  },
  {
    id: 'sup_3',
    name: 'Grace Mbah',
    email: 'grace.m@example.com',
    totalAmount: 35000,
    contributionsCount: 5,
    firstSupport: '2026-04-05T16:45:00Z',
    lastSupport: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    averageAmount: 7000,
    messages: [
      { date: new Date(Date.now() - 45 * 60 * 1000).toISOString(), text: 'Keep creating amazing content!' }
    ]
  },
  {
    id: 'sup_4',
    name: 'Ade Balogun',
    email: 'ade.b@example.com',
    totalAmount: 4500,
    contributionsCount: 9,
    firstSupport: '2026-01-30T11:00:00Z',
    lastSupport: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    averageAmount: 500,
    messages: [
      { date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), text: 'Small but sincere support' }
    ]
  },
  {
    id: 'sup_5',
    name: 'Chioma Nwosu',
    email: 'chioma.n@example.com',
    totalAmount: 16000,
    contributionsCount: 8,
    firstSupport: '2026-02-14T13:30:00Z',
    lastSupport: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    averageAmount: 2000,
    messages: []
  },
  {
    id: 'sup_6',
    name: 'Tunde Williams',
    email: 'tunde.w@example.com',
    totalAmount: 25000,
    contributionsCount: 5,
    firstSupport: '2026-03-22T08:15:00Z',
    lastSupport: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    averageAmount: 5000,
    messages: [
      { date: '2026-05-10T15:00:00Z', text: 'Your content is inspiring!' }
    ]
  },
  {
    id: 'sup_7',
    name: 'Amina Hassan',
    email: 'amina.h@example.com',
    totalAmount: 8000,
    contributionsCount: 4,
    firstSupport: '2026-04-18T12:45:00Z',
    lastSupport: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    averageAmount: 2000,
    messages: []
  },
  {
    id: 'sup_8',
    name: 'Emeka Obi',
    email: 'emeka.o@example.com',
    totalAmount: 42000,
    contributionsCount: 7,
    firstSupport: '2026-01-25T10:30:00Z',
    lastSupport: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    averageAmount: 6000,
    messages: [
      { date: '2026-06-20T14:20:00Z', text: 'Really appreciate what you do!' }
    ]
  }
];

/**
 * Transaction history
 */
export const transactions = [
  {
    id: 'txn_001',
    supporterName: 'Sarah Adeyemi',
    supporterEmail: 'sarah.a@example.com',
    amount: 5000,
    platformFee: 150,
    netAmount: 4850,
    status: 'successful',
    date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    tier: 'Super Supporter',
    source: 'Instagram',
    message: 'Love the work you\'re doing!'
  },
  {
    id: 'txn_002',
    supporterName: 'Daniel Okafor',
    supporterEmail: 'daniel.o@example.com',
    amount: 2000,
    platformFee: 60,
    netAmount: 1940,
    status: 'successful',
    date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    tier: 'Support my work',
    source: 'TikTok',
    message: null
  },
  {
    id: 'txn_003',
    supporterName: 'Grace Mbah',
    supporterEmail: 'grace.m@example.com',
    amount: 10000,
    platformFee: 300,
    netAmount: 9700,
    status: 'successful',
    date: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    tier: 'Custom',
    source: 'WhatsApp',
    message: 'Keep creating amazing content!'
  },
  {
    id: 'txn_004',
    supporterName: 'Ade Balogun',
    supporterEmail: 'ade.b@example.com',
    amount: 500,
    platformFee: 15,
    netAmount: 485,
    status: 'successful',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tier: 'Buy me a coffee',
    source: 'X',
    message: 'Small but sincere support'
  },
  {
    id: 'txn_005',
    supporterName: 'Chioma Nwosu',
    supporterEmail: 'chioma.n@example.com',
    amount: 2000,
    platformFee: 60,
    netAmount: 1940,
    status: 'successful',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tier: 'Support my work',
    source: 'Instagram',
    message: null
  },
  {
    id: 'txn_006',
    supporterName: 'Anonymous',
    supporterEmail: 'user@example.com',
    amount: 1500,
    platformFee: 45,
    netAmount: 1455,
    status: 'pending',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tier: 'Custom',
    source: 'Instagram',
    message: null
  },
  {
    id: 'txn_007',
    supporterName: 'Tunde Williams',
    supporterEmail: 'tunde.w@example.com',
    amount: 5000,
    platformFee: 150,
    netAmount: 4850,
    status: 'successful',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    tier: 'Super Supporter',
    source: 'WhatsApp',
    message: null
  },
  {
    id: 'txn_008',
    supporterName: 'Failed Payment',
    supporterEmail: 'test@example.com',
    amount: 2000,
    platformFee: 0,
    netAmount: 0,
    status: 'failed',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tier: 'Support my work',
    source: 'TikTok',
    message: null
  }
];

/**
 * Conversion funnel data
 */
export const conversionFunnel = {
  pageVisits: 4820,
  supportButtonClicks: 386,
  checkoutStarted: 112,
  successfulPayments: 74,
  conversionRate: 1.53,
  stages: [
    { stage: 'Page Visits', count: 4820, percentage: 100 },
    { stage: 'Support Clicks', count: 386, percentage: 8.0 },
    { stage: 'Checkout Started', count: 112, percentage: 29.0 },
    { stage: 'Successful Payments', count: 74, percentage: 66.1 }
  ]
};

/**
 * Sample creator for public page
 */
export const samplePublicCreator = {
  username: 'christobel',
  name: 'Christobel Nwachukwu',
  profileImage: null,
  bio: 'Founder, builder, and creator sharing ideas and building products for Africa.',
  socialLinks: {
    instagram: 'https://instagram.com/christobel',
    tiktok: 'https://tiktok.com/@christobel',
    x: 'https://x.com/christobel'
  },
  supportTiers: [
    { id: 't1', title: 'Buy me a coffee', amount: 500, description: null },
    { id: 't2', title: 'Support my work', amount: 2000, description: null },
    { id: 't3', title: 'Super Supporter', amount: 5000, description: null }
  ],
  allowCustomAmount: true
};

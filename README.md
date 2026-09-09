# KOPA - Creator Monetization Platform

**Turn your audience into income.** KOPA is a premium creator monetization platform built for African creators, enabling them to receive direct support from their audience through a single, beautiful link.

## 🎯 Project Overview

KOPA provides creators with:
- **One Link**: Simple `kopa.africa/username` URL
- **Direct Support**: Supporters can contribute with custom or preset amounts
- **Analytics**: Track visitors, conversions, and revenue
- **Payment Integration**: Support for local payment methods (Paystack/Flutterwave ready)
- **Creator Dashboard**: Comprehensive analytics, supporter management, and settings

## ✨ Features

### For Creators
- 🎨 **Customizable Creator Page** - Personalize your support page with bio and social links
- 💰 **Flexible Support Tiers** - Set custom amounts or let supporters choose
- 📊 **Detailed Analytics** - Conversion funnel, traffic sources, and insights
- 👥 **Supporter Management** - Track supporters, messages, and contributions
- 💳 **Payment Tracking** - Transaction history with status and filtering
- ⚙️ **Settings Control** - Profile, payment details, and notifications

### For Supporters
- ⚡ **Fast Support Flow** - Support in 3 clicks
- 💬 **Leave Messages** - Optional personal messages to creators
- 🔒 **Secure Payments** - SSL encrypted, trusted payment providers
- 🎉 **Celebration Moments** - Beautiful success states
- 📱 **Mobile-First** - Optimized for mobile devices

## 🛠️ Tech Stack

- **React 18** - Modern hooks-based architecture
- **Vite** - Fast build tool with HMR
- **React Router v6** - Client-side routing
- **Module CSS** - Component-scoped styling
- **Lucide React** - Beautiful icon system
- **CSS Variables** - Comprehensive design system

## 📁 Project Structure

```
kopa/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Button, Input, Card, etc.
│   │   ├── layout/      # Layout components
│   │   └── features/    # Feature-specific components
│   ├── pages/           # Page components
│   │   ├── dashboard/   # Creator dashboard pages
│   │   ├── LandingPage.jsx
│   │   ├── PublicCreatorPage.jsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── services/        # API services
│   ├── data/            # Mock data and types
│   └── styles/          # Global styles and design tokens
├── public/              # Static assets
└── docs/                # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern browser (Chrome, Firefox, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kopa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

KOPA uses a comprehensive design system with:

- **Colors**: Brand accent (#FF6B00), grays, semantic colors
- **Typography**: Sans-serif with clear hierarchy
- **Spacing**: 8px base unit, consistent scale
- **Shadows**: Subtle depth for elevation
- **Animations**: Premium microinteractions

See `src/styles/variables.css` for all design tokens.

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: < 640px (primary focus)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with optimized experiences for each screen size.

See `RESPONSIVE_GUIDE.md` for detailed guidelines.

## ♿ Accessibility

KOPA is built with accessibility in mind:
- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast (WCAG AA)
- ✅ Focus indicators
- ✅ Reduced motion support

## 🔗 Routes

### Public Routes
- `/` - Landing page
- `/signup` - Creator signup
- `/login` - Creator login
- `/:username` - Public creator page
- `/checkout` - Support checkout
- `/payment-success` - Payment confirmation

### Protected Routes (Dashboard)
- `/dashboard` - Overview
- `/dashboard/analytics` - Analytics & insights
- `/dashboard/supporters` - Supporter management
- `/dashboard/transactions` - Transaction history
- `/dashboard/page` - Page editor
- `/dashboard/settings` - Account settings

## 🧪 Mock Data

The project includes realistic mock data for development:

```javascript
import { mockPublicCreator, allSupporters, transactions } from './data';
```

Mock data includes:
- Creator profiles
- Supporter information
- Transaction history
- Analytics data
- Conversion funnel

See `src/data/mockData.js` for all available data.

## 🔌 Backend Integration

Ready for backend integration. Expected API endpoints:

### Authentication
- `POST /api/auth/signup` - Create creator account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Creator
- `GET /api/creator/profile` - Get creator profile
- `PUT /api/creator/profile` - Update profile
- `GET /api/creator/analytics` - Get analytics data
- `GET /api/creator/supporters` - Get supporters list
- `GET /api/creator/transactions` - Get transactions

### Public
- `GET /api/public/:username` - Get public creator data
- `POST /api/support/initiate` - Initiate support payment
- `POST /api/support/confirm` - Confirm payment

See `src/services/api.js` for API service structure.

## 💳 Payment Integration

KOPA is ready for payment provider integration:

### Recommended Providers
1. **Paystack** (Primary for Nigeria)
   - Card payments
   - Bank transfers
   - Mobile money

2. **Flutterwave** (Alternative)
   - Multi-currency support
   - Various payment methods

### Integration Points
- `CheckoutPage.jsx` - Payment method selection
- `PaymentSuccessPage.jsx` - Success handling
- `src/services/api.js` - Payment API calls

## 🎯 Key Features Implementation

### Authentication Flow
1. User signs up → `/signup`
2. Completes onboarding → `/onboarding`
3. Lands in dashboard → `/dashboard`

### Support Flow
1. Supporter visits creator page → `/:username`
2. Selects amount and adds message
3. Proceeds to checkout → `/checkout`
4. Completes payment
5. Sees success celebration → `/payment-success`

### Creator Workflow
1. Creator logs in → `/login`
2. Views dashboard overview → `/dashboard`
3. Checks analytics → `/dashboard/analytics`
4. Manages supporters → `/dashboard/supporters`
5. Customizes page → `/dashboard/page`
6. Updates settings → `/dashboard/settings`

## 🎨 Customization

### Branding
Update brand colors in `src/styles/variables.css`:
```css
--brand-accent: #FF6B00;  /* Primary brand color */
--brand-accent-hover: #E66000;
```

### Typography
Change fonts in `src/styles/variables.css`:
```css
--font-sans: 'Inter', system-ui, sans-serif;
```

### Components
All UI components in `src/components/ui/` are customizable via props and CSS modules.

## 📚 Documentation

- `README.md` - This file
- `RESPONSIVE_GUIDE.md` - Responsive design patterns
- `MICROINTERACTIONS_GUIDE.md` - Animation guidelines
- `POLISH_CHECKLIST.md` - Production QA checklist
- `PRODUCTION_READY.md` - Deployment guide

## 🐛 Known Issues & Limitations

### Current Limitations
- Mock data only (no real backend)
- No actual payment processing
- No image upload functionality
- No real-time updates
- No email notifications

### Future Enhancements
- Real-time supporter notifications
- Advanced analytics with custom date ranges
- Multiple currency support
- Recurring support subscriptions
- Mobile app (React Native)
- Dark mode
- Internationalization (i18n)

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

### Code Style
- Use functional components with hooks
- Use Module CSS for styling
- Follow existing naming conventions
- Add comments for complex logic
- Keep components small and focused

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

- Design inspiration: Stripe, Linear, Notion
- Icons: Lucide React
- Built with React and Vite

## 📞 Support

For questions or issues:
- Review documentation in project root
- Check PRODUCTION_READY.md for deployment
- Check RESPONSIVE_GUIDE.md for design patterns

---

**Built with ❤️ for African creators**

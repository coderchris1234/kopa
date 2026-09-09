# KOPA Responsive Design Guide

## Overview
KOPA is built mobile-first with a focus on African audiences who primarily access the platform through mobile devices. This guide documents our responsive design approach and optimizations.

## Breakpoints

```css
/* Mobile */
< 640px - Primary focus, optimized for mobile phones

/* Tablet */
640px - 1024px - Mid-range devices, tablets

/* Desktop */
> 1024px - Large screens, desktop computers
```

## Key Responsive Features

### 1. Mobile-First Typography
- Base font size: 16px (prevents iOS zoom on input focus)
- Fluid heading sizes using `clamp()` for smooth scaling
- Optimized line heights for readability on small screens

### 2. Touch Target Optimization
- Minimum button height: 44px (Apple's recommended size)
- All interactive elements meet WCAG 2.1 Level AAA (44x44px)
- Increased padding on tap targets for better UX

### 3. Form Input Optimization
- 16px minimum font size to prevent zoom on iOS
- Comfortable padding (12px vertical, 16px horizontal)
- Stack labels vertically on mobile
- Numeric keyboard for amount inputs (`inputMode="numeric"`)

### 4. Navigation Patterns
- **Mobile**: Hamburger menu with full-screen overlay
- **Tablet/Desktop**: Fixed sidebar (280px) with navigation
- Sticky positioning for quick access to key actions

### 5. Layout Adaptations

#### Dashboard
- **Mobile**: Single column, stacked cards
- **Tablet**: 2-column grid for stats
- **Desktop**: Multi-column with sidebar navigation

#### Tables
- **Mobile**: Stacked card layout with data labels
- **Desktop**: Traditional table with hover states

#### Modals
- **Mobile**: Full-screen or bottom sheet style
- **Desktop**: Centered with max-width constraint

### 6. Performance Optimizations

#### CSS Optimizations
- Removed heavy shadows on mobile
- Reduced animations for `prefers-reduced-motion`
- Optimized transitions and transforms

#### Image Optimization
- Responsive images with `max-width: 100%`
- Lazy loading for below-fold images
- Optimized image rendering

#### Touch Scrolling
- iOS momentum scrolling (`-webkit-overflow-scrolling: touch`)
- Horizontal scroll containers with snap points
- Hidden scrollbars for cleaner UI

### 7. iOS-Specific Enhancements

#### Safe Area Support
```css
/* Notch and home indicator support */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

#### PWA Features
- Add to home screen support
- Custom splash screen
- Status bar styling
- Standalone display mode

#### Input Behavior
- Prevented auto-zoom on focus (16px font size)
- Disabled phone number detection
- Removed iOS default input styling

### 8. Accessibility

#### Keyboard Navigation
- Visible focus indicators
- Logical tab order
- Skip to main content links

#### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images
- Descriptive button labels

#### Color Contrast
- WCAG AA compliance (4.5:1 for text)
- High contrast mode support
- Color is not the only indicator

## Component-Specific Responsive Behavior

### Landing Page
- Hero section: Full viewport height on mobile, constrained on desktop
- Feature cards: Stack vertically on mobile, grid on tablet/desktop
- CTA buttons: Full width on mobile, inline on desktop

### Auth Pages (Login/Signup)
- Split-screen layout hidden on mobile
- Form takes full width on mobile
- Side panel shows only on tablet/desktop

### Onboarding Flow
- Progress indicator: Horizontal dots on mobile, stepper on desktop
- Steps: Full-screen on mobile, contained on desktop
- Navigation buttons: Full width on mobile, inline on desktop

### Dashboard
- Sidebar: Collapsible hamburger menu on mobile, fixed on desktop
- Stats cards: Single column on mobile, 2-4 columns on desktop
- Charts: Simplified on mobile, full detail on desktop
- Tables: Card layout on mobile, table on desktop

### Public Creator Page
- Avatar: 120px on mobile, 140px on desktop
- Support tiers: Vertical list on mobile, grid on tablet/desktop
- Social links: Horizontal scroll on mobile, wrapped row on desktop

### Checkout Flow
- Payment cards: Full width on mobile, side-by-side on desktop
- Summary section: Stacked on mobile, grid on desktop

### Success Page
- Full-screen celebration on all devices
- Staggered animations for engagement
- Share buttons: Wrapped row on mobile, inline on desktop

## Testing Checklist

### Mobile Devices (iOS/Android)
- [ ] iPhone SE (375px) - Smallest common mobile
- [ ] iPhone 12/13 (390px) - Standard mobile
- [ ] iPhone 14 Pro Max (430px) - Large mobile
- [ ] Samsung Galaxy S21 (360px) - Android standard
- [ ] Tablet (768px) - iPad Mini

### Browsers
- [ ] Safari (iOS)
- [ ] Chrome (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (Android)

### Orientations
- [ ] Portrait (primary)
- [ ] Landscape (secondary)

### Features to Test
- [ ] Touch targets (44px minimum)
- [ ] Form inputs (no zoom on focus)
- [ ] Navigation (hamburger menu works)
- [ ] Modals (full-screen on mobile)
- [ ] Tables (card layout on mobile)
- [ ] Horizontal scrolling
- [ ] Safe area insets (notched devices)
- [ ] Keyboard appearance (numeric for amounts)
- [ ] Back button behavior
- [ ] Pull-to-refresh (disabled where needed)

## Common Responsive Patterns

### 1. Conditional Rendering
```jsx
// Use media query hook
const isMobile = useMediaQuery('(max-width: 640px)');

return isMobile ? <MobileView /> : <DesktopView />;
```

### 2. Responsive Spacing
```css
/* Use responsive padding/margin */
padding: var(--space-4);

@media (min-width: 768px) {
  padding: var(--space-8);
}
```

### 3. Fluid Typography
```css
/* Use clamp for smooth scaling */
font-size: clamp(1.5rem, 4vw, 2.5rem);
```

### 4. Flexible Grids
```css
/* Auto-responsive grid */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: var(--space-4);
```

## Best Practices

### DO ✅
- Test on real devices whenever possible
- Use 16px font size for inputs
- Provide adequate touch targets (44px+)
- Optimize images for mobile bandwidth
- Use CSS containment for performance
- Implement skeleton loading states
- Add haptic feedback for important actions

### DON'T ❌
- Don't rely solely on hover states
- Don't use small font sizes (< 14px for body text)
- Don't create touch targets smaller than 44px
- Don't use horizontal scrolling for main content
- Don't assume high-speed internet
- Don't disable zoom completely
- Don't use complex animations on mobile

## Performance Targets

### Mobile
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Speed Index: < 3.4s
- Lighthouse Score: > 90

### Bundle Size
- Initial JS bundle: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Images: WebP format, lazy loaded

## Future Enhancements

1. **Offline Support**: Service worker for basic offline functionality
2. **Dark Mode**: Respect `prefers-color-scheme` media query
3. **Reduced Motion**: Enhanced support for motion-sensitive users
4. **Haptic Feedback**: Subtle vibrations for key actions (iOS/Android)
5. **Biometric Auth**: Face ID/Touch ID for login
6. **Push Notifications**: Real-time supporter updates

## Resources

- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Guidelines](https://material.io/design)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Mobile Best Practices](https://web.dev/mobile/)

# API Integration Summary

## Overview
Successfully integrated KOPA backend API with React Query for efficient data fetching and state management.

## Base Configuration

**API Base URL:** `https://kopa-39h4.onrender.com`

**Tech Stack:**
- `@tanstack/react-query` - Data fetching and caching
- `@tanstack/react-query-devtools` - Development tools
- `axios` - HTTP client

## API Endpoints Implemented

### 1. Create Account
- **Endpoint:** `POST /create`
- **Request Body:**
  ```json
  {
    "email": "creator@example.com",
    "password": "Password123!",
    "confirm": "Password123!"
  }
  ```
- **Response:** Account created + OTP sent to email
- **Hook:** `useCreateAccount()`
- **Page:** SignupPage
- **On Success:** Navigates to `/verify-email`

### 2. Verify Account
- **Endpoint:** `POST /verify`
- **Request Body:**
  ```json
  {
    "email": "creator@example.com",
    "otp": "123456"
  }
  ```
- **Response:** Login token + user data
- **Hook:** `useVerifyAccount()`
- **Page:** VerifyEmailPage
- **On Success:** 
  - Stores `loginToken` in localStorage
  - Stores user data
  - Navigates to `/onboarding`

### 3. Complete Onboarding
- **Endpoint:** `PATCH /onboarding`
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "userName": "johndoe",
    "accountName": "John's Store",
    "bio": "Content creator and entrepreneur",
    "category": "Fashion",
    "phoneNumber": "+2348012345678"
  }
  ```
- **Response:** Account onboarded successfully
- **Hook:** `useCompleteOnboarding()`
- **Page:** OnboardingPage
- **On Success:** Navigates to `/dashboard`

### 4. Get Dashboard
- **Endpoint:** `GET /dashboard`
- **Response:** Dashboard data (balance, transactions, notifications)
- **Hook:** `useDashboard()`
- **Page:** Dashboard pages

## Authentication Flow

```
1. User signs up → POST /create
   ↓
2. Email with OTP sent
   ↓
3. User enters OTP → POST /verify
   ↓
4. loginToken stored in localStorage
   ↓
5. User completes onboarding → PATCH /onboarding (with token)
   ↓
6. Navigate to dashboard → GET /dashboard (with token)
```

## Token Management

**Storage:**
- Token stored in `localStorage` as `loginToken`
- User data stored in `localStorage` as `user`

**Usage:**
- Automatically attached to all requests via axios interceptor
- Format: `Authorization: Bearer <token>`

**Error Handling:**
- 401 responses automatically clear token and redirect to login
- Implemented in axios response interceptor

## File Structure

```
src/
├── lib/
│   └── api.js              # Axios instance, API functions
├── hooks/
│   └── useApi.js           # React Query hooks
├── pages/
│   ├── SignupPage.jsx      # Uses useCreateAccount
│   ├── VerifyEmailPage.jsx # Uses useVerifyAccount
│   ├── OnboardingPage.jsx  # Uses useCompleteOnboarding
│   └── dashboard/          # Uses useDashboard
└── main.jsx                # QueryClient provider setup
```

## React Query Configuration

**Default Options:**
- `refetchOnWindowFocus`: false
- `retry`: 1
- `staleTime`: 5 minutes

**DevTools:**
- Available in development mode
- Toggle with React Query DevTools button

## Error Handling

**Client-Side Validation:**
- Email format validation
- Password strength validation
- Username format validation
- All errors shown in UI

**API Error Handling:**
- Error messages extracted from `error.response.data.message`
- Fallback to generic error messages
- Errors displayed in form UI

## Testing the Integration

### 1. Test Signup Flow
```
1. Go to /signup
2. Enter email and password
3. Check browser console for API call
4. Should navigate to /verify-email
5. Check localStorage for 'pendingEmail'
```

### 2. Test Verification
```
1. Enter the 6-digit OTP from email
2. Check browser console for API call
3. Should navigate to /onboarding
4. Check localStorage for 'loginToken' and 'user'
```

### 3. Test Onboarding
```
1. Fill in all onboarding fields
2. Click through all steps
3. Check browser console for API call
4. Should navigate to /dashboard
```

### 4. Test Dashboard
```
1. Dashboard should automatically fetch data
2. Open React Query DevTools to see query status
3. Check browser console for API calls
```

## Next Steps

### TODO:
1. Implement resend OTP functionality
2. Add login endpoint integration
3. Integrate dashboard data with real API
4. Add more API endpoints:
   - Update profile
   - Payment links CRUD
   - Supporters list
   - Transactions
   - Analytics
5. Add proper error toast notifications
6. Implement refresh token logic
7. Add loading states across all pages
8. Add optimistic updates for mutations

## Notes

- All API calls are properly typed and validated
- React Query automatically handles caching and refetching
- DevTools enabled in development for debugging
- Token is automatically attached to all authenticated requests
- Proper cleanup on logout/401 errors

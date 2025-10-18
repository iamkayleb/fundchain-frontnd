# FundChain Frontend

A Next.js-based frontend application for the FundChain educational fundraising platform with role-based dashboards and secure authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend API running (either locally or deployed)

### Installation

```bash
# Clone and navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://fundchain-backend.onrender.com
# For local development:
# NEXT_PUBLIC_API_URL=http://localhost:5000

# App Configuration
NEXT_PUBLIC_APP_NAME=FundChain
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### API Connection

The frontend automatically connects to the backend API using the `NEXT_PUBLIC_API_URL` environment variable. The API wrapper handles:

- ✅ JWT cookie-based authentication
- ✅ Automatic CSRF token handling  
- ✅ Error handling and user feedback
- ✅ Role-based API access

## 📱 Features

### 🔐 Authentication System
- User registration and login
- Role-based access (Student, Donor, Institution, Admin)
- JWT token authentication with secure cookies
- Auto-login and session management

### 👨‍🎓 Student Dashboard
- Campaign creation and management
- Verification document submission
- Donation tracking and analytics
- Campaign performance metrics

### 💝 Donor Dashboard  
- Browse active campaigns
- Make secure donations
- Donation history and receipts
- Impact tracking

### 🏫 Institution Dashboard
- Student verification management
- Institution roster oversight
- Verification document review
- Student campaign monitoring

### 👨‍💼 Admin Dashboard
- System-wide oversight and monitoring
- Verification request management
- Campaign approval workflow
- Blockchain ledger exploration
- User management and analytics

### 🔗 Key Components
- **Campaign Cards**: Interactive campaign displays
- **Verification Modals**: Document viewing and approval
- **Toast Notifications**: Real-time user feedback
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Dark Mode**: System preference detection

## 🏗️ Project Structure

```
frontend/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Custom button component
│   ├── Card.tsx         # Card layouts
│   ├── Input.tsx        # Form inputs
│   ├── NavBar.tsx       # Navigation
│   ├── Toast.tsx        # Notifications
│   └── dashboard/       # Dashboard-specific components
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication management
│   ├── useToast.ts      # Toast notifications
│   └── useTheme.tsx     # Theme management
├── lib/                 # Utility libraries
│   └── api.ts           # API wrapper and endpoints
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper
│   ├── index.tsx        # Landing page
│   ├── login.tsx        # Authentication
│   ├── register.tsx     # User registration
│   └── dashboard/       # Role-based dashboards
├── styles/              # CSS and styling
│   └── globals.css      # Global styles with Tailwind
└── public/              # Static assets
```

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Blue (#3B82F6), Green (#10B981), Gray scales
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Animations**: Framer Motion for smooth interactions

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet & Desktop**: Adaptive layouts for larger screens
- **Touch Friendly**: Proper touch targets and gestures

### Accessibility
- **WCAG Compliant**: Proper contrast ratios and focus states
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Semantic HTML and ARIA labels

## 🔗 API Integration

### Authentication Flow
```typescript
// Login user
const { user } = await authApi.login(email, password);

// Auto-redirect based on role
if (user.role === 'admin') router.push('/dashboard/admin');
if (user.role === 'student') router.push('/dashboard/donor');
```

### Campaign Management
```typescript
// Create campaign (students only)
const campaign = await campaignApi.create({
  title: "Research Equipment Fund",
  description: "Advanced AI research tools",
  goal_amount: 25000,
  deadline: "2025-12-31"
});

// Make donation
const donation = await donationApi.create(campaignId, {
  amount: 100,
  payment_method: "paystack"
});
```

### Verification Workflow
```typescript
// Submit verification (students)
await verificationApi.submitRequest({
  document_urls: ["data:application/pdf;base64,..."]
});

// Admin approval
await adminApi.approveVerification(requestId);
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variables in Vercel dashboard
# NEXT_PUBLIC_API_URL=https://fundchain-backend.onrender.com
```

### Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the .next folder or connect Git repository
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or export static site
npm run build && npm run export
```

## 🧪 Development

### Local Development

```bash
# Start with hot reload
npm run dev

# Build CSS (if needed)
npm run tailwind:build

# Type checking
npx tsc --noEmit
```

### Environment Setup

```bash
# For local backend (default)
NEXT_PUBLIC_API_URL=http://localhost:5000

# For deployed backend
NEXT_PUBLIC_API_URL=https://fundchain-backend.onrender.com
```

## 📊 Performance

### Optimization Features
- **Next.js SSR**: Server-side rendering for better SEO
- **Code Splitting**: Automatic route-based splitting  
- **Image Optimization**: Next.js Image component
- **CSS Optimization**: Tailwind CSS purging
- **Bundle Analysis**: Built-in bundle analyzer

### Monitoring
- **Error Tracking**: Built-in error boundaries
- **Performance Metrics**: Web Vitals monitoring
- **User Analytics**: Optional Google Analytics integration

## 🔒 Security

### Frontend Security
- **XSS Protection**: Proper input sanitization
- **CSRF Protection**: Double-submit cookie pattern
- **Content Security**: Secure headers configuration
- **Authentication**: Secure JWT cookie storage

### API Security
- **HTTPS Only**: All production API calls over HTTPS
- **CORS Configuration**: Proper cross-origin setup
- **Token Management**: Automatic token refresh
- **Error Handling**: No sensitive data in error messages

## 🎯 Roadmap

### Planned Features
- [ ] Real-time notifications with WebSockets
- [ ] Advanced campaign analytics dashboard
- [ ] Mobile app with React Native
- [ ] Offline support with service workers
- [ ] Multi-language support (i18n)
- [ ] Advanced search and filtering
- [ ] Campaign sharing and social features
- [ ] Payment method integration (Stripe, PayPal)

### Performance Improvements
- [ ] Progressive Web App (PWA) features
- [ ] Advanced caching strategies
- [ ] GraphQL integration for efficient data fetching
- [ ] Server-side rendering optimization

## 📞 Support

### Common Issues

**API Connection Errors:**
```bash
# Check environment variables
echo $NEXT_PUBLIC_API_URL

# Verify backend is running
curl https://fundchain-backend.onrender.com/health
```

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**CORS Issues:**
- Ensure backend CORS includes your frontend domain
- Check that API URL is correct in environment variables

### Getting Help
- Check browser developer console for errors
- Verify API responses with network tab
- Test API endpoints directly with curl/Postman

## 📄 License

This project is licensed under the MIT License.

---

**FundChain Frontend** - Empowering educational fundraising through intuitive user interfaces and seamless blockchain integration.
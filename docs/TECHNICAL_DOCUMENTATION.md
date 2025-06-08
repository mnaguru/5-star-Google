# Asset Growth Associates Rating System - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Environment Variables & Configuration](#environment-variables--configuration)
3. [External Service Dependencies](#external-service-dependencies)
4. [Database Schema](#database-schema)
5. [Third-Party Integrations](#third-party-integrations)
6. [Infrastructure Components](#infrastructure-components)
7. [URL Structure & Routing](#url-structure--routing)
8. [Development Environment Setup](#development-environment-setup)
9. [API Keys & Credentials](#api-keys--credentials)
10. [System Architecture](#system-architecture)
11. [Codebase Structure](#codebase-structure)
12. [Build & Deployment](#build--deployment)
13. [Testing Requirements](#testing-requirements)

## Project Overview

The Asset Growth Associates Rating System is a React-based web application designed to collect customer feedback and ratings. The system implements a strategic rating flow that directs 5-star ratings to external review platforms while capturing detailed feedback for lower ratings.

### Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.344.0
- **Deployment**: Static hosting (configured for ratemojo.top)

## Environment Variables & Configuration

### Required Environment Variables
```bash
# Development
NODE_ENV=development
VITE_APP_TITLE="Asset Growth Associates - Rating System"
VITE_APP_VERSION=1.0.0

# Production
NODE_ENV=production
VITE_BUILD_TARGET=production

# Optional Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_HOTJAR_ID=XXXXXXX
```

### Configuration Files

#### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
```

#### Tailwind Configuration (`tailwind.config.js`)
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards'
      }
    },
  },
  plugins: [],
};
```

## External Service Dependencies

### Primary External Services

#### 1. Yelp Business Profile
- **URL**: `https://www.yelp.com/biz/asset-growth-associates-beaumont-2`
- **Purpose**: 5-star rating redirect destination
- **Integration**: Direct browser redirect
- **Authentication**: None required

#### 2. Asset Growth Associates Website
- **URL**: `https://assetgrowth.associates`
- **Purpose**: Post-feedback redirect for ratings < 5 stars
- **Integration**: Timed redirect after feedback submission
- **Authentication**: None required

#### 3. Domain Hosting
- **Domain**: `ratemojo.top`
- **DNS Configuration**: CNAME record pointing to hosting provider
- **SSL**: Required for production deployment

### Optional Third-Party Services

#### Analytics Services (Not Currently Implemented)
```javascript
// Google Analytics 4
gtag('config', 'GA-MEASUREMENT-ID', {
  page_title: 'Rating System',
  page_location: window.location.href
});

// Hotjar Tracking
(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
```

## Database Schema

### Current Implementation
The current system **does not use a database**. All data is handled client-side and submitted via form handlers.

### Recommended Database Schema (Future Implementation)

#### Feedback Table
```sql
CREATE TABLE feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  session_id VARCHAR(255)
);

CREATE INDEX idx_feedback_rating ON feedback_submissions(rating);
CREATE INDEX idx_feedback_submitted_at ON feedback_submissions(submitted_at);
```

#### Analytics Table
```sql
CREATE TABLE rating_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL, -- 'rating_given', 'feedback_submitted', 'redirect_executed'
  rating INTEGER,
  redirect_url VARCHAR(500),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id VARCHAR(255),
  ip_address INET
);
```

## Third-Party Integrations

### Current Integrations

#### 1. Yelp Integration
- **Type**: Direct URL redirect
- **Authentication**: None required
- **Implementation**:
```javascript
if (value === 5) {
  window.location.href = 'https://www.yelp.com/biz/asset-growth-associates-beaumont-2';
}
```

#### 2. Company Website Integration
- **Type**: Timed redirect
- **Authentication**: None required
- **Implementation**:
```javascript
useEffect(() => {
  if (submitted && rating && rating < 5) {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = 'https://assetgrowth.associates';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }
}, [submitted, rating]);
```

### Recommended Future Integrations

#### Email Service (SendGrid/Mailgun)
```javascript
// SendGrid Integration
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'admin@assetgrowth.associates',
  from: 'noreply@ratemojo.top',
  subject: `New ${rating}-Star Rating Received`,
  html: feedbackEmailTemplate(formData)
};
```

#### CRM Integration (HubSpot/Salesforce)
```javascript
// HubSpot Contacts API
const hubspotClient = new hubspot.Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN
});

const contactObj = {
  properties: {
    email: formData.email,
    firstname: formData.name.split(' ')[0],
    phone: formData.phone,
    rating_given: rating,
    feedback_notes: formData.feedback
  }
};
```

## Infrastructure Components

### Development Infrastructure
- **Local Development Server**: Vite dev server (port 5173)
- **Hot Module Replacement**: Enabled via Vite
- **TypeScript Compilation**: Real-time via Vite

### Production Infrastructure

#### Hosting Requirements
- **Type**: Static site hosting
- **CDN**: Recommended for global distribution
- **SSL Certificate**: Required
- **Custom Domain**: ratemojo.top

#### Recommended Hosting Providers
1. **Netlify**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

2. **Vercel**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **AWS S3 + CloudFront**
   - S3 bucket for static hosting
   - CloudFront for CDN
   - Route 53 for DNS

#### Performance Requirements
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## URL Structure & Routing

### Current URL Structure
The application is a Single Page Application (SPA) with no client-side routing:

```
https://ratemojo.top/
├── / (root) - Main rating interface
└── Static assets served from /assets/
```

### External URL Dependencies
```
https://www.yelp.com/biz/asset-growth-associates-beaumont-2
└── Redirect destination for 5-star ratings

https://assetgrowth.associates
└── Redirect destination for < 5-star ratings after feedback
```

### Recommended Future Routing Structure
```
https://ratemojo.top/
├── / - Main rating interface
├── /admin - Admin dashboard (future)
├── /analytics - Rating analytics (future)
├── /api/feedback - Feedback submission endpoint (future)
└── /api/analytics - Analytics endpoint (future)
```

## Development Environment Setup

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd rating-system

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Development Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### Development Workflow
1. **Feature Development**: Create feature branch from main
2. **Code Quality**: Run ESLint before commits
3. **Type Safety**: TypeScript strict mode enabled
4. **Testing**: Manual testing in development environment
5. **Build Verification**: Test production build locally

### IDE Configuration

#### VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint"
  ]
}
```

#### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## API Keys & Credentials

### Current Requirements
The current implementation requires **no API keys or credentials**.

### Future API Requirements

#### Email Service (SendGrid)
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@ratemojo.top
```

#### Analytics Services
```bash
# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Hotjar
HOTJAR_ID=1234567
HOTJAR_SV=6
```

#### CRM Integration
```bash
# HubSpot
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
HUBSPOT_PORTAL_ID=12345678

# Salesforce
SALESFORCE_CLIENT_ID=3MVG9xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SALESFORCE_CLIENT_SECRET=1234567890123456789
SALESFORCE_USERNAME=admin@company.com
SALESFORCE_PASSWORD=password123
SALESFORCE_SECURITY_TOKEN=abcdefghijklmnopqrstuvwxyz
```

#### Database (PostgreSQL/Supabase)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/rating_system
SUPABASE_URL=https://xxxxxxxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## System Architecture

### Current Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │───▶│  Static Website  │───▶│ External URLs   │
│                 │    │  (React SPA)     │    │ - Yelp          │
│                 │    │                  │    │ - Company Site  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Recommended Future Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │───▶│  Frontend (SPA)  │───▶│   Backend API   │
│                 │    │  - React         │    │  - Node.js      │
│                 │    │  - TypeScript    │    │  - Express      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   CDN/Hosting    │    │    Database     │
                       │  - Netlify       │    │  - PostgreSQL   │
                       │  - Vercel        │    │  - Supabase     │
                       └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │ External APIs   │
                                               │ - SendGrid      │
                                               │ - HubSpot       │
                                               │ - Analytics     │
                                               └─────────────────┘
```

### Component Architecture
```
App.tsx
├── StarRating.tsx (Rating input component)
├── FeedbackForm.tsx (Feedback collection)
├── AppreciationModal.tsx (5-star thank you)
└── ReviewResponseTemplate.tsx (Admin tool)
```

### Data Flow
```
User Interaction → State Management → Conditional Rendering → External Redirects
     │                    │                     │                    │
     ▼                    ▼                     ▼                    ▼
Rating Click      useState/useEffect    Show/Hide Components   Yelp/Company Site
```

## Codebase Structure

### Directory Structure
```
rating-system/
├── public/
│   ├── CNAME                 # Domain configuration
│   └── vite.svg             # Favicon
├── src/
│   ├── components/          # React components
│   │   ├── StarRating.tsx
│   │   ├── FeedbackForm.tsx
│   │   ├── AppreciationModal.tsx
│   │   └── ReviewResponseTemplate.tsx
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles and animations
│   └── vite-env.d.ts       # Vite type definitions
├── docs/                   # Documentation
│   └── TECHNICAL_DOCUMENTATION.md
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
├── eslint.config.js        # ESLint configuration
└── README.md              # Project overview
```

### Component Responsibilities

#### App.tsx (Main Controller)
- State management for rating and form submission
- Conditional rendering logic
- Countdown timer for redirects
- Background animations and layout

#### StarRating.tsx
- Interactive 5-star rating interface
- Hover effects and visual feedback
- Immediate redirect for 5-star ratings
- Accessibility features

#### FeedbackForm.tsx
- Form validation and submission
- Input styling and user experience
- Data collection for ratings < 5 stars

#### AppreciationModal.tsx
- Thank you message display
- Modal overlay functionality
- User engagement for positive ratings

#### ReviewResponseTemplate.tsx
- Admin tool for generating review responses
- Template customization interface
- Copy-to-clipboard functionality

### Styling Architecture

#### Tailwind CSS Classes
- **Layout**: Flexbox and Grid utilities
- **Responsive**: Mobile-first breakpoints
- **Colors**: Custom gradient system
- **Animations**: Custom keyframe animations
- **Effects**: Backdrop blur and glassmorphism

#### Custom CSS Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Build & Deployment

### Build Process

#### Development Build
```bash
# Start development server
npm run dev

# Runs on http://localhost:5173
# Hot module replacement enabled
# Source maps included
```

#### Production Build
```bash
# Create optimized production build
npm run build

# Output directory: dist/
# Assets are minified and optimized
# Source maps generated
```

#### Build Optimization
- **Code Splitting**: Vendor and component chunks
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and CSS minification
- **Bundle Analysis**: Size optimization

### Deployment Procedures

#### Netlify Deployment
```bash
# Build settings
Build command: npm run build
Publish directory: dist
Node version: 18

# Environment variables
NODE_ENV=production
```

#### Manual Deployment Steps
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Test the build locally**
   ```bash
   npm run preview
   ```

3. **Deploy to hosting provider**
   - Upload `dist/` folder contents
   - Configure custom domain
   - Set up SSL certificate

#### Continuous Deployment
```yaml
# GitHub Actions example
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

### Domain Configuration

#### DNS Settings
```
Type: CNAME
Name: @
Value: [hosting-provider-url]
TTL: 3600
```

#### SSL Certificate
- **Provider**: Let's Encrypt (automatic)
- **Renewal**: Automatic
- **HTTPS Redirect**: Enabled

## Testing Requirements

### Current Testing Status
**No automated tests are currently implemented.**

### Recommended Testing Strategy

#### Unit Testing (Jest + React Testing Library)
```javascript
// StarRating.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { StarRating } from '../components/StarRating';

describe('StarRating Component', () => {
  test('renders 5 stars', () => {
    render(<StarRating onRate={jest.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  test('calls onRate when star is clicked', () => {
    const mockOnRate = jest.fn();
    render(<StarRating onRate={mockOnRate} />);
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(mockOnRate).toHaveBeenCalledWith(3);
  });
});
```

#### Integration Testing
```javascript
// App.integration.test.tsx
describe('Rating Flow Integration', () => {
  test('shows feedback form after rating < 5', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button')[2]); // 3 stars
    expect(screen.getByText('Your Voice Matters')).toBeInTheDocument();
  });

  test('redirects to Yelp for 5-star rating', () => {
    delete window.location;
    window.location = { href: '' };
    render(<App />);
    fireEvent.click(screen.getAllByRole('button')[4]); // 5 stars
    expect(window.location.href).toBe('https://www.yelp.com/biz/asset-growth-associates-beaumont-2');
  });
});
```

#### End-to-End Testing (Playwright)
```javascript
// e2e/rating-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete rating flow', async ({ page }) => {
  await page.goto('/');
  
  // Test 3-star rating flow
  await page.click('[aria-label="Rate 3 stars"]');
  await expect(page.locator('text=Your Voice Matters')).toBeVisible();
  
  // Fill feedback form
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="phone"]', '555-1234');
  await page.fill('[name="feedback"]', 'Test feedback');
  await page.click('button[type="submit"]');
  
  // Verify thank you message
  await expect(page.locator('text=Thank You for Your Vision!')).toBeVisible();
});
```

#### Performance Testing
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

### Testing Setup Instructions
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom vitest

# Add test scripts to package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}

# Run tests
npm run test
```

### Manual Testing Checklist
- [ ] Rating stars are clickable and provide visual feedback
- [ ] 5-star rating redirects to Yelp immediately
- [ ] Ratings 1-4 show feedback form
- [ ] Feedback form validates required fields
- [ ] Form submission shows thank you message
- [ ] Countdown timer works correctly
- [ ] Redirect to company website after countdown
- [ ] Responsive design works on mobile devices
- [ ] Animations and transitions are smooth
- [ ] Accessibility features work with keyboard navigation

---

## Maintenance and Support

### Regular Maintenance Tasks
- **Dependency Updates**: Monthly security updates
- **Performance Monitoring**: Weekly Lighthouse audits
- **Analytics Review**: Monthly feedback analysis
- **SSL Certificate**: Automatic renewal monitoring

### Support Contacts
- **Technical Issues**: [developer-email]
- **Business Logic**: Asset Growth Associates
- **Hosting Support**: [hosting-provider-support]

### Version History
- **v1.0.0**: Initial release with basic rating functionality
- **v1.1.0**: Added feedback form and redirect logic
- **v1.2.0**: Enhanced animations and visual design

---

*This documentation should be updated whenever significant changes are made to the system architecture, dependencies, or deployment procedures.*
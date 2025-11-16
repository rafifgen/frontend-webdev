# TradePro Frontend

A modern Next.js frontend application for the TradePro trading platform, built with TypeScript, Tailwind CSS, and React.

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🔒 **Authentication** with JWT tokens
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **TypeScript** for type safety
- 🍞 **Toast Notifications** with react-hot-toast
- 📊 **Admin Dashboard** for testimonials management
- 🔄 **API Integration** with Axios
- 🎪 **Interactive UI Components**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see ../backend)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment variables:
```bash
cp .env.local.example .env.local
```

3. Update environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=TradePro Frontend
NEXT_PUBLIC_APP_VERSION=1.0.0
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   ├── hooks/             # Custom React hooks
│   │   └── useAuth.ts     # Authentication hook
│   ├── lib/               # Utility libraries
│   │   └── api.ts         # API client
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── package.json
```

## Pages & Features

### 🏠 Home Page (`/`)
- Hero section with call-to-action
- Features showcase
- Track record statistics
- Pricing plans
- Testimonials display
- FAQ section
- Responsive navigation

### 🔐 Authentication
- **Login** (`/login`) - Email/password authentication
- **Register** (`/register`) - User registration with validation
- JWT token management with refresh
- Protected routes

### 👑 Admin Dashboard (`/admin`)
- Testimonials management (CRUD)
- Statistics overview
- Search and filter functionality
- Status toggle (active/inactive)
- Real-time updates

## API Integration

The frontend communicates with the NestJS backend through a comprehensive API client:

```typescript
// Example usage
import { apiClient } from '@/lib/api';

// Authentication
await apiClient.login({ email, password });
await apiClient.register(userData);
await apiClient.logout();

// Testimonials
const testimonials = await apiClient.getActiveTestimonials();
await apiClient.createTestimonial(data);
await apiClient.updateTestimonial(id, data);
```

### Key Features:
- Automatic JWT token handling
- Request/response interceptors
- Error handling and retry logic
- TypeScript interfaces for all endpoints

## Authentication Hook

The `useAuth` hook provides comprehensive authentication state management:

```typescript
const { 
  user, 
  isLoading, 
  isAuthenticated, 
  login, 
  register, 
  logout,
  isAdmin 
} = useAuth();
```

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette for branding
- Responsive design utilities
- Animation classes

### Custom Styles
- Button transitions and hover effects
- Card hover animations
- Form input focus states
- Loading spinners
- Toast notification styling

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

### Code Quality

- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** integration via ESLint
- **Strict mode** enabled

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `TradePro Frontend` |
| `NEXT_PUBLIC_APP_VERSION` | App version | `1.0.0` |

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Backend Integration

This frontend is designed to work with the NestJS backend located in `../backend`. Make sure the backend is running on the configured API URL before starting the frontend development server.

### Backend Requirements:
- NestJS API running on port 3001 (default)
- Authentication endpoints (`/auth/*`)
- Testimonials endpoints (`/testimonials/*`)
- User management endpoints (`/users/*`)

## Performance Optimization

- **Image Optimization** with Next.js Image component
- **Code Splitting** with dynamic imports
- **Bundle Analysis** available with `npm run analyze`
- **Caching** strategies for API requests
- **Lazy Loading** for components and routes

## Security Features

- **CSRF Protection** via SameSite cookies
- **XSS Protection** with proper input sanitization
- **Secure Headers** configured in Next.js
- **JWT Token Security** with HTTP-only options
- **Input Validation** on all forms

---

For more information about the complete application architecture, please refer to the main project README.
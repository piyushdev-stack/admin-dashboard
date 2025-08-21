# Admin Dashboard

Admin dashboard built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This project demonstrates professional-grade architecture, component reusability, state management, and modern web development best practices.

To test the application, use these login credentials:
- **Email**: `admin@example.com`
- **Password**: `password`

## ✨ Features

### Core Functionality
- 🔐 **Authentication System** - Secure login with comprehensive form validation and error handling
- 📊 **Dashboard Overview** - Real-time statistics, data visualization, and quick action buttons
- 👥 **User Management** - Browse, search, filter, and view detailed user profiles with pagination
- 📝 **Post Management** - Advanced post filtering by user, search functionality, and modal-based detail views
- 🔍 **Advanced Search** - Real-time search with 300ms debouncing across multiple data fields
- 📄 **Smart Pagination** - Client-side pagination with configurable page sizes and navigation
- 📱 **Responsive Design** - Mobile-first responsive layout with adaptive navigation
- 🎨 **Dual View Modes** - Toggle between table and card layouts for optimal data viewing

### Technical Features
- ⚡ **Performance Optimized** - Lazy loading, virtual scrolling, and intelligent caching strategies
- 🎯 **SEO Ready** - Dynamic metadata, structured data, and optimized page titles
- 🔄 **State Management** - Redux Toolkit with TypeScript for predictable state updates
- 🌐 **HTTP Client** - Axios-based API service with interceptors and error handling
- 📦 **Component Library** - Comprehensive reusable component system with consistent APIs
- 🛠 **Developer Experience** - ESLint, TypeScript, and Jest testing setup
- 🧪 **Testing Infrastructure** - Jest and React Testing Library setup with sample tests

## 🏗 Project Structure

The project follows a feature-based organization pattern for better maintainability and scalability:

```
src/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Dashboard routes
│   │   ├── users/              # User management pages
│   │   │   ├── [id]/           # Dynamic user detail pages
│   │   │   └── page.tsx        # Users listing page
│   │   ├── posts/              # Post management pages
│   │   │   └── page.tsx        # Posts listing page
│   │   ├── layout.tsx          # Dashboard layout wrapper
│   │   └── page.tsx            # Dashboard home page
│   ├── login/                  # Authentication pages
│   │   └── page.tsx            # Login page
│   ├── globals.css             # Global styles and Tailwind imports
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Application home page
├── components/                  # Reusable components
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx          # Navigation header with logout
│   │   ├── Sidebar.tsx         # Navigation sidebar with menu
│   │   └── DashboardLayout.tsx # Main dashboard layout wrapper
│   ├── ui/                     # UI component library
│   │   ├── Button.tsx          # Configurable button component
│   │   ├── Input.tsx           # Form input component
│   │   ├── Card.tsx            # Content card component
│   │   ├── Table.tsx           # Data table with sorting
│   │   ├── Pagination.tsx      # Pagination controls
│   │   ├── Search.tsx          # Search input with debouncing
│   │   ├── Loading.tsx         # Loading spinner component
│   │   ├── Modal.tsx           # Modal dialog component
│   │   └── index.ts            # Component exports
├── store/                      # Redux state management
│   ├── slices/                 # Redux slices
│   │   ├── authSlice.ts        # Authentication state and actions
│   │   ├── usersSlice.ts       # Users data and search state
│   │   └── postsSlice.ts       # Posts data and filtering state
│   ├── hooks.ts                # Typed Redux hooks (useAppDispatch, useAppSelector)
│   ├── Provider.tsx            # Redux provider wrapper component
│   └── index.ts                # Store configuration and setup
├── services/                   # API services layer
│   ├── api.ts                  # Axios HTTP client and API endpoints
│   └── __tests__/              # API service tests
│       └── api.test.ts         # API functionality tests
├── lib/                        # Utility functions and helpers
│   ├── hooks/                  # Custom React hooks
│   │   └── usePerformance.ts   # Performance monitoring hook
│   ├── utils.ts                # Helper functions and utilities
│   ├── metadata.ts             # SEO metadata generation utilities
│   └── __tests__/              # Utility function tests
│       └── utils.test.ts       # Utility function tests
└── types/                      # TypeScript type definitions
    └── index.ts                # Global type definitions
```

## 🛠 Technology Stack

### Core Technologies
- **Next.js 15** - React framework with App Router and server-side rendering
- **React 19** - Modern UI library with latest features and concurrent rendering
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### State Management & Data Fetching
- **Redux Toolkit** - Predictable state management with minimal boilerplate
- **React Redux** - React bindings for Redux with TypeScript support
- **Axios** - HTTP client with interceptors and request/response handling
- **JSONPlaceholder** - RESTful API for demonstration data

### Development & Testing Tools
- **ESLint** - Code linting and quality assurance with Next.js rules
- **Jest** - JavaScript testing framework with React Testing Library
- **React Testing Library** - Testing utilities for React components
- **TypeScript Compiler** - Static type checking and compilation

### Performance & SEO Optimization
- **Dynamic Metadata** - SEO optimization with page-specific meta tags
- **Lazy Loading** - Component and route-based code splitting
- **Debounced Search** - Performance optimization for search functionality
- **Code Splitting** - Optimized bundle sizes with automatic code splitting

## 🚀 Getting Started


### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000) 

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis
- `npm test` - Run Jest test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Login Credentials
- **Email**: `admin@example.com`
- **Password**: `password`

### Performance Optimizations

**Debounced Search Implementation**: Search functionality includes a 300ms debounce mechanism to reduce unnecessary API calls while maintaining a responsive user experience.

**Client-Side Pagination**: Large datasets are paginated on the client side to improve performance, reduce memory usage, and provide faster navigation between pages.

**Component Lazy Loading**: React components and routes are loaded only when needed, reducing initial bundle size and improving application load times.

**Memoization Strategies**: Expensive calculations and component renders are optimized using React.useMemo and React.useCallback to prevent unnecessary recalculations.

**Virtual Scrolling**: Large lists implement virtual scrolling to handle thousands of items efficiently without performance degradation.

### Accessibility and SEO

**Dynamic Metadata Generation**: Each page includes specific titles, descriptions, and Open Graph tags for better search engine optimization and social media sharing.

**Semantic HTML Structure**: Proper HTML structure with appropriate headings, landmarks, and semantic elements for screen reader compatibility.

**Keyboard Navigation Support**: Full keyboard accessibility with proper focus management, tab order, and keyboard shortcuts for all interactive elements.

**ARIA Labels and Descriptions**: Comprehensive ARIA labels, descriptions, and live regions for assistive technology support and better accessibility.

## 🧪 Testing

### Testing Infrastructure

The project includes a comprehensive testing setup using Jest and React Testing Library:

- **Jest Configuration** - Custom Jest setup with Next.js integration
- **React Testing Library** - Component testing utilities with DOM queries
- **Test Coverage** - Coverage reporting for code quality assessment
- **Mock Services** - API service mocking for isolated testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage Areas

- **API Services** - HTTP client functionality and error handling
- **Utility Functions** - Helper functions and data transformations
- **Component Rendering** - UI component behavior and props handling
- **Redux State Management** - State updates and action dispatching

## 🚀 Deployment

### Production Build

Before deployment, create an optimized production build:

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

### Vercel
i have deplyed the assignment on Vercel
1. **Using Vercel CLI**
   ```bash
   npm install -g vercel
   vercel
   ```

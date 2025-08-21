# Testing Setup

This project includes a basic Jest testing setup with React Testing Library.

## 🧪 **Testing Stack**

- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements
- **@testing-library/user-event** - User interaction simulation

## 📁 **Test Structure**

```
src/
├── components/ui/__tests__/
│   ├── Button.test.tsx
│   └── Loading.test.tsx
├── services/__tests__/
│   └── api.test.ts
├── lib/__tests__/
│   └── utils.test.ts
├── store/slices/__tests__/
│   └── usersSlice.test.ts
└── app/login/__tests__/
    └── page.test.tsx
```

## 🚀 **Running Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## ✅ **Current Test Coverage**

- **API Services** - ✅ Basic API structure tests
- **Utility Functions** - ✅ Class combination utilities
- **UI Components** - ⚠️ Basic component rendering (some failing)
- **Redux Store** - ⚠️ Basic store structure (some failing)
- **Page Components** - ⚠️ Basic page rendering (some failing)

## 🔧 **Configuration**

- **Jest Config**: `jest.config.js`
- **Setup File**: `jest.setup.js`
- **Test Environment**: jsdom (for DOM testing)

## 📝 **Test Examples**

### Component Test
```typescript
import { render, screen } from '@testing-library/react'
import Button from '../Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

### API Test
```typescript
import { authAPI } from '../api'

test('should login with correct credentials', async () => {
  const result = await authAPI.loginUser('admin@example.com', 'password')
  expect(result).toHaveProperty('token')
})
```

## 🎯 **Next Steps**

1. Fix failing component tests
2. Add more comprehensive API tests
3. Add integration tests
4. Increase test coverage
5. Add E2E tests with Playwright/Cypress

## 📊 **Current Status**

- ✅ **2 test suites passing**
- ✅ **22 tests passing**
- ⚠️ **4 test suites with issues**
- ⚠️ **10 tests failing**

The basic Jest setup is working and ready for expansion!

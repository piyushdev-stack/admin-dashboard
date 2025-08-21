// User types
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Post types
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// Component props types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

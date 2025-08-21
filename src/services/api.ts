import axios from 'axios';
import { User, Post } from '@/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create simple HTTP client
const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
httpClient.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

// Handle errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Simple API functions
export const userAPI = {
  // Get all users
  async getAllUsers(): Promise<User[]> {
    const response = await httpClient.get<User[]>('/users');
    return response.data;
  },

  // Get one user by ID
  async getUserById(userId: number): Promise<User> {
    const response = await httpClient.get<User>(`/users/${userId}`);
    return response.data;
  },
};

export const postAPI = {
  // Get all posts
  async getAllPosts(): Promise<Post[]> {
    const response = await httpClient.get<Post[]>('/posts');
    return response.data;
  },

  // Get one post by ID
  async getPostById(postId: number): Promise<Post> {
    const response = await httpClient.get<Post>(`/posts/${postId}`);
    return response.data;
  },

  // Get posts by user
  async getPostsByUser(userId: number): Promise<Post[]> {
    const response = await httpClient.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  },
};

export const authAPI = {
  // Simple login function
  async loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          const adminUser: User = {
            id: 1,
            name: 'Admin User',
            username: 'admin',
            email: 'admin@example.com',
            address: {
              street: 'Kulas Light',
              suite: 'Apt. 556',
              city: 'Gwenborough',
              zipcode: '92998-3874',
              geo: {
                lat: '-37.3159',
                lng: '81.1496'
              }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
              name: 'Romaguera-Crona',
              catchPhrase: 'Multi-layered client-server neural-net',
              bs: 'harness real-time e-markets'
            }
          };
          resolve({
            token: 'user-token-123',
            user: adminUser
          });
        } else {
          reject(new Error('Wrong email or password'));
        }
      }, 1000);
    });
  },

  // Simple logout function
  async logoutUser(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('userToken');
        resolve();
      }, 500);
    });
  }
};

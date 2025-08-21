'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Input } from '@/components/ui';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { LoginCredentials } from '@/types';
import { isEmailValid } from '@/lib/utils';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginCredentials>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: LoginCredentials) => {
    // Clear any previous errors
    dispatch(clearError());

    // Validate email format
    if (!isEmailValid(data.email)) {
      setError('email', { message: 'Please enter a valid email address' });
      return;
    }

    // Validate password
    if (data.password.length < 6) {
      setError('password', { message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const result = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(result)) {
        router.push('/dashboard');
      }
    } catch {
      // Error is handled by the slice
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Admin Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use <span className="font-medium">admin@example.com</span> and{' '}
            <span className="font-medium">password</span> to login
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Login</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Input
              labelText="Email address"
              type="email"
              placeholder="Enter your email"
              errorMessage={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                validate: (value) => isEmailValid(value) || 'Please enter a valid email address',
              })}
            />

            <Input
              labelText="Password"
              type="password"
              placeholder="Enter your password"
              errorMessage={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllUsers } from '@/store/slices/usersSlice';
import { getAllPosts } from '@/store/slices/postsSlice';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state: any) => state.users);
  const postsState = useAppSelector((state: any) => state.posts);
  const authState = useAppSelector((state: any) => state.auth);

  const { userList, isLoading: usersLoading } = usersState;
  const { postList, isLoading: postsLoading } = postsState;
  const { user } = authState;

  useEffect(() => {
    // Fetch initial data for dashboard overview
    dispatch(getAllUsers());
    dispatch(getAllPosts());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Users',
      value: userList.length,
      icon: '👥',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
      loading: usersLoading,
    },
    {
      title: 'Total Posts',
      value: postList.length,
      icon: '📝',
      color: 'bg-green-50 border-green-200 text-green-600',
      loading: postsLoading,
    },
    {
      title: 'Active Users',
      value: userList.filter((u: any) => u.email.includes('@')).length,
      icon: '✅',
      color: 'bg-purple-50 border-purple-200 text-purple-600',
      loading: usersLoading,
    },
    {
      title: 'Companies',
      value: new Set(userList.map((u: any) => u.company.name)).size,
      icon: '🏢',
      color: 'bg-orange-50 border-orange-200 text-orange-600',
      loading: usersLoading,
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Admin'}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s an overview of your admin dashboard. Manage users, posts, and monitor activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.title} className={`rounded-lg border-2 p-6 ${stat.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  {stat.loading ? (
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  )}
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/users"
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900">👥 Manage Users</div>
                <div className="text-sm text-blue-700">View and manage all users</div>
              </Link>
              <Link
                href="/dashboard/posts"
                className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="font-medium text-green-900">📝 Manage Posts</div>
                <div className="text-sm text-green-700">Browse and filter posts</div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
            <div className="space-y-3">
              {userList.slice(0, 3).map((user: any) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
              {usersLoading && (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

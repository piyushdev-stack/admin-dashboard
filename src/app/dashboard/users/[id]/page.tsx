'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Card, CardHeader, CardContent, Button, Loading } from '@/components/ui';
import { getUserById, clearSelectedUser } from '@/store/slices/usersSlice';
import { getPostsByUser } from '@/store/slices/postsSlice';
const UserDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const userId = parseInt(params.id as string);
  const usersState = useAppSelector((state: any) => state.users);
  const postsState = useAppSelector((state: any) => state.posts);

  const { selectedUser, isLoading, errorMessage } = usersState;
  const { postList } = postsState;

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(getPostsByUser(userId));
    }

    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch, userId]);

  if (isLoading) {
    return <Loading text="Loading user details..." />;
  }

  if (errorMessage) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Error: {errorMessage}</div>
        <Button onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600 mb-4">User not found</div>
        <Button onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const userPosts = postList.filter((post: any) => post.userId === userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            look="outline"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h1>
            <p className="text-gray-600">@{selectedUser.username}</p>
          </div>
        </div>
        <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-medium">
            {selectedUser.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {/* User Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Full Name</label>
              <p className="mt-1 text-sm text-gray-900">{selectedUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Username</label>
              <p className="mt-1 text-sm text-gray-900">@{selectedUser.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-sm text-gray-900">
                <a
                  href={`mailto:${selectedUser.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {selectedUser.email}
                </a>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <p className="mt-1 text-sm text-gray-900">
                <a
                  href={`tel:${selectedUser.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {selectedUser.phone}
                </a>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Website</label>
              <p className="mt-1 text-sm text-gray-900">
                <a
                  href={`https://${selectedUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {selectedUser.website}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Street</label>
              <p className="mt-1 text-sm text-gray-900">
                {selectedUser.address.street}, {selectedUser.address.suite}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">City</label>
              <p className="mt-1 text-sm text-gray-900">{selectedUser.address.city}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Zipcode</label>
              <p className="mt-1 text-sm text-gray-900">{selectedUser.address.zipcode}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Coordinates</label>
              <p className="mt-1 text-sm text-gray-900">
                Lat: {selectedUser.address.geo.lat}, Lng: {selectedUser.address.geo.lng}
              </p>
            </div>
            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${selectedUser.address.geo.lat},${selectedUser.address.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View on Google Maps
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Company</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Company Name</label>
              <p className="mt-1 text-sm text-gray-900">{selectedUser.company.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Catch Phrase</label>
              <p className="mt-1 text-sm text-gray-900 italic">&quot;{selectedUser.company.catchPhrase}&quot;</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Business</label>
              <p className="mt-1 text-sm text-gray-900">{selectedUser.company.bs}</p>
            </div>
          </CardContent>
        </Card>

        {/* User Posts */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Posts ({userPosts.length})
            </h3>
          </CardHeader>
          <CardContent>
            {userPosts.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {userPosts.map((post: any) => (
                  <div key={post.id} className="border-l-4 border-blue-500 pl-3">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {post.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No posts found for this user.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailPage;

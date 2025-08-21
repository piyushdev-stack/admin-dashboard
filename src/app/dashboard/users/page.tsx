'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Card, CardHeader, CardContent, Table, Pagination, Search, Loading, Button } from '@/components/ui';
import { getAllUsers, updateSearchText, changeCurrentPage } from '@/store/slices/usersSlice';
import { TableColumn } from '@/types';
import { searchItems, getPageInfo, waitBeforeCall } from '@/lib/utils';

const UsersPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state: any) => state.users);
  const { userList, isLoading, errorMessage, searchText, currentPage, usersPerPage } = usersState;

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  useEffect(() => {
    if (userList.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, userList.length]);

  // Wait before searching
  const delayedSearch = useMemo(
    () => waitBeforeCall((searchText: string) => {
      dispatch(updateSearchText(searchText));
    }, 300),
    [dispatch]
  );

  // Filter and paginate users
  const filteredUsers = useMemo(() => {
    return searchItems(userList, searchText, ['name', 'email', 'phone', 'company']);
  }, [userList, searchText]);

  const pageInfo = useMemo(() => {
    return getPageInfo(currentPage, usersPerPage, filteredUsers.length);
  }, [currentPage, usersPerPage, filteredUsers.length]);

  const usersToShow = useMemo(() => {
    const { startIndex, endIndex } = pageInfo;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, pageInfo]);

  // Table columns setup
  const tableColumns: TableColumn<any>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (user: any) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.username}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (user: any) => (
        <div className="text-sm text-gray-900">{user.email}</div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (user: any) => (
        <div className="text-sm text-gray-900">{user.phone}</div>
      ),
    },
    {
      key: 'company',
      label: 'Company',
      render: (user: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{user.company.name}</div>
          <div className="text-sm text-gray-500">{user.company.catchPhrase}</div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUserClick(user)}
            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const handleUserClick = (user: any) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  if (isLoading && userList.length === 0) {
    return <Loading text="Loading users..." />;
  }

  if (errorMessage) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Error: {errorMessage}</div>
        <Button onClick={() => dispatch(getAllUsers())}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and view all users in the system
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* Top row - View toggle and search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                look={viewMode === 'table' ? 'primary' : 'outline'}
                buttonSize="small"
                onClick={() => setViewMode('table')}
              >
                📊 Table
              </Button>
              <Button
                look={viewMode === 'cards' ? 'primary' : 'outline'}
                buttonSize="small"
                onClick={() => setViewMode('cards')}
              >
                📋 Cards
              </Button>
            </div>

            <div className="flex-1 max-w-md">
              <Search
                value={searchText}
                onChange={delayedSearch}
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* Bottom row - Results count */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {pageInfo.startIndex + 1}-{pageInfo.endIndex} of {filteredUsers.length} users
            </span>
            <span className="hidden sm:inline">
              Page {currentPage} of {pageInfo.totalPages}
            </span>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table
                  dataList={usersToShow}
                  columnList={tableColumns}
                  onRowClick={handleUserClick}
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {usersToShow.map((user: any) => (
              <Card
                key={user.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleUserClick(user)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium block sm:inline">📧 Email:</span>
                      <span className="block sm:inline sm:ml-2 break-all">{user.email}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium block sm:inline">📞 Phone:</span>
                      <span className="block sm:inline sm:ml-2">{user.phone}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium block sm:inline">🏢 Company:</span>
                      <span className="block sm:inline sm:ml-2">{user.company.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium block sm:inline">🌐 Website:</span>
                      <span className="block sm:inline sm:ml-2 break-all">{user.website}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageInfo.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={pageInfo.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;

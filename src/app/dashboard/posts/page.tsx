'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Card, CardHeader, CardContent, Pagination, Search, Loading, Button, Modal } from '@/components/ui';
import { getAllPosts, setUserFilter, updateSearchText, changeCurrentPage, selectPost } from '@/store/slices/postsSlice';
import { getAllUsers } from '@/store/slices/usersSlice';
import { Post, User } from '@/types';
import { searchItems, getPageInfo, waitBeforeCall, makeTextShorter } from '@/lib/utils';

const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const postsState = useAppSelector((state: any) => state.posts);
  const usersState = useAppSelector((state: any) => state.users);

  const {
    postList,
    selectedPost,
    isLoading,
    errorMessage,
    filterByUserId,
    searchText,
    currentPage,
    postsPerPage
  } = postsState;
  const { userList } = usersState;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(getAllPosts());
    }
    if (userList.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, postList.length, userList.length]);

  // Wait before searching
  const delayedSearch = useMemo(
    () => waitBeforeCall((searchText: string) => {
      dispatch(updateSearchText(searchText));
    }, 300),
    [dispatch]
  );

  // Filter and paginate posts
  const filteredPosts = useMemo(() => {
    let filtered = postList;

    // Filter by user if selected
    if (filterByUserId) {
      filtered = filtered.filter((post: Post) => post.userId === filterByUserId);
    }

    // Filter by search text
    if (searchText) {
      filtered = searchItems(filtered, searchText, ['title', 'body']);
    }

    return filtered;
  }, [postList, filterByUserId, searchText]);

  const pageInfo = useMemo(() => {
    return getPageInfo(currentPage, postsPerPage, filteredPosts.length);
  }, [currentPage, postsPerPage, filteredPosts.length]);

  const postsToShow = useMemo(() => {
    const { startIndex, endIndex } = pageInfo;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, pageInfo]);

  const handlePostClick = (post: Post) => {
    dispatch(selectPost(post));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(selectPost(null));
  };

  const handlePageChange = (page: number) => {
    dispatch(changeCurrentPage(page));
  };

  const handleUserFilterChange = (userId: string) => {
    const userIdNumber = userId === '' ? null : parseInt(userId);
    dispatch(setUserFilter(userIdNumber));
  };

  const getUserName = (userId: number) => {
    const user = userList.find((u: User) => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  if (isLoading && postList.length === 0) {
    return <Loading text="Loading posts..." />;
  }

  if (errorMessage) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Error: {errorMessage}</div>
        <Button onClick={() => dispatch(getAllPosts())}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <p className="text-gray-600">Browse and manage all posts in the system</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 max-w-md">
            <Search
              value={searchText}
              onChange={delayedSearch}
              placeholder="Search posts..."
            />
          </div>
          <div className="min-w-0 flex-shrink-0">
            <select
              value={filterByUserId || ''}
              onChange={(e) => handleUserFilterChange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Users</option>
              {userList.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Showing {pageInfo.startIndex + 1}-{pageInfo.endIndex} of {filteredPosts.length} posts
        </div>
      </div>

      {/* Clear Filters */}
      {(filterByUserId || searchText) && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filterByUserId && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              User: {getUserName(filterByUserId)}
              <button
                onClick={() => dispatch(setUserFilter(null))}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {searchText && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Search: &quot;{searchText}&quot;
              <button
                onClick={() => dispatch(updateSearchText(''))}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {postsToShow.map((post: Post) => (
          <Card
            key={post.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePostClick(post)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                  #{post.id}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {makeTextShorter(post.body, 120)}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>By: {getUserName(post.userId)}</span>
                <Button
                  look="outline"
                  buttonSize="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePostClick(post);
                  }}
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {pageInfo.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pageInfo.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Post Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPost?.title}
        size="lg"
      >
        {selectedPost && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Post #{selectedPost.id}</span>
              <span>By: {getUserName(selectedPost.userId)}</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {selectedPost.body}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PostsPage;

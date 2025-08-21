import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine CSS classes
export function combineClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Wait before calling function (for search)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function waitBeforeCall<T extends (...args: any[]) => any>(
  func: T,
  waitTime: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), waitTime);
  };
}

// Make date look nice
export function makeNiceDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

// Make text shorter
export function makeTextShorter(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Check if email is valid
export function isEmailValid(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Get page info for pagination
export function getPageInfo(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

// Search through items
export function searchItems<T>(
  itemList: T[],
  searchText: string,
  fieldsToSearch: (keyof T)[]
): T[] {
  if (!searchText.trim()) return itemList;

  const lowerSearchText = searchText.toLowerCase();
  return itemList.filter((item) =>
    fieldsToSearch.some((field) => {
      const fieldValue = item[field];
      return String(fieldValue).toLowerCase().includes(lowerSearchText);
    })
  );
}

// Simple storage helpers
export const simpleStorage = {
  // Get item from storage
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  // Save item to storage
  saveItem: (key: string, value: unknown) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore errors
    }
  },
  // Remove item from storage
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  },
};

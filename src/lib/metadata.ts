import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'A modern admin dashboard built with Next.js and React for managing users and posts',
  keywords: ['admin', 'dashboard', 'react', 'nextjs', 'management'],
  authors: [{ name: 'Admin Dashboard Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://admin-dashboard.vercel.app',
    siteName: 'Admin Dashboard',
    title: 'Admin Dashboard',
    description: 'A modern admin dashboard built with Next.js and React',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Admin Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard',
    description: 'A modern admin dashboard built with Next.js and React',
    images: ['/og-image.png'],
  },
};

export const generatePageMetadata = (
  title: string,
  description: string,
  path?: string
): Metadata => {
  const fullTitle = `${title} | Admin Dashboard`;
  const url = path ? `https://admin-dashboard.vercel.app${path}` : undefined;

  return {
    title: fullTitle,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: fullTitle,
      description,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: fullTitle,
      description,
    },
  };
};

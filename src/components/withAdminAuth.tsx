'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const withAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminAuthComponent = (props: P) => {
    const { isAdmin, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          toast.error('You must be logged in to view this page.');
          router.replace('/login');
        } else if (!isAdmin()) {
          toast.error('You do not have permission to access this page.');
          router.replace('/'); // Redirect to home page for non-admin users
        }
      }
    }, [isLoading, isAuthenticated, isAdmin, router]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      );
    }

    if (!isAuthenticated || !isAdmin()) {
      return null; // The useEffect will handle the redirect, and we'll show nothing until it does.
    }

    return <WrappedComponent {...props} />;
  };

  return WithAdminAuthComponent;
};

export default withAdminAuth;

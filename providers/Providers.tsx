// providers/Providers.tsx
import UserProvider from '@/context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, 
      staleTime: 1000 * 60 * 5, 
      refetchOnWindowFocus: false, 
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1, 
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </UserProvider>
  );
};

export default Providers;
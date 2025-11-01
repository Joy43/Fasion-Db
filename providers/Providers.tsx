import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from '@/context/UserContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 2 * 60 * 1000,
      refetchInterval: 2 * 60 * 1000,
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserProvider>
  );
};

export default Providers;

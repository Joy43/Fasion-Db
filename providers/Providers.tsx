// providers/Providers.tsx
import UserProvider from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import StoreProvider from "./StoreProvider";

// Create a QueryClient instance
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
      <QueryClientProvider client={queryClient}>
        <StoreProvider>{children}</StoreProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default Providers;

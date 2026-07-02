import { getUserProfile } from '@/services/AuthService';
import { getValidToken } from '@/lib/tokenUtils';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      // Check if we have a valid token before making the request
      const token = await getValidToken();
      if (!token) {
        throw new Error('No valid access token found');
      }

      const response = await getUserProfile();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

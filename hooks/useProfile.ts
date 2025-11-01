import { getUserProfile } from '@/services/AuthService';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      const response = await getUserProfile();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    staleTime: 0,
  });
};

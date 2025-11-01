import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '@/services/Category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// -----------get al categories----------------
export const useCategories = () => {
  return useQuery({
    queryKey: ['CATEGORY'],
    queryFn: getAllCategories,
    staleTime: 0,
  });
};
// -----------create, delete, update categories----------------

export const useCreateCategory = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => createCategory({ data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CATEGORY'] });
    },
  });
};

export const useDeleteCategory = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory({ categoryId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CATEGORY'] });
    },
  });
};

export const useUpdateCategory = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      data,
    }: {
      categoryId: string;
      data: FormData;
    }) => updateCategory({ categoryId, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CATEGORY'] });
    },
  });
};

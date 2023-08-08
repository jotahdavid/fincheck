import { useQuery } from '@tanstack/react-query';

import { categoriesService } from '@app/services/categoriesService';

export function useCategories() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => categoriesService.getAll(),
  });

  return {
    categories: data,
    isFetching,
  };
}

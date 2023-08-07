import { useQuery } from '@tanstack/react-query';

import { categoriesService } from '@app/services/categoriesService';
import { delay } from '@app/utils/delay';

export function useCategories() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      await delay();
      return categoriesService.getAll();
    },
  });

  return {
    categories: data,
    isFetching,
  };
}

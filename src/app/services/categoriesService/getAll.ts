import { Category } from '@app/entities/Category';
import httpClient from '@app/services/httpClient';

type CategoryGetAllResponse = Category[];

export async function getAll() {
  const { data } = await httpClient.get<CategoryGetAllResponse>('/categories');
  return data;
}

import axios from 'axios';

import { LocalStorageKeys } from '@app/config/LocalStorageKeys';
import { delay } from '@app/utils/delay';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.setAuthorization(`Bearer ${accessToken}`);
  }
  return config;
});

httpClient.interceptors.response.use(async (data) => {
  await delay(500);
  return data;
});

export default httpClient;

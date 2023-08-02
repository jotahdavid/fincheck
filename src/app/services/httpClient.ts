import axios from 'axios';

import { LocalStorageKeys } from '../config/LocalStorageKeys';

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

export default httpClient;

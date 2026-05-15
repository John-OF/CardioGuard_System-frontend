import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { storage } from '@/utils/storage';
import { generateUUIDv4 } from '@/utils/uuid';

const HEADER = 'X-Anonymous-User-Id';

function ensureUserId(): string {
  let id = storage.getUserId();
  if (!id) {
    id = generateUUIDv4();
    storage.setUserId(id);
  }
  return id;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inyecta el UUID en cada request
apiClient.interceptors.request.use((config) => {
  const userId = ensureUserId();
  config.headers.set(HEADER, userId);
  return config;
});

// Sincroniza si el backend retorna un UUID distinto
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const returned =
      response.headers[HEADER.toLowerCase()] ??
      response.headers[HEADER];
    if (returned && returned !== storage.getUserId()) {
      storage.setUserId(returned);
    }
    return response;
  },
  (error) => Promise.reject(error)
);
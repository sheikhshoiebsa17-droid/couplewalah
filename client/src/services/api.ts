import { ApiResponse } from '@couplewalah/shared';

const metaEnv = (import.meta as any)?.env || {};
const rawBase = (metaEnv.VITE_API_BASE_URL || metaEnv.VITE_API_URL || '').trim();
const API_BASE = rawBase ? `${rawBase.replace(/\/+$/, '')}/api/v1` : '/api/v1';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('cw_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  let data: any = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = (data && data.message) || response.statusText || 'Request failed';
    throw new ApiError(errorMsg, response.status);
  }

  return (data as ApiResponse<T>).data !== undefined ? (data as ApiResponse<T>).data! : data;
}

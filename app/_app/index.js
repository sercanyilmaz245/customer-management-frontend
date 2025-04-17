"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BASE_URL = 'http://localhost:8081/';

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use((response) => {
  return response
}, (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }

    throw error
})

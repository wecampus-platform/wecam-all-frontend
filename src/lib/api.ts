// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 필요시 쿠키 인증 등
});
console.log('✅ BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('✅ BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('✅ BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
export default api;

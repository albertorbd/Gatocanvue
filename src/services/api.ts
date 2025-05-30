
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import qs from 'qs';

const api = axios.create({
  //baseURL: 'http://localhost:7018/api',
 baseURL: 'https://gatocandealberto-cyfdc3b7dtf4hphg.westeurope-01.azurewebsites.net/api',
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

api.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

export default api

import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 300000,
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})

export async function getRequest(url: string, params?: unknown) {
  const res = await instance.get(url, { params })
  return res.data
}

export async function postRequest(url: string, data: unknown) {
  const res = await instance.post(url, data)
  return res.data
}

export async function deleteRequest(url: string) {
  const res = await instance.delete(url)
  return res.data
}

export async function patch(url: string, data: unknown) {
  const res = await instance.patch(url, data)
  return res.data
}

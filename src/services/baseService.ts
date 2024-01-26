/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

interface IData {
  data: any
  message: string
  status: number
  error: boolean
}

type ResponseData = AxiosResponse<IData>['data']

export class BaseService {
  static instace = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 40000,
  })

  static get(url: string, params: unknown, token?: string): Promise<ResponseData> {
    this.instace.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    })

    return new Promise((resolve, reject) =>
      this.instace
        .get(url, { params })
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    )
  }

  static post(url: string, data: unknown, token?: string): Promise<ResponseData> {
    this.instace.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    })

    return new Promise((resolve, reject) =>
      this.instace
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    )
  }

  static put(url: string, data: unknown, token: string) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`

        return config
      }
    })

    return new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    })
  }

  static delete(url: string, token: string) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`

        return config
      }
    })

    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    })
  }

  static patch(url: string, data: unknown, token: string) {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`

        return config
      }
    })

    return new Promise((resolve, reject) => {
      axios
        .patch(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response) {
            reject({
              message: error.response.data,
              code: error.response.status,
              location: error.config.url,
            })
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }

          reject(error.config)
        })
    })
  }
}

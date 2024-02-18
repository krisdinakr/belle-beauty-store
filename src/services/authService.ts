/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApi } from '@/constants'
import { postRequest, getRequest } from './baseService'
import { useToast } from '@/hooks/useToast'

interface IUserPayload {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const authService = {
  signIn: async function (payload: Pick<IUserPayload, 'email' | 'password'>) {
    try {
      const res = await postRequest(AuthApi.SignIn, payload)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      return res.data
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },

  signOut: async function () {
    try {
      const res = await getRequest(AuthApi.SignOut)
      if (res.error) {
        useToast.error({
          description: 'There was a problem with your request.',
        })
        return
      }

      return res
    } catch (error) {
      useToast.error({
        description: `${error}`,
      })
    }
  },

  signUp: async function (payload: IUserPayload) {
    try {
      const res = await postRequest(AuthApi.SignUp, payload)
      if (res.error) {
        useToast.error({
          description: 'There was a problem with your request.',
        })
        return
      }

      useToast.success({
        description: 'Account create successfully',
      })
      return res.data
    } catch (error) {
      useToast.error({
        description: `${error}`,
      })
    }
  },
}

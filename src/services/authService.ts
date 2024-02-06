/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthApi } from '@/constants'
import { postRequest, getRequest } from './baseService'
import { toast } from '@/components/ui/use-toast'

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
      if (res.status !== 200) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
        return
      }
      return res.data
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },

  signOut: async function () {
    try {
      const res = await getRequest(AuthApi.SignOut)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
      } else {
        return res
      }
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}`,
      })
    }
  },

  signUp: async function (payload: IUserPayload) {
    try {
      const res = await postRequest(AuthApi.SignUp, payload)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
      } else {
        toast({
          title: 'Success!',
          description: 'Account create successfully',
        })
      }
      return res.data
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
      })
    }
  },
}

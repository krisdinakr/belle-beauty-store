/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserApi } from '@/constants'
import { getRequest } from './baseService'
import { toast } from '@/components/ui/use-toast'

export const userService = {
  getProfile: async function () {
    try {
      const res = await getRequest(UserApi.Me)
      if (res.error) {
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
}

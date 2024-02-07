/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserApi } from '@/constants'
import { getRequest, postRequest } from './baseService'
import { toast } from '@/components/ui/use-toast'
import { ICartPaylod } from '@/types/Cart'

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

  updateCart: async function (data: ICartPaylod) {
    try {
      const res = await postRequest(UserApi.Cart, data)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
      } else {
        toast({
          className: 'bg-green-200',
          title: 'Success!',
          description: 'Product successfully added to cart.',
        })
      }
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },
}

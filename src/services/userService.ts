/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserApi } from '@/constants'
import { deleteRequest, getRequest, postRequest } from './baseService'
import { toast } from '@/components/ui/use-toast'
import { ICartPayload } from '@/types/Cart'

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

  updateCart: async function (data: ICartPayload) {
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
          description: 'Successfully added products to cart.',
        })
        return res
      }
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },

  deleteOneCart: async (idCart: string) => {
    try {
      const res = await deleteRequest(`${UserApi.Cart}/${idCart}`)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
      } else {
        toast({
          className: 'bg-green-200',
          title: 'Success!',
          description: 'Product successfully deleted from cart.',
        })
        return res
      }
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },

  deleteAllCart: async () => {
    try {
      const res = await deleteRequest(UserApi.Cart)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
      } else {
        toast({
          className: 'bg-green-200',
          title: 'Success!',
          description: 'Successfully deleted products from cart.',
        })
        return res
      }
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },
}

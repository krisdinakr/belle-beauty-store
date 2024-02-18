/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserApi } from '@/constants'
import { deleteRequest, getRequest, postRequest } from './baseService'
import { ICartPayload } from '@/types/Cart'
import { useToast } from '@/hooks/useToast'

export const userService = {
  getProfile: async function () {
    try {
      const res = await getRequest(UserApi.Me)
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

  updateCart: async function (data: ICartPayload) {
    try {
      const res = await postRequest(UserApi.Cart, data)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      useToast.success({
        description: 'Successfully added products to cart.',
      })
      return res
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },

  deleteOneCart: async (idCart: string) => {
    try {
      const res = await deleteRequest(`${UserApi.Cart}/${idCart}`)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      useToast.success({
        description: 'Product successfully deleted from cart.',
      })
      return res
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },

  deleteAllCart: async () => {
    try {
      const res = await deleteRequest(UserApi.Cart)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      useToast.success({
        description: 'Successfully deleted products from cart.',
      })
      return res
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },
}

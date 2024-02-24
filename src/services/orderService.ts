/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from '@/hooks/useToast'
import { IOrderPayload } from '@/types/Order'
import { postRequest } from './baseService'
import { OrderApi } from '@/constants'

export const orderService = {
  createOrder: async (data: IOrderPayload) => {
    try {
      const res = await postRequest(OrderApi.order, data)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }
      return res
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },
}

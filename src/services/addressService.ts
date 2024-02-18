/* eslint-disable @typescript-eslint/no-explicit-any */
import { postRequest } from './baseService'
import { UserApi } from '@/constants'
import { useToast } from '@/hooks/useToast'
import { IAddressPayload } from '@/types/Address'

export const addressService = {
  setDefault: async (data: Pick<IAddressPayload, 'id' | 'action' | 'isDefault'>) => {
    try {
      const res = await postRequest(UserApi.Address, data)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      useToast.success({
        description: 'Address successfully updated.',
      })
      return
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },

  deleteAddress: async (data: Pick<IAddressPayload, 'id' | 'action' | 'isDeleted'>) => {
    try {
      const res = await postRequest(UserApi.Address, data)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      useToast.success({
        description: 'Address successfully deleted.',
      })
      return
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },

  updateAddress: async (data: IAddressPayload) => {
    try {
      const res = await postRequest(UserApi.Address, data)
      if (res.error) {
        useToast.error({
          description: res.message,
        })
        return
      }

      useToast.success({
        description: `Address successfully ${data.action === 'add' ? 'created.' : 'updated'}`,
      })
      return res
    } catch (error: any) {
      useToast.error({
        description: error.message || error.response?.data?.message,
      })
    }
  },
}

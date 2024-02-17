/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast'
import { postRequest } from './baseService'
import { UserApi } from '@/constants'
import { IAddressPayload } from '@/types/Address'

export const addressService = {
  setDefault: async (data: Pick<IAddressPayload, 'id' | 'action' | 'isDefault'>) => {
    try {
      const res = await postRequest(UserApi.Address, data)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
        return
      }
      toast({
        title: 'Success',
        description: 'Address successfully updated.',
      })
      return
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },

  deleteAddress: async (data: Pick<IAddressPayload, 'id' | 'action' | 'isDeleted'>) => {
    try {
      const res = await postRequest(UserApi.Address, data)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
        return
      }
      toast({
        title: 'Success',
        description: 'Address successfully deleted.',
      })
      return
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },

  updateAddress: async (data: IAddressPayload) => {
    try {
      const res = await postRequest(UserApi.Address, data)
      if (res.error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        })
        return
      }
      toast({
        title: 'Success',
        description: `Address successfully ${data.action === 'add' ? 'created.' : 'updated'}`,
      })
      return res
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || error.response?.data?.message,
      })
    }
  },
}

import { UserApi } from '@/constants'
import { getRequest } from './baseService'
import { toast } from '@/components/ui/use-toast'

export const userService = {
  getProfile: async function () {
    const res = await getRequest(UserApi.Me)

    toast({
      className: 'bg-green-200',
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2023 at 5:57 PM',
    })

    return res.data
  },
}

import { UserApi } from '@/constants'
import { BaseService } from '.'
import { toast } from '@/components/ui/use-toast'

export const userService = {
  getProfile: async function (params, token: string) {
    const res = await BaseService.get(UserApi.Me, params, token)

    toast({
      className: 'bg-green-200',
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2023 at 5:57 PM',
    })

    return res.data
  },
}

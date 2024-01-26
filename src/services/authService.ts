import { AuthApi } from '@/constants'
import { BaseService } from '.'

export const authService = {
  login: async function (payload: unknown) {
    try {
      const res = await BaseService.post(AuthApi.SignIn, payload)
      console.log('res auth', res)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
}

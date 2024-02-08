import { ICombination, IProductItemProps } from './Products'
import { IUser } from './User'

export interface ICart {
  _id: string
  user: IUser
  product: IProductItemProps
  combination: ICombination
  quantity: number
}

export interface ICartPayload {
  action: 'add' | 'update'
  id?: string
  product?: string
  combination: string
  quantity: number
}

import { IAddress } from './Address'
import { ICombination, IProductItemProps } from './Products'

export enum OrderState {
  Pending = 'pending',
  OrderConfirmed = 'order_confirmed',
  Failed = 'failed',
  AwaitingShipment = 'awaiting_shipment',
  Shipped = 'shipped',
  Completed = 'completed',
}

export interface IOrderItem {
  product: IProductItemProps
  combinations: ICombination
  quantity: number
  price: number
}

export interface IOrder {
  _id: string
  products: IOrderItem[]
  totalPrice: number
  shipping: Pick<IAddress, '_id' | 'city' | 'country' | 'district' | 'province' | 'street'>
  deliveredDate: number
  state: OrderState
  referenceCode: string
  createdAt: string
}

export interface IOrderPayload {
  cartId: string[]
  totalPrice: number
}

export interface IAddress {
  _id: string
  city: string
  country: string
  district: string
  isDefault: boolean
  isDeleted: boolean
  name: string
  phone: string
  postalCode: string
  province: string
  street: string
  recipientName: string
}

export interface IAddressPayload extends Omit<IAddress, '_id'> {
  action: 'add' | 'update' | 'delete'
  id?: string
}

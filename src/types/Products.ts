import { IBrand } from './Brand'
import { ICategory } from './Category'

interface IAttributes {
  [key: string]: {
    value: string
    name: string
  }
}

export interface IImage {
  isCover: boolean
  url: string
}

interface ICombination {
  _id: string
  attributes: IAttributes
  images: IImage[]
  price: number
  stock: number
  __v?: number
  createdAt?: string
  updatedAt?: string
}

export interface IProductItemProps {
  _id: string
  brand: IBrand
  categories: ICategory[]
  combinations: ICombination[]
  description: string
  defaultCategory: ICategory
  howToUse: string
  ingredients: string
  images: IImage[]
  name: string
  parentCategory: ICategory
  slug: string
  createdAt?: string
  updatedAt?: string
}

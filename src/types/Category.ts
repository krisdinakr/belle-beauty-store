export interface ICategory {
  _id: string
  name: string
  slug: string
  parents: ICategory[]
  __v?: number
}

export interface ICategoryWithChildren extends Pick<ICategory, '_id' | 'name' | 'slug'> {
  children: ICategoryWithChildren[]
}

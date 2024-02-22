export enum AuthApi {
  SignUp = '/auth/sign-up',
  SignIn = '/auth/sign-in',
  SignOut = '/auth/sign-out',
}

export enum UserApi {
  Me = '/me',
  Profile = '/me/profile',
  Cart = '/users/me/carts',
  Address = '/users/me/address',
}

export enum CollectionsApi {
  collections = '/collections',
}

export enum CategoryApi {
  category = '/categories',
  childrenCategory = '/categories/children',
  distinctBrand = '/categories/distinct/products',
}

export enum BrandApi {
  brand = '/brands',
}

export enum SearchApi {
  search = '/search',
}

export enum ProductApi {
  product = '/products',
}

export enum OrderApi {
  order = '/orders',
}

import { ReactNode, createContext, useMemo } from 'react'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import { BrandApi, CategoryApi } from '@/constants'
import { ICategoryWithChildren } from '@/types/Category'
import { IBrand } from '@/types/Brand'

interface INavigationProviderProps {
  children: ReactNode
}

interface INavigationContext {
  categories: ICategoryWithChildren | null
  brands: IBrand[] | null
}

export const NavigationContext = createContext<INavigationContext>({
  categories: null,
  brands: null,
})

export const NavigationProvider = ({ children }: INavigationProviderProps) => {
  const filter = JSON.stringify({ name: 'Shop By Category' })
  const { data: resCategory } = useSWR(
    CategoryApi.childrenCategory,
    (url) => getRequest(url, { filter }),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  )

  const { data: resBrand } = useSWR(BrandApi.brand, getRequest, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  })

  const dataCategory = useMemo(() => {
    if (!resCategory?.error && resCategory?.data) {
      return resCategory.data
    }
    return null
  }, [resCategory])

  const dataBrand = useMemo(() => {
    if (!resBrand?.error && resBrand?.data && Array.isArray(resBrand.data)) {
      return resBrand.data
    }
    return null
  }, [resBrand])

  const navigationData = {
    categories: dataCategory,
    brands: dataBrand,
  }

  return <NavigationContext.Provider value={navigationData}>{children}</NavigationContext.Provider>
}

import { ReactNode, createContext, useMemo } from 'react'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import { CategoryApi } from '@/constants'
import { ICategoryWithChildren } from '@/types/Category'

interface ICategoryProviderProps {
  children: ReactNode
}

export const CategoryContext = createContext<ICategoryWithChildren | null>(null)

export const CategoryProvider = ({ children }: ICategoryProviderProps) => {
  const filter = JSON.stringify({ name: 'Shop By Category' })
  const { data } = useSWR(CategoryApi.childrenCategory, (url) => getRequest(url, { filter }), {
    revalidateOnFocus: false,
    refreshInterval: 0,
  })

  const dataCategory = useMemo(() => {
    if (!data?.error && data?.data) {
      return data.data
    }
    return []
  }, [data])

  return <CategoryContext.Provider value={dataCategory}>{children}</CategoryContext.Provider>
}

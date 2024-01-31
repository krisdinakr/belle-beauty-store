import { useMemo } from 'react'
import useSWR from 'swr'

import ProductItem from './ProductItem'
import { CollectionsApi } from '@/constants'
import { getRequest } from '@/services/baseService'
import { IProductItemProps } from '@/types/Products'
import JustDroppedSkeleton from './skeleton/JustDroppedSkeleton'

function JustDropped() {
  const { data, isLoading } = useSWR(CollectionsApi.collections, getRequest, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  })

  const featuredData: IProductItemProps[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data?.data)) {
      return data?.data
    }
    return []
  }, [data])

  if (isLoading) return <JustDroppedSkeleton />

  return (
    <section className="h-auto min-h-[23rem] w-full space-y-8 overflow-hidden p-5 sm:min-h-[28rem] lg:px-20 lg:py-[70px]">
      <h2 className="text-2xl font-bold text-sherpa-blue sm:text-3xl">Just Dropped</h2>
      <div className="block">
        <div className="w-full">
          <div className="scroll no-scrollbar flex snap-x flex-nowrap gap-2.5 overflow-auto scroll-smooth">
            {featuredData.map((i) => (
              <ul
                className="relative w-full snap-center"
                key={i._id}
              >
                <div className="h-[23rem] w-56 sm:h-[28rem] sm:w-[20.5rem]">
                  <ProductItem data={i} />
                </div>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JustDropped

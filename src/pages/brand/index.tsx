import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import ProductList from '@/components/ProductList'
import ProductListSkeleton from '@/components/skeleton/ProductListSkeleton'
import BrandBanner from '@/components/BrandBanner'
import SidebarSkeleton from '@/components/skeleton/SidebarSkeleton'
import Sidebar from '@/components/Sidebar'
import { IBrand } from '@/types/Brand'
import { IProductItemProps } from '@/types/Products'
import { ICategoryWithChildren } from '@/types/Category'
import { BrandApi, CategoryApi, SearchApi } from '@/constants'

function Brand() {
  const { slug } = useParams()
  const encodeSlug = useMemo(() => {
    return encodeURIComponent(String(slug))
  }, [slug])
  const [filter, setFilter] = useState<{ [key: string]: string }>({ brand: encodeSlug })

  useEffect(() => {
    setFilter({ brand: encodeSlug })
  }, [encodeSlug])

  const { data: categories, isLoading: isLoadingCategories } = useSWR(
    `${CategoryApi.distinctBrand}?brand=${encodeSlug}`,
    getRequest
  )

  const { data: detailBrand, isLoading: isLoadingDetailBrand } = useSWR(
    `${BrandApi.brand}/${encodeSlug}`,
    getRequest
  )

  const { data, isLoading } = useSWR(
    `${SearchApi.search}?filter=${JSON.stringify(filter)}`,
    getRequest
  )

  const productData: IProductItemProps[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data?.data)) {
      return data.data
    }
    return []
  }, [data])

  const brand: IBrand = useMemo(() => {
    if (!detailBrand?.error && detailBrand?.data) {
      return detailBrand.data
    }
    return null
  }, [detailBrand])

  const categoryData: ICategoryWithChildren | null = useMemo(() => {
    if (!categories?.error && categories?.data && Array.isArray(categories.data)) {
      return { _id: '1', name: 'All Products', slug: '', children: categories.data }
    }
    return null
  }, [categories])

  const handleChangeRoute = (menu: string) =>
    setFilter({ brand: encodeSlug, category: encodeURIComponent(menu) })

  return (
    <section className="min-h-screen overflow-hidden p-5 sm:px-20 sm:py-5">
      {isLoadingDetailBrand ? <p>loading</p> : <BrandBanner data={brand} />}

      <div className="relative block py-2">
        <div className="mx-auto my-0 flex w-full gap-12">
          <div className="hidden w-2/12 min-w-40 sm:block">
            {isLoadingCategories ? (
              <SidebarSkeleton />
            ) : (
              <Sidebar
                data={categoryData!}
                handleChangeRoute={handleChangeRoute}
              />
            )}
          </div>

          <div className="w-full sm:w-10/12">
            {isLoading ? <ProductListSkeleton /> : <ProductList products={productData} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brand

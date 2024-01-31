import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import { CategoryContext } from '@/context/CategoryContext'
import { CategoryApi, SearchApi } from '@/constants'
import { IProductItemProps } from '@/types/Products'

import BreadCrumbs from '@/components/BreadCrumbs'
import SideBar from '@/components/SideBar'
import SidebarSkeleton from '@/components/skeleton/SidebarSkeleton'
import ProductList from '@/components/ProductList'
import ProductListSkeleton from '@/components/skeleton/ProductListSkeleton'
import { ICategoryWithChildren } from '@/types/Category'

function Category() {
  const categories = useContext(CategoryContext)
  const { slug } = useParams()

  const { data: detailCategory, isLoading: isLoadingCategory } = useSWR(
    () => `${CategoryApi.category}?slug=${slug}`,
    getRequest
  )

  const { data, isLoading } = useSWR(SearchApi.search, (url) =>
    getRequest(url, { filter: JSON.stringify({ category: slug }) })
  )

  const productData: IProductItemProps[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data?.data)) {
      return data?.data
    }
    return []
  }, [data])

  const selectedCategory: ICategoryWithChildren | undefined = useMemo(() => {
    if (!detailCategory?.error && detailCategory?.data && Array.isArray(detailCategory.data)) {
      if (detailCategory.data[0].parents.length === 1) {
        return categories?.children?.find((i) => i._id === detailCategory.data[0]._id)
      }
      return categories?.children?.find((i) => i._id === detailCategory.data[0].parents[1]._id)
    }
  }, [detailCategory, categories])

  const breadCrumbsData = useMemo(() => {
    if (detailCategory?.data && detailCategory?.data && Array.isArray(detailCategory?.data)) {
      return detailCategory?.data[0]
    }
    return []
  }, [detailCategory])

  return (
    <section className="min-h-screen overflow-hidden p-5 sm:px-20 sm:py-5">
      <div className="pb-5 pt-2.5">
        {!isLoadingCategory && <BreadCrumbs data={breadCrumbsData} />}
      </div>

      <div className="relative block py-2">
        <div className="mx-auto my-0 flex w-full gap-12">
          <div className="hidden w-2/12 min-w-40 sm:block">
            {selectedCategory ? (
              <SideBar
                data={selectedCategory}
                activeMenu={breadCrumbsData}
              />
            ) : (
              <SidebarSkeleton />
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

export default Category

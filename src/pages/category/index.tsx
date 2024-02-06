import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import { useNavigationContext } from '@/hooks/useNavigation'
import BreadCrumbs from '@/components/BreadCrumbs'
import SidebarSkeleton from '@/components/skeleton/SidebarSkeleton'
import Sidebar from '@/components/Sidebar'
import ProductList from '@/components/ProductList'
import ProductListSkeleton from '@/components/skeleton/ProductListSkeleton'
import { CategoryApi, SearchApi } from '@/constants'
import { IProductItemProps } from '@/types/Products'
import { ICategory, ICategoryWithChildren } from '@/types/Category'

function Category() {
  const { categories } = useNavigationContext()
  const navigate = useNavigate()
  const { slug } = useParams()
  const encodeSlug = useMemo(() => {
    if (slug) return encodeURIComponent(String(slug))
  }, [slug])
  const filter = JSON.stringify({ category: encodeSlug })

  const { data: detailCategory, isLoading: isLoadingCategory } = useSWR(
    `${CategoryApi.category}?slug=${encodeSlug}`,
    getRequest
  )

  const { data, isLoading } = useSWR(`${SearchApi.search}?filter=${filter}`, getRequest)

  const productData: IProductItemProps[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data?.data)) {
      return data?.data
    }
    return []
  }, [data])

  const selectedCategory: ICategoryWithChildren | undefined = useMemo(() => {
    if (
      !detailCategory?.error &&
      detailCategory?.data &&
      Array.isArray(detailCategory.data) &&
      detailCategory.data[0]
    ) {
      if (detailCategory.data[0].parents.length === 1) {
        return categories?.children?.find((i) => i._id === detailCategory.data[0]._id)
      }
      return categories?.children?.find((i) => i._id === detailCategory.data[0].parents[1]._id)
    }
  }, [detailCategory, categories])

  const breadCrumbsData = useMemo(() => {
    if (detailCategory?.data && detailCategory?.data && Array.isArray(detailCategory?.data)) {
      const data: ICategory = detailCategory?.data[0]
      return [...data.parents, data]
    }
    return []
  }, [detailCategory])

  const handleChangeRoute = (url: string) => navigate(`/category/${url}`)

  return (
    <section className="min-h-screen overflow-hidden p-5 sm:px-20 sm:py-5">
      <div className="pb-5 pt-2.5">
        {!isLoadingCategory && <BreadCrumbs data={breadCrumbsData} />}
      </div>

      <div className="relative block py-2">
        <div className="mx-auto my-0 flex w-full gap-12">
          <div className="hidden w-2/12 min-w-40 sm:block">
            {selectedCategory ? (
              <Sidebar
                data={selectedCategory}
                handleChangeRoute={handleChangeRoute}
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

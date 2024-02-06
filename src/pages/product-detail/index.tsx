import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import { ProductApi } from '@/constants'
import { IProductItemProps } from '@/types/Products'
import ProductImageSlider from '@/components/ProductImageSlider'
import BreadCrumbs from '@/components/BreadCrumbs'
import ProductInfo from '@/components/ProductInfo'

function ProductDetail() {
  const { slug } = useParams()
  const encodeSlug = useMemo(() => {
    if (slug) return encodeURIComponent(String(slug))
  }, [slug])

  const { data: resProduct, isLoading: isLoadingProduct } = useSWR(
    `${ProductApi.product}/${encodeSlug}`,
    getRequest
  )

  const detailProduct: IProductItemProps = useMemo(() => {
    if (!resProduct?.error && resProduct?.data) {
      return resProduct.data
    }
    return null
  }, [resProduct])

  const breadCrumbsData = useMemo(() => {
    if (detailProduct) {
      return [
        ...detailProduct.categories,
        { _id: detailProduct._id, name: detailProduct.name, slug: detailProduct.slug, parents: [] },
      ]
    }
    return []
  }, [detailProduct])

  if (isLoadingProduct) {
    return <p>loading</p>
  }

  return (
    <section className="mx-auto min-h-screen w-full overflow-hidden p-5 sm:py-5 lg:w-10/12">
      <div className="pb-5 pt-2.5">{breadCrumbsData && <BreadCrumbs data={breadCrumbsData} />}</div>

      <div className="mt-10 flex w-full flex-col gap-20 pb-5 lg:flex-row">
        <ProductImageSlider images={detailProduct.images} />

        <ProductInfo product={detailProduct} />
      </div>
    </section>
  )
}

export default ProductDetail

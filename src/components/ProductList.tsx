import ProductItem from '@/components/ProductItem'
import { IProductItemProps } from '@/types/Products'
import { PackageSearchIcon } from 'lucide-react'

function ProductList({ products }: { products: IProductItemProps[] }) {
  return (
    <section className="flex w-full flex-wrap items-center justify-start gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-20">
      {products &&
        products.length > 0 &&
        products.map((product) => (
          <div
            className="w-[11rem] lg:w-[15rem]"
            key={product._id}
          >
            <ProductItem data={product} />
          </div>
        ))}
      {products && products.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-2.5 p-2">
          <PackageSearchIcon className="h-32 w-32 stroke-[0.5px] text-black-pearl" />
          <p className="capitalize">no products found.</p>
        </div>
      )}
    </section>
  )
}

export default ProductList

import ProductItem from '@/components/ProductItem'
import { IProductItemProps } from '@/types/Products'

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
      {products && products.length === 0 && <p>no products</p>}
    </section>
  )
}

export default ProductList

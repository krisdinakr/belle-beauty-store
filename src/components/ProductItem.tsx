import { Link } from 'react-router-dom'
import { IProductItemProps } from '@/types/Products'
import { formatCurrency } from '@/utils'

function ProductItem({
  data: { brand, name, combinations, images, slug },
}: {
  data: IProductItemProps
}) {
  const imgCover = images.filter((i) => i.isCover)[0]
  const defaultCombination = combinations[0]

  return (
    <Link
      to={`/product/${encodeURI(slug)}`}
      className="relative h-full w-full"
    >
      <div className="rounded p-2 hover:shadow">
        <div className="h-[78%] max-h-[23rem] min-h-[208px] w-full max-w-[20.5rem] lg:min-h-[312px]">
          <img
            src={imgCover?.url}
            alt="product"
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex h-[22%] w-full flex-col pt-2">
          <h2 className="truncate font-bold sm:text-xl">{brand.name}</h2>
          <h3 className="truncate font-open-sans sm:text-xl">{name}</h3>
          <p className="font-semibold sm:text-xl">{formatCurrency(defaultCombination?.price)}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem

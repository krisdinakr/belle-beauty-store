import { IProductItemProps } from '@/types/Products'

function ProductItem({ data: { brand, name, combinations, images } }: { data: IProductItemProps }) {
  const imgCover = images.filter((i) => i.isCover)[0]

  return (
    <div className="relative h-[23rem] w-56 sm:h-[28rem] sm:w-[20.5rem]">
      <div className="h-[78%] w-full ">
        <img
          src={imgCover.url}
          alt="product"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex h-[22%] w-full flex-col pt-2">
        <h2 className="font-bold sm:text-xl">{brand.name}</h2>
        <h3 className="truncate font-open-sans sm:text-xl">{name}</h3>
        <p className="font-semibold sm:text-xl">{combinations[0].price}</p>
      </div>
    </div>
  )
}

export default ProductItem

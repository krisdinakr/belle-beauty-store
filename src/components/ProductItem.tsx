import Image from '@/assets/images/hero-1.png'

interface IProductItemProps {
  brandName: string
  productName: string
  price: number
}

function ProductItem({ brandName, productName, price }: IProductItemProps) {
  return (
    <div className="relative h-[23rem] w-56 sm:h-[28rem] sm:w-[20.5rem]">
      <div className="h-[78%] w-full ">
        <img
          src={Image}
          alt="product"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex h-[22%] w-full flex-col pt-2">
        <h2 className="font-bold sm:text-xl">{brandName}</h2>
        <h3 className="font-open-sans sm:text-xl">{productName}</h3>
        <p className="font-semibold sm:text-xl">{price}</p>
      </div>
    </div>
  )
}

export default ProductItem

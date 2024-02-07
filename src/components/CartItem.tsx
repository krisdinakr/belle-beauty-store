import { ICart } from '@/types/Cart'
import { formatCurrency } from '@/utils'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

function CartItem({ data }: { data: ICart }) {
  const image = useMemo(() => {
    if (data.product.images && Array.isArray(data.product.images)) {
      const image = data.product.images.find((i) => i.isCover)
      return image ? image.url : ''
    }
    return ''
  }, [data])
  const combination = useMemo(() => {
    if (data.combination.attributes) {
      const keys = Object.keys(data.combination.attributes)
      const variant = ''
      keys.forEach((i) => {
        variant.concat(`${i}: ${data.combination.attributes[i].name} \n`)
      })
      return variant
    }
  }, [data])

  return (
    <div className="group relative px-5">
      <div className="flex w-full items-start gap-2 border-b py-4 group-last:border-none">
        <div>
          <input
            type="checkbox"
            name={data._id}
            id={data._id}
            className="h-4 w-4 cursor-pointer"
          />
        </div>

        <div className="h-20 w-20">
          <picture>
            <img
              src={image}
              alt={data.product.name}
              className="h-full w-full object-cover object-center"
            />
          </picture>
        </div>

        <div className="w-[calc(100%-96px)]">
          <h3 className="text-sm font-semibold capitalize">{data.product.brand.name}</h3>
          <h4 className="capitalize">{data.product.name}</h4>
          <p className="text-xs capitalize text-gray-400">{combination}</p>

          <div className="mt-3.5 flex w-full items-center justify-between">
            <p className="text-sm font-semibold">{formatCurrency(data.combination.price)}</p>
            <div className="flex items-center gap-5">
              <Trash2Icon className="w-5 cursor-pointer text-gray-400" />
              <div className="flex items-center gap-4">
                <button className="h-[30px] w-[30px] rounded border border-black-pearl text-center ">
                  <MinusIcon className="mx-auto w-4" />
                </button>
                <span className="select-none">2</span>
                <button className="h-[30px] w-[30px] rounded bg-sherpa-blue text-center text-white">
                  <PlusIcon className="mx-auto w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem

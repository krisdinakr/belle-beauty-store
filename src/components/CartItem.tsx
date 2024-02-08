import { useEffect, useMemo, useRef, useState } from 'react'
import { KeyedMutator } from 'swr'
import clsx from 'clsx'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'

import { ICart, ICartPayload } from '@/types/Cart'
import { formatCurrency } from '@/utils'
import { useDebounce } from '@/hooks/useDebounce'
import { userService } from '@/services'

function CartItem({
  data,
  refreshData,
  handleCheckedOneCart,
  selectedCart,
}: {
  data: ICart
  refreshData: KeyedMutator<undefined>
  handleCheckedOneCart: (checked: boolean, cart: ICart) => void
  selectedCart: ICart[]
}) {
  const didMount = useRef(true)
  const [quantity, setQuantity] = useState<number>(data.quantity)
  const debouncedQuantity = useDebounce(quantity, 100)

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false
      return
    }

    const payload: ICartPayload = {
      action: 'update',
      id: data._id,
      combination: data.combination._id,
      quantity: debouncedQuantity,
    }

    const updateCart = async () => {
      const res = await userService.updateCart(payload)
      if (!res.error) refreshData()
    }

    updateCart()
  }, [data._id, data.combination._id, debouncedQuantity, refreshData])

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

  const handleDeleteCart = async () => {
    const res = await userService.deleteOneCart(data._id)
    if (res) refreshData()
  }

  const handlePlusQuantity = async () => {
    if (data.combination.stock > debouncedQuantity) {
      setQuantity((q) => q + 1)
    }
  }

  const handleMinusQuantity = () => {
    if (debouncedQuantity > 1) setQuantity((q) => q - 1)
  }

  return (
    <div className="group relative px-5">
      <div className="flex w-full items-start gap-2 border-b py-4 group-last:border-none">
        <div>
          <input
            type="checkbox"
            name={data._id}
            id={data._id}
            className="h-4 w-4 cursor-pointer"
            onChange={(e) => handleCheckedOneCart(e.target.checked, data)}
            checked={!!selectedCart.find((i) => i._id === data._id)}
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
              <button onClick={handleDeleteCart}>
                <Trash2Icon className="w-5 text-gray-400" />
              </button>
              <div className="flex items-center gap-2.5">
                <button
                  className={clsx(
                    'h-[30px] w-[30px] rounded border border-black-pearl text-center',
                    debouncedQuantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  )}
                  onClick={handleMinusQuantity}
                >
                  <MinusIcon className="mx-auto w-4" />
                </button>
                <span className="w-8 select-none text-center">{debouncedQuantity}</span>
                <button
                  className={clsx(
                    'h-[30px] w-[30px] rounded bg-sherpa-blue text-center text-white',
                    data.combination.stock > debouncedQuantity
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-50'
                  )}
                  onClick={handlePlusQuantity}
                >
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

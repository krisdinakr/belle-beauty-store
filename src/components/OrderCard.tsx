import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import clsx from 'clsx'

import { ChevronDownIcon, ChevronUpIcon, RotateCcwIcon, ShoppingBagIcon } from 'lucide-react'
import { formatCurrency } from '@/utils'
import { Button } from '@/components/ui/button'
import { IOrder, OrderState } from '@/types/Order'
import { IAttributes, IImage } from '@/types/Products'

function OrderCard({ order }: { order: IOrder }) {
  const [dropdown, setDropdown] = useState<boolean>(false)

  const getCoverImg = (images: IImage[]) => {
    const cover = images.filter((img) => img.isCover)
    if (cover && cover[0] && cover[0].url) return cover[0].url
    return ''
  }

  const getCombination = (attributes: IAttributes) => {
    const result: string[] = []
    const keys = Object.keys(attributes)
    keys.forEach((key) => {
      if (key !== 'non_specify') {
        result.push(`${key}: ${attributes[key].name}`)
      }
    })
    return result.join(', ')
  }

  const stateStyle = (state: string) => {
    switch (state) {
      case OrderState.Pending:
        return 'bg-gray-800'
      case OrderState.OrderConfirmed:
        return 'bg-orange-300'
      case OrderState.Failed:
        return 'bg-red-300'
      case OrderState.AwaitingShipment:
        return 'bg-indigo-400'
      case OrderState.Shipped:
        return 'bg-sky-400'
      case OrderState.Completed:
        return 'bg-green-500'
      default:
        return 'bg-black'
    }
  }

  return (
    <div className="relative w-full rounded bg-white p-4 shadow">
      <div className="flex w-full border-b pb-4 pt-3">
        <div className="flex w-full justify-between">
          <div className="space-y-1.5 text-sm">
            <div>
              <p className="inline-block font-semibold uppercase">{order.referenceCode}</p>{' '}
              <span className="inline-block font-normal text-gray-400">
                - {format(order.createdAt, 'PPP')}
              </span>
            </div>
            <p className="font-semibold">Total Price: {formatCurrency(order.totalPrice)}</p>
          </div>

          <div className="flex select-none flex-col items-end space-y-1.5 text-sm font-medium tracking-wide">
            <div className="flex w-fit items-center gap-1.5 rounded-full bg-slate-200 px-2.5 py-0.5 text-xs">
              <div className={clsx('h-2.5 w-2.5 rounded-full', stateStyle(order.state))} />
              <p className="uppercase">{order.state?.split('_').join(' ')}</p>
            </div>
            <div className="flex items-center gap-0.5">
              <ShoppingBagIcon className="h-4" />
              <p>{order.products.length} items purchased</p>
            </div>
          </div>
        </div>
      </div>

      {/* detail item */}
      {order.products.map((i, index) => (
        <div
          className={clsx(
            'w-full items-start gap-2 py-4',
            index > 0 ? (dropdown ? 'flex' : 'hidden') : 'flex'
          )}
          key={i.product._id}
        >
          <Link to={i.product.slug}>
            <div className="h-20 w-20">
              <picture>
                <img
                  src={getCoverImg(i.product.images)}
                  alt={i.product.name}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </picture>
            </div>
          </Link>
          <Link to={i.product.slug}>
            <div className="w-fit">
              <h3 className="truncate text-sm font-semibold capitalize">{i.product.brand.name}</h3>
              <h4 className="truncate capitalize">{i.product.name}</h4>
              <p className="text-sm capitalize text-gray-500">
                {getCombination(i.combinations.attributes)}
              </p>
              <p className="text-sm text-gray-500">{i.quantity} Pc</p>
              <p className="text-sm font-semibold text-sherpa-blue">
                {formatCurrency(i.combinations.price)}
              </p>
            </div>
          </Link>
        </div>
      ))}

      {order.products.length > 1 && (
        <>
          <div
            className={clsx(
              'cursor-pointer select-none items-center gap-0.5 text-xs font-semibold uppercase text-sherpa-blue',
              dropdown ? 'hidden' : 'flex'
            )}
            onClick={() => setDropdown(true)}
          >
            <p>See more products</p>
            <ChevronDownIcon className="h-5" />
          </div>

          <div
            className={clsx(
              'cursor-pointer select-none items-center gap-0.5 text-xs font-semibold uppercase text-sherpa-blue',
              dropdown ? 'flex' : 'hidden'
            )}
            onClick={() => setDropdown(false)}
          >
            <p>close more products</p>
            <ChevronUpIcon className="h-5" />
          </div>
        </>
      )}

      <div className="mt-2.5 border-t pt-4 text-right">
        <Button className="w-fit gap-0.5 rounded border border-sherpa-blue bg-white text-xs uppercase text-black-pearl hover:bg-twilight-blue/50">
          <RotateCcwIcon className="h-5" />
          Reorder
        </Button>
      </div>
    </div>
  )
}

export default OrderCard

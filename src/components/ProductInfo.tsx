import { useMemo, useState } from 'react'
import clsx from 'clsx'

import { ICombination, IProductItemProps } from '@/types/Products'
import { formatCurrency } from '@/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'
import ShadeAttribute from './ShadeAttribute'
import SizeAttribute from './SizeAttribute'
import ProductInfoTab from './ProductInfoTab'
import { Button } from './ui/button'

function ProductInfo({ product }: { product: IProductItemProps }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedAttribute, setSelectedAttribute] = useState<ICombination | null>(null)

  const { keyAttributes, valueAttributes } = useMemo(() => {
    if (
      product &&
      product.combinations &&
      product.combinations.length > 0 &&
      product.combinations[0].attributes
    ) {
      const keyAttributes = Object.keys(product.combinations[0].attributes)
      const valueAttributes = Object.values(product.combinations[0].attributes)
      return { keyAttributes, valueAttributes }
    }
    return { keyAttributes: null, valueAttributes: null }
  }, [product])

  const handleIncreaseQuantity = () => {
    const stock = selectedAttribute ? selectedAttribute.stock : product.combinations[0].stock
    if (stock > quantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleSelectAttribute = (attribute: string, value: { [key: string]: string | number }) => {
    const targetAttribute = product.combinations.find(
      (i) => i.attributes[attribute].value === value.value
    )
    if (targetAttribute) {
      setSelectedAttribute(targetAttribute)
      setQuantity(1)
    }
  }

  return (
    <div className="relative w-full">
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold tracking-wide">{product.brand.name}</h3>
        <h2 className="font-open-sans text-3xl font-light tracking-wide">{product.name}</h2>
        <h3 className="text-2xl font-semibold text-sherpa-blue">
          {formatCurrency(product.combinations[0].price)}
        </h3>
      </div>

      {keyAttributes &&
        keyAttributes.map((attribute) => (
          <div key={attribute}>
            {attribute !== 'non_specify' && (
              <div
                className={clsx(
                  'mt-3 flex w-full justify-between gap-20 lg:mt-8 lg:justify-start',
                  attribute === 'size' ? 'items-center' : 'items-start'
                )}
                key={attribute}
              >
                <p className="w-20 text-sm uppercase tracking-wide">{attribute}</p>
                <div className="w-full space-y-3.5">
                  {attribute !== 'size' && (
                    <>
                      {selectedAttribute ? (
                        <span className="text-xs font-semibold">
                          {selectedAttribute.attributes[attribute].name}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold">Select {attribute}:</span>
                      )}
                    </>
                  )}

                  <ul className="flex w-full gap-2.5">
                    {valueAttributes &&
                      valueAttributes.map((value) => (
                        <li
                          className={clsx(
                            'h-10 w-10 cursor-pointer p-1',
                            attribute === 'shade' &&
                              selectedAttribute?.attributes[attribute].name === value.name
                              ? 'rounded-full border border-sherpa-blue'
                              : ''
                          )}
                          key={value.name}
                          onClick={() => handleSelectAttribute(attribute, value)}
                        >
                          {attribute === 'shade' && <ShadeAttribute shade={value} />}
                          {attribute === 'size' && <SizeAttribute size={value} />}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}

      <div className="mt-3 flex w-full items-center justify-between gap-20 lg:mt-8 lg:justify-start">
        <p className="w-20 text-sm uppercase tracking-wide">Quantity</p>
        <div className="flex w-[150px] items-center justify-between rounded-sm border border-slate-300 px-3 py-1">
          <MinusIcon
            className={clsx(
              'w-4',
              quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
            )}
            onClick={handleDecreaseQuantity}
          />
          <p className="select-none">{quantity}</p>
          <PlusIcon
            className={clsx(
              'w-4',
              selectedAttribute?.stock || product.combinations[0].stock > quantity
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            )}
            onClick={handleIncreaseQuantity}
          />
        </div>
      </div>

      <div className="mt-3 flex w-full select-none items-center gap-5 lg:mt-8">
        <Button className="rounded border border-sherpa-blue bg-white uppercase text-black-pearl hover:bg-twilight-blue/50">
          add to cart
        </Button>
        <Button className="rounded bg-sherpa-blue uppercase">buy now</Button>
      </div>

      <div className="mt-10 w-full select-none lg:mt-20">
        <ProductInfoTab
          description={product.description}
          howToUse={product.howToUse}
          ingredients={product.ingredients}
        />
      </div>
    </div>
  )
}

export default ProductInfo

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { IAttributeItem, ICombination, IProductItemProps } from '@/types/Products'
import { formatCurrency } from '@/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'
import ShadeAttribute from './ShadeAttribute'
import SizeAttribute from './SizeAttribute'
import ProductInfoTab from './ProductInfoTab'
import { Button } from './ui/button'
import { ICartPayload } from '@/types/Cart'
import { userService } from '@/services'
import { useAuthContext } from '@/hooks/useAuth'
import VariantAttribute from './VariantAttribute'
import { useToast } from '@/hooks/useToast'

function ProductInfo({ product }: { product: IProductItemProps }) {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedAttribute, setSelectedAttribute] = useState<ICombination | null>(null)

  const { shadeAttribute, sizeAttribute, variantAttribute } = useMemo(() => {
    const shadeAttribute: IAttributeItem[] = []
    const sizeAttribute: IAttributeItem[] = []
    const variantAttribute: IAttributeItem[] = []
    if (product?.combinations && product.combinations.length > 0) {
      product.combinations.forEach((combination) => {
        if (combination.attributes && combination.attributes.shade) {
          if (
            shadeAttribute.length === 0 ||
            (shadeAttribute.length > 1 &&
              shadeAttribute.find((i) => i.name !== combination.attributes.shade.name))
          ) {
            shadeAttribute.push(combination.attributes.shade)
          }
        }
        if (combination.attributes && combination.attributes.size) {
          if (
            sizeAttribute.length === 0 ||
            (sizeAttribute.length > 1 &&
              sizeAttribute.find((i) => i.name !== combination.attributes.size.name))
          ) {
            sizeAttribute.push(combination.attributes.size)
          }
        }
        if (combination.attributes && combination.attributes.variant) {
          variantAttribute.push(combination.attributes.variant)
        }
      })
    }
    return { shadeAttribute, sizeAttribute, variantAttribute }
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

  const handleSelectAttribute = (type: 'shade' | 'size' | 'variant', name: string | number) => {
    const targetAttribute = product.combinations.find((i) => i.attributes[type].name === name)
    if (targetAttribute) {
      setSelectedAttribute(targetAttribute)
      setQuantity(1)
    }
  }

  const handleAddProductToCart = async () => {
    if (!selectedAttribute) {
      useToast.info({
        title: 'Please select product variant!',
      })
    } else if (!auth?.isAuth) {
      useToast.info({
        title: 'Please sign in first.',
      })
      navigate('/sign-in')
    } else {
      const payload: ICartPayload = {
        action: 'add',
        product: product._id,
        combination: selectedAttribute?._id || '',
        quantity,
      }
      await userService.updateCart(payload)
    }
  }

  const handleBuyProduct = () => {
    if (!selectedAttribute) {
      useToast.info({
        title: 'Please select product variant!',
      })
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

      {shadeAttribute && shadeAttribute.length > 0 && (
        <ShadeAttribute
          attributes={shadeAttribute}
          selected={selectedAttribute?.attributes.shade || null}
          handleSelectAttribute={handleSelectAttribute}
        />
      )}

      {sizeAttribute && sizeAttribute.length > 0 && (
        <SizeAttribute
          attributes={sizeAttribute}
          selected={selectedAttribute?.attributes.size || null}
          handleSelectAttribute={handleSelectAttribute}
        />
      )}

      {variantAttribute && variantAttribute.length > 0 && (
        <VariantAttribute
          attributes={variantAttribute}
          selected={selectedAttribute?.attributes.variant || null}
          handleSelectAttribute={handleSelectAttribute}
        />
      )}

      <div className="mt-3 flex w-full items-center justify-between gap-20 lg:mt-8 lg:justify-start">
        <p className="w-20 text-sm uppercase tracking-wide">Quantity</p>
        <div className="flex w-[150px] items-center justify-between rounded-sm border border-slate-300 px-3 py-1">
          <button
            role="button"
            onClick={handleDecreaseQuantity}
          >
            <MinusIcon
              className={clsx(
                'w-4',
                quantity > 1 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              )}
            />
          </button>
          <p className="select-none">{quantity}</p>
          <button
            role="button"
            onClick={handleIncreaseQuantity}
          >
            <PlusIcon
              className={clsx(
                'w-4',
                selectedAttribute?.stock || product.combinations[0].stock > quantity
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed opacity-50'
              )}
            />
          </button>
        </div>
      </div>

      <div className="mt-3 flex w-full select-none items-center gap-5 lg:mt-8">
        <Button
          className="rounded border border-sherpa-blue bg-white uppercase text-black-pearl hover:bg-twilight-blue/50"
          onClick={handleAddProductToCart}
        >
          add to cart
        </Button>
        <Button
          className="rounded bg-sherpa-blue uppercase"
          onClick={handleBuyProduct}
        >
          buy now
        </Button>
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

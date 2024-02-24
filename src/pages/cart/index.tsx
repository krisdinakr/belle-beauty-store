import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import CartListSkeleton from '@/components/skeleton/CartListSkeleton'
import { UserApi } from '@/constants'
import { getRequest } from '@/services/baseService'
import { ICart } from '@/types/Cart'
import { userService } from '@/services'
import { orderService } from '@/services/orderService'
import { formatCurrency } from '@/utils'

function Cart() {
  const navigate = useNavigate()
  const [selectedCart, setSelectedCart] = useState<ICart[]>([])
  const { data, isLoading, mutate } = useSWR(UserApi.Cart, getRequest)

  const cartData: ICart[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data.data)) {
      setSelectedCart(data.data)
      return data.data
    }
    return []
  }, [data])

  const grandPrice = useMemo(() => {
    let result = 0
    if (selectedCart) {
      selectedCart.forEach((i) => {
        const calculation = i.combination.price * i.quantity
        result = result + calculation
      })
    }
    return result
  }, [selectedCart])

  const handleDeleteAllCart = async () => {
    await userService.deleteAllCart()
  }

  const handleCheckedAllCart = (checked: boolean) => {
    if (checked) {
      setSelectedCart(cartData)
    } else {
      setSelectedCart([])
    }
  }

  const handleCheckedOneCart = useCallback(
    (checked: boolean, cart: ICart) => {
      if (checked) {
        const data = [...selectedCart, cart]
        setSelectedCart(data)
      } else {
        const data = selectedCart.filter((i) => i._id !== cart._id)
        setSelectedCart(data)
      }
    },
    [selectedCart]
  )

  const handleCheckout = async () => {
    const payload = {
      cartId: selectedCart.map((i) => i._id),
      totalPrice: grandPrice,
    }
    const res = await orderService.createOrder(payload)
    if (!res.error) {
      navigate('/checkout')
    }
  }

  return (
    <section className="h-auto min-h-[80vh] w-full p-5 sm:px-20 sm:py-5">
      <h2 className="my-6 font-open-sans text-2xl font-bold text-sherpa-blue sm:text-3xl">
        Shopping Bag
      </h2>

      {isLoading && <CartListSkeleton />}

      {!isLoading && cartData.length > 0 && (
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          <div className="h-max w-full rounded shadow lg:w-9/12">
            <div className="flex w-full items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="select_all"
                  id="select_all"
                  className="h-4 w-4 cursor-pointer"
                  onChange={(e) => handleCheckedAllCart(e.target.checked)}
                  checked={selectedCart.length === cartData.length}
                />
                <label
                  htmlFor="select_all"
                  className="cursor-pointer text-sm font-semibold"
                >
                  Select all
                </label>
              </div>
              <button
                className="text-sm font-semibold text-red-500"
                role="button"
                onClick={handleDeleteAllCart}
              >
                <p>Delete</p>
              </button>
            </div>
            {cartData.map((item) => (
              <CartItem
                data={item}
                key={item._id}
                refreshData={mutate}
                handleCheckedOneCart={handleCheckedOneCart}
                selectedCart={selectedCart}
              />
            ))}
          </div>

          <div className="h-fit w-full rounded px-5 py-4 shadow lg:w-3/12">
            <div className="flex items-center justify-between">
              <p>Grand Total</p>
              <p className="font-bold">{formatCurrency(grandPrice)}</p>
            </div>
            <Button
              className="mt-7 w-full bg-sherpa-blue font-semibold"
              disabled={grandPrice === 0}
              onClick={handleCheckout}
            >
              CHECKOUT ({selectedCart.length})
            </Button>
          </div>
        </div>
      )}

      {!isLoading && cartData.length === 0 && (
        <div className="my-5 p-5">
          <div className="flex h-40 w-full flex-col items-center justify-center gap-5">
            <h3 className="text-xl">Your shopping bag empty</h3>
            <Link to="/">
              <Button>Shop Now</Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart

import useSWR from 'swr'
import CartItem from '@/components/CartItem'
import { Button } from '@/components/ui/button'
import { UserApi } from '@/constants'
import { getRequest } from '@/services/baseService'
import { ICart } from '@/types/Cart'
import { useMemo } from 'react'

function Cart() {
  const { data, isLoading } = useSWR(UserApi.Cart, getRequest)
  console.log(data)

  const cartData: ICart[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  }, [data])

  console.log(cartData)

  return (
    <section className="min-h-screen w-full p-5 sm:px-20 sm:py-5">
      <h2 className="my-6 text-2xl font-bold text-sherpa-blue sm:text-3xl">Shopping Bag</h2>

      <div className="flex w-full flex-col gap-10 lg:flex-row">
        {isLoading ? (
          <p>loading</p>
        ) : (
          <div className="h-max w-full rounded shadow lg:w-9/12">
            <div className="flex w-full items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="select_all"
                  id="select_all"
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="select_all"
                  className="cursor-pointer text-sm font-semibold"
                >
                  Select all
                </label>
              </div>
              <p className="cursor-pointer text-sm font-semibold text-red-500">Delete</p>
            </div>
            {cartData.map((item) => (
              <CartItem
                data={item}
                key={item._id}
              />
            ))}
          </div>
        )}

        <div className="h-fit w-full rounded px-5 py-4 shadow lg:w-3/12">
          <div className="flex items-center justify-between">
            <p>Grand Total</p>
            <p className="font-bold">Price</p>
          </div>
          <Button className="mt-7 w-full bg-sherpa-blue font-semibold">CHECKOUT</Button>
        </div>
      </div>
    </section>
  )
}

export default Cart

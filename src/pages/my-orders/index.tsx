import { useMemo } from 'react'
import useSWR from 'swr'

import OrderCard from '@/components/OrderCard'
import { getRequest } from '@/services/baseService'
import { IOrder } from '@/types/Order'
import { OrderApi } from '@/constants'

function MyOrders() {
  const { data, isLoading } = useSWR(OrderApi.order, getRequest)

  const orderData: IOrder[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  }, [data])

  return (
    <section>
      <div className="rounded bg-white p-4 shadow">
        <h2 className="text-xl font-semibold text-sherpa-blue">My Orders</h2>
      </div>

      <div className="mt-2.5 space-y-3">
        {!isLoading &&
          orderData.length > 0 &&
          orderData.map((order) => (
            <OrderCard
              order={order}
              key={order._id}
            />
          ))}
      </div>
    </section>
  )
}

export default MyOrders

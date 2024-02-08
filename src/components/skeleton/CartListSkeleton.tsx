import { Skeleton } from '../ui/skeleton'

function CartListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-10 lg:flex-row">
      <Skeleton className="h-60 w-full lg:h-96 lg:w-9/12" />
      <Skeleton className="h-40 w-full lg:h-48 lg:w-3/12" />
    </div>
  )
}

export default CartListSkeleton

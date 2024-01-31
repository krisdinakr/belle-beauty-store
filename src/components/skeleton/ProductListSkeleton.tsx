import { Skeleton } from '@/components/ui/skeleton'

function ProductListSkeleton() {
  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-20">
      {Array.from(Array(6)).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[16rem] w-[11rem] lg:h-[28rem] lg:w-[15rem]"
        />
      ))}
    </div>
  )
}

export default ProductListSkeleton

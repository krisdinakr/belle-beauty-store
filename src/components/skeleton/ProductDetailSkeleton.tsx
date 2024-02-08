import { Skeleton } from '../ui/skeleton'

function ProductDetailSkeleton() {
  return (
    <div className="mt-10 flex w-full flex-col gap-20 pb-5 lg:flex-row">
      <div className="lg:w-[400px]">
        <Skeleton className="h-[400px] lg:w-[400px]" />
        <div className="mt-4 flex w-full items-center justify-center gap-3 px-3">
          {Array.from(Array(4)).map((_, index) => (
            <Skeleton
              key={index}
              className="h-16 w-16"
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <Skeleton className="h-[400px]" />
        <div className="mt-10 lg:mt-20">
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton

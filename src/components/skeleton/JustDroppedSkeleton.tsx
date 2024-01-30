import { Skeleton } from '@/components/ui/skeleton'

function JustDroppedSkeleton() {
  return (
    <section className="h-[23rem] w-full space-y-8 overflow-hidden p-5 sm:h-[28rem] lg:px-20 lg:py-[70px]">
      <Skeleton className="h-8 w-40 sm:h-9 sm:w-52" />
      <div className="w-full">
        <div className="flex gap-2">
          {Array.from(Array(2)).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[23rem] w-56 sm:h-[28rem] sm:w-[20.5rem]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default JustDroppedSkeleton

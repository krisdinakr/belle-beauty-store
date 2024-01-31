import { Skeleton } from '@/components/ui/skeleton'

function SidebarSkeleton() {
  return (
    <div>
      <Skeleton className="mb-10 h-9 w-36" />
      <Skeleton className="my-6 h-6 w-48" />
      <Skeleton className="my-6 h-6 w-48" />
      <Skeleton className="my-6 h-6 w-48" />
    </div>
  )
}

export default SidebarSkeleton

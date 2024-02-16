import { Link } from 'react-router-dom'
import {
  LogOutIcon,
  NotebookTabsIcon,
  ReceiptTextIcon,
  ShoppingBagIcon,
  UserCircle2Icon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/useAuth'

function MyAccount() {
  const auth = useAuthContext()
  return (
    <section className="h-auto overflow-hidden">
      <div className="flex h-48 gap-2.5 bg-sky-200 p-5 sm:px-20 sm:py-16 lg:h-80">
        <div className="h-16 w-16">
          <UserCircle2Icon className="h-full w-full" />
        </div>
        <div>
          <h2 className="truncate text-xl font-bold">{auth?.user}</h2>
          <Link to="/my-profile">
            <span>View Profile</span>
          </Link>
        </div>
      </div>
      <div className="-mt-20 mb-5 space-y-10 p-5 sm:px-20 lg:-mt-32 lg:mb-20">
        <div className="rounded bg-white p-2 shadow">
          <Link
            to="/my-orders"
            className="flex items-center gap-2 border-b px-3 py-5"
          >
            <ReceiptTextIcon /> My Orders
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 border-b px-3 py-5"
          >
            <ShoppingBagIcon /> Cart
          </Link>
          <Link
            to="/my-address"
            className="flex items-center gap-2 px-3 py-5"
          >
            <NotebookTabsIcon /> Shipping Address
          </Link>
        </div>
        <Button
          type="button"
          className="flex w-full items-center gap-0.5 bg-red-500 lg:hidden"
        >
          <LogOutIcon className="h-5" />
          Sign Out
        </Button>
      </div>
    </section>
  )
}

export default MyAccount

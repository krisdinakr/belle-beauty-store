import { Link, Outlet } from 'react-router-dom'
import {
  LogOutIcon,
  NotebookTabsIcon,
  ReceiptTextIcon,
  ShoppingBagIcon,
  UserCircle2Icon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/useAuth'

const MENU_LIST = [
  {
    path: '/my-profile',
    name: 'My Profile',
    icon: <UserCircle2Icon />,
  },
  {
    path: '/my-orders',
    name: 'My Orders',
    icon: <ReceiptTextIcon />,
  },
  {
    path: '/cart',
    name: 'Cart',
    icon: <ShoppingBagIcon />,
  },
  {
    path: '/my-address',
    name: 'Shipping Address',
    icon: <NotebookTabsIcon />,
  },
]

function AccountLayout() {
  const auth = useAuthContext()
  return (
    <section className="h-auto overflow-hidden">
      <div className="h-48 bg-sky-200 p-5 sm:px-20 sm:py-16 lg:h-80">
        <div className="flex w-full items-center gap-2.5">
          <div className="h-16 w-16">
            <UserCircle2Icon className="h-full w-full" />
          </div>
          <h2 className="truncate text-xl font-bold capitalize">{auth?.user}</h2>
        </div>
      </div>
      <div className="-mt-20 mb-5 space-y-10 p-5 sm:px-20 lg:-mt-32 lg:mb-20">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <div className="flex h-max w-full rounded bg-white p-2 shadow lg:w-3/12 lg:flex-col">
            {MENU_LIST.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex w-full flex-col items-center justify-center gap-2 px-3 py-5 last:border-none lg:flex-row lg:justify-start lg:border-b"
              >
                {item.icon}
                <span className="text-center text-sm">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="lg:w-9/12">
            <Outlet />
          </div>
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

export default AccountLayout

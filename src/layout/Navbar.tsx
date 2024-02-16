import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/hooks/useAuth'
import MenuItem from '@/components/MenuItem'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { SearchIcon, UserCircle2Icon, ShoppingBagIcon, ChevronDown, LogOutIcon } from 'lucide-react'
import MenuIcon from '@/assets/icons/menu.svg?react'
import CloseIcon from '@/assets/icons/close.svg?react'
import { authService } from '@/services'

function Navbar() {
  const location = useLocation()
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isDropdown, setIsDropdown] = useState<boolean>(false)

  useEffect(() => {
    setActiveMenu('')
  }, [location])

  const handleLogOut = async () => {
    if (auth?.isAuth) {
      const res = await authService.signOut()
      if (!res.error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        auth.setAuth({
          user: null,
          token: null,
          isAuth: false,
        })
        navigate('/')
      }
    }
  }

  const changeRoute = async (link: string) => {
    navigate(link)
    setIsDropdown(false)
  }

  return (
    <nav className="static ml-20 flex w-full justify-between text-lg font-medium">
      <li className="hidden items-center gap-3 lg:flex">
        <div onMouseOver={() => setActiveMenu('Category')}>
          <MenuItem
            title="Category"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div onMouseOver={() => setActiveMenu('Brands')}>
          <MenuItem
            title="Brands"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
      </li>

      <div className="flex w-full items-center justify-end gap-3">
        <div className="relative hidden items-center rounded  border border-slate-200 px-2.5 py-1 lg:flex">
          <SearchIcon className="mr-1 h-4 text-black-pearl" />
          <input
            type="text"
            placeholder="Search"
          />
        </div>

        {auth?.isAuth ? (
          <div className="hidden lg:block">
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <div className="flex items-center justify-center gap-0.5">
                  {auth.user}
                  <ChevronDown className="h-5" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      to="/my-account"
                      className="flex cursor-pointer items-center gap-0.5"
                    >
                      <UserCircle2Icon className="h-5 text-black-pearl" />
                      <span>My Account</span>
                    </Link>
                  </li>
                  <li>
                    <div className="h-[1px] w-full bg-slate-300" />
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogOut}
                      className="flex items-center gap-0.5"
                    >
                      <LogOutIcon className="h-5 text-red-500" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <Link to="/sign-in">
            <UserCircle2Icon className="h-5 text-black-pearl" />
          </Link>
        )}

        <Link
          to="/cart"
          className="hidden lg:block"
        >
          <ShoppingBagIcon className="h-5 text-black-pearl" />
        </Link>

        {/* Mobile Navbar */}
        {isDropdown ? (
          <div className="relative lg:hidden">
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-white">
              <div className="h-full w-full px-5">
                <div className="flex h-16 w-full items-center justify-end">
                  <CloseIcon
                    className="lg:hidden"
                    onClick={() => setIsDropdown(!isDropdown)}
                  />
                </div>
                <ul className="flex flex-col items-start text-xl font-medium">
                  <li
                    className="w-full cursor-pointer border-b py-8"
                    onClick={() => changeRoute('/my-account')}
                  >
                    My Account
                  </li>
                  <li className="w-full cursor-pointer border-b py-8">Categories</li>
                  <li className="w-full cursor-pointer border-b py-8">Brands</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <MenuIcon
            className="lg:hidden"
            onClick={() => setIsDropdown(!isDropdown)}
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar

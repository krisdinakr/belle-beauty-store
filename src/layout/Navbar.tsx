import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAuthContext } from '@/hooks/useAuth'
import MenuItem from '@/components/MenuItem'
import { SearchIcon, UserCircle2Icon, ShoppingBagIcon } from 'lucide-react'
import MenuIcon from '@/assets/icons/menu.svg?react'
import CloseIcon from '@/assets/icons/close.svg?react'

function Navbar() {
  const location = useLocation()
  const auth = useAuthContext()
  const [activeMenu, setActiveMenu] = useState<string>('')
  const [isDropdown, setIsDropdown] = useState<boolean>(false)

  useEffect(() => {
    setActiveMenu('')
  }, [location])

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

        {auth.user ? (
          <p>{auth.user.firstName}</p>
        ) : (
          <Link to="/sign-in">
            <UserCircle2Icon className="h-5 text-black-pearl" />
          </Link>
        )}

        <Link to="/cart">
          <ShoppingBagIcon className="h-5 text-black-pearl" />
        </Link>

        {isDropdown ? (
          <div className="relative">
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-white">
              <div className="h-full w-full px-5">
                <div className="flex h-16 w-full items-center justify-end">
                  <CloseIcon
                    className="lg:hidden"
                    onClick={() => setIsDropdown(!isDropdown)}
                  />
                </div>
                <li className="flex flex-col items-start text-xl font-medium">
                  <ul className="w-full cursor-pointer border-b py-8">Categories</ul>
                  <ul className="w-full cursor-pointer border-b py-8">Brands</ul>
                </li>
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

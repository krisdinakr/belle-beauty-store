import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { SearchIcon, UserCircle2Icon, ShoppingBagIcon } from 'lucide-react'
import MenuItem from '@/components/MenuItem'

function Navbar() {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState('')

  useEffect(() => {
    setActiveMenu('')
  }, [location])

  return (
    <nav className="static ml-20 hidden w-full justify-between text-lg font-medium lg:flex">
      <li className="flex items-center gap-3">
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

      <div className="flex items-center gap-3">
        <div className="relative hidden items-center rounded  border border-slate-200 px-2.5 py-1 lg:flex">
          <SearchIcon className="mr-1 h-4 text-black-pearl" />
          <input
            type="text"
            placeholder="Search"
          />
        </div>
        <Link to="/sign-in">
          <UserCircle2Icon className="h-5 text-black-pearl" />
        </Link>
        <Link to="/cart">
          <ShoppingBagIcon className="h-5 text-black-pearl" />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

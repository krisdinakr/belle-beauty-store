import { Link } from 'react-router-dom'

import { SearchIcon, UserCircle2Icon, ShoppingBagIcon } from 'lucide-react'
import MenuItem from '@/components/MenuItem'

function Navbar() {
  return (
    <nav className="static ml-20 hidden w-full justify-between text-lg font-medium lg:flex">
      <li className="flex items-center gap-3">
        <MenuItem title="Category" />
        <MenuItem title="Brands" />
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

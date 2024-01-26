import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '@/context/AuthContext'
import { authService } from '@/services'
import { initialCategories } from '@/data/initialsData'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import Logo from '@/assets/images/belle-logo.svg'
import SearchIcon from '@/assets/icons/search.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import CartIcon from '@/assets/icons/cart.svg?react'
import MenuIcon from '@/assets/icons/menu.svg?react'
import CloseIcon from '@/assets/icons/close.svg?react'
import { LogOutIcon } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

function Header() {
  const [isDropdown, setIsDropdown] = useState<boolean>(false)
  const [navbarFocus, setNavbarFocus] = useState<string | null>(null)
  const categories = initialCategories[0].childIds
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(categories[1])
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleLogOut() {
    if (localStorage.getItem('token')) {
      const res = await authService.signOut()
      if (res.status === 200) {
        localStorage.removeItem('token')
        auth.current = null
        navigate('/')
      }
    }
  }

  return (
    <header
      className="sticky top-0 w-full  overflow-hidden bg-white shadow"
      onMouseLeave={() => setNavbarFocus(null)}
    >
      <nav className="flex h-16 w-full items-center justify-between border-b px-5 py-2.5 lg:h-[75px] lg:px-20">
        <div className="flex items-center gap-20">
          <Link
            to="/"
            onMouseEnter={() => setNavbarFocus(null)}
          >
            <img
              src={Logo}
              alt="Belle Logo"
              className="h-6 lg:h-8"
            />
          </Link>

          <li className="hidden list-none items-center gap-7 text-lg font-medium lg:flex">
            <ul
              className="cursor-pointer"
              onMouseEnter={() => {
                setNavbarFocus('categories')
              }}
            >
              Categories
            </ul>
            <ul className="cursor-pointer">Brands</ul>
          </li>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden items-center rounded  border border-black-pearl p-1 lg:flex">
            <SearchIcon className="h-[21px]" />
            <input
              type="text"
              placeholder="Search"
            />
          </div>

          {auth.current ? (
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <div className="flex items-center justify-center gap-0.5">
                  {auth.current.firstName}
                  <ChevronDown className="h-5" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="flex items-center gap-0.5 text-sm"
                >
                  <LogOutIcon className="h-5 text-red-500" />
                  Log Out
                </button>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link to="/sign-in">
              <UserIcon className="h-5" />
            </Link>
          )}
          <Link to="/cart">
            <CartIcon className="h-5" />
          </Link>

          {isDropdown ? (
            <CloseIcon
              className="cursor-pointer lg:hidden"
              onClick={() => setIsDropdown(!isDropdown)}
            />
          ) : (
            <MenuIcon
              className="cursor-pointer lg:hidden"
              onClick={() => setIsDropdown(!isDropdown)}
            />
          )}
        </div>
      </nav>

      {/* Dropdown Mobile */}
      <div
        className={`fixed h-[calc(100vh-64px)] w-full bg-white shadow transition-all duration-500 ease-out lg:hidden 
        ${isDropdown ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full w-full px-5">
          <li className="flex flex-col items-start text-xl font-medium">
            <ul className="w-full cursor-pointer border-b py-8">Categories</ul>
            <ul className="w-full cursor-pointer border-b py-8">Brands</ul>
          </li>
        </div>
      </div>

      {/* Dropdown Desktop */}
      <div
        className={`absolute z-10 hidden h-fit min-h-[460px] w-full bg-white shadow ${navbarFocus ? 'lg:flex' : 'hidden'}`}
      >
        <div className="flex w-full gap-[50px] px-20 py-[50px]">
          <li className="w-32 space-y-[30px]">
            {categories.map((category) => (
              <ul
                key={initialCategories[category].title}
                className={`cursor-pointer text-base font-normal uppercase tracking-widest ${selectedCategoryId === initialCategories[category].id ? '!font-semibold' : ''}`}
                onMouseEnter={() => setSelectedCategoryId(initialCategories[category].id)}
              >
                {initialCategories[category].title}
              </ul>
            ))}
          </li>
          <div className="h-full border-r border-slate-300 " />
          <div className="flex flex-wrap justify-start gap-x-24 gap-y-5">
            {selectedCategoryId !== null &&
              initialCategories[selectedCategoryId].childIds.map((child) => (
                <li
                  key={initialCategories[child].title}
                  className="font-base space-y-2.5 font-medium"
                >
                  <span>{initialCategories[child].title}</span>
                  {initialCategories[child].childIds.map((i) => (
                    <ul
                      key={i}
                      className="font-normal"
                    >
                      {initialCategories[i].title}
                    </ul>
                  ))}
                </li>
              ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

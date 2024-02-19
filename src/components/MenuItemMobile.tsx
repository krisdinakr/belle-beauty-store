import { Dispatch } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { ChevronLeftIcon } from 'lucide-react'
import { useNavigationContext } from '@/hooks/useNavigation'

function MenuItemMobile({
  activeMenu,
  setActiveMenu,
  setIsDropdown,
}: {
  activeMenu: string
  setActiveMenu: Dispatch<string>
  setIsDropdown: Dispatch<boolean>
}) {
  const navigate = useNavigate()
  const { categories: rootCategory, brands } = useNavigationContext()

  const categories = rootCategory?.children?.sort((a, b) => {
    if (a._id < b._id) return -1
    if (a._id > b._id) return 1
    return 0
  })

  const changeRoute = async (link: string) => {
    navigate(link)
    setIsDropdown(false)
  }

  return (
    <div className="relative h-full w-full">
      <ul className="flex flex-col items-start bg-white px-5 text-xl font-medium transition-all duration-300">
        <li
          className="w-full cursor-pointer border-b py-8"
          onClick={() => changeRoute('/my-profile')}
        >
          My Profile
        </li>
        <li
          className="w-full cursor-pointer border-b py-8"
          onClick={() => setActiveMenu('Category')}
        >
          Categories
        </li>
        <li
          className="w-full cursor-pointer border-b py-8"
          onClick={() => setActiveMenu('Brands')}
        >
          Brands
        </li>
      </ul>

      {/* Categories */}
      <div
        className={clsx(
          'absolute left-0 right-0 top-0 bg-white transition-all duration-300',
          activeMenu === 'Category' ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div
          className="flex items-center gap-2.5 bg-twilight-blue p-5"
          onClick={() => setActiveMenu('')}
        >
          <ChevronLeftIcon /> Categories
        </div>
        <ul className="flex flex-col items-start px-5 text-xl font-medium">
          {categories?.map((category) => (
            <li
              className="w-full cursor-pointer border-b py-8"
              key={category._id}
              onClick={() => changeRoute(`/category/${category.slug}`)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div
        className={clsx(
          'absolute left-0 right-0 top-0 bg-white transition-all duration-300',
          activeMenu === 'Brands' ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div
          className="flex items-center gap-2.5 bg-twilight-blue p-5"
          onClick={() => setActiveMenu('')}
        >
          <ChevronLeftIcon /> Brands
        </div>
        <ul className="flex h-[calc(100vh-135px)] flex-col items-start overflow-auto px-5 text-xl font-medium">
          {brands?.map((brand) => (
            <li
              className="w-full cursor-pointer border-b py-8"
              key={brand._id}
              onClick={() => changeRoute(`/brand/${brand.slug}`)}
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuItemMobile

import { Link } from 'react-router-dom'

import { useNavigationContext } from '@/hooks/useNavigation'

function MenuContextBrand() {
  const { brands } = useNavigationContext()

  return (
    <div className="h-full w-full overflow-y-auto px-20 py-[50px]">
      <ul className="flex flex-wrap gap-3">
        {brands &&
          brands.map((brand) => (
            <li
              className="p-1 text-base font-normal tracking-widest hover:font-medium"
              key={brand._id}
            >
              <Link to={`brand/${brand.slug}`}>{brand.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default MenuContextBrand

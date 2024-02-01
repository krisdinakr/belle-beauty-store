import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { getRequest } from '@/services/baseService'
import { BrandApi } from '@/constants'
import { IBrand } from '@/types/Brand'

function MenuContextBrand() {
  const { data, isLoading } = useSWR(BrandApi.brand, getRequest)

  const brands: IBrand[] = useMemo(() => {
    if (!data?.error && data?.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  }, [data])

  if (isLoading) {
    return <p>loading</p>
  }

  return (
    <div className="h-full w-full overflow-y-auto px-20 py-[50px]">
      <ul className="flex flex-wrap gap-3">
        {brands.map((brand) => (
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

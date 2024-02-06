import { Link } from 'react-router-dom'
import { ICategory } from '@/types/Category'

type BreadCrumbsProps = Pick<ICategory, '_id' | 'name' | 'slug'>

function BreadCrumbs({ data }: { data: BreadCrumbsProps[] }) {
  return (
    <nav className="w-full">
      <ul className="flex">
        {data.map((i, index) => (
          <li key={i._id}>
            {index + 1 < data.length ? (
              <>
                <Link
                  to={index === 0 ? '/' : `/category/${i.slug}`}
                  className="text-black-pearl  transition duration-150  ease-in-out hover:text-black-pearl/80  focus:text-black-pearl/80 active:text-black-pearl/70"
                >
                  {index === 0 ? 'Home' : i.name}
                </Link>
                <span className="mx-2 text-neutral-500">/</span>
              </>
            ) : (
              <span className="text-neutral-500">{i.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default BreadCrumbs

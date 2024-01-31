import { Link } from 'react-router-dom'
import { ICategory } from '@/types/Category'

function BreadCrumbs({ data }: { data: ICategory }) {
  const breadCrumbsData = [...data.parents, data]

  return (
    <nav className="w-full">
      <ul className="flex">
        {breadCrumbsData.map((i, index) => (
          <li key={i._id}>
            {index + 1 < breadCrumbsData.length ? (
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

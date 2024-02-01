import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { CategoryContext } from '@/context/CategoryContext'
import { ICategoryWithChildren } from '@/types/Category'

function MenuContextCategory() {
  const rootCategory = useContext(CategoryContext)

  const [selectedMenu, setSelectedMenu] = useState<ICategoryWithChildren | null>(
    rootCategory?.children ? rootCategory.children[0] : null
  )
  const categories = rootCategory?.children?.sort((a, b) => {
    if (a._id < b._id) return -1
    if (a._id > b._id) return 1
    return 0
  })

  useEffect(() => {
    setSelectedMenu(rootCategory?.children ? rootCategory.children[0] : null)
  }, [rootCategory])

  return (
    <div className="flex w-full gap-10 px-20 py-[50px]">
      <ul className="w-40 space-y-[30px]">
        {categories?.map((category) => (
          <li
            key={category._id}
            className={clsx(
              'cursor-pointer text-base font-normal uppercase tracking-widest',
              selectedMenu?._id === category._id ? 'font-semibold' : ''
            )}
            onMouseEnter={() => setSelectedMenu(category)}
          >
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <div className="h-60 border-r border-slate-300" />
      <div className="flex w-[calc(w-screen-200px)] flex-wrap justify-start gap-x-12 gap-y-5 xl:gap-x-20">
        {selectedMenu !== null &&
          selectedMenu.children.map((child) => (
            <li
              key={child._id}
              className="font-base space-y-2.5 font-medium"
            >
              <Link
                className="hover:text-indigo-800"
                to={`/category/${child.slug}`}
              >
                <span>{child.name}</span>
              </Link>
              {child.children.map((i) => (
                <ul
                  key={i._id}
                  className="font-normal"
                >
                  <Link
                    className="hover:text-indigo-800"
                    to={`/category/${i.slug}`}
                  >
                    {i.name}
                  </Link>
                </ul>
              ))}
            </li>
          ))}
      </div>
    </div>
  )
}

export default MenuContextCategory

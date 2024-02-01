import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'

import MenuContextCategory from './MenuContextCategory'
import MenuContextBrand from './MenuContextBrand'

function MenuContext({
  title,
  activeMenu,
  setActiveMenu,
}: {
  title: string
  activeMenu: string
  setActiveMenu: Dispatch<SetStateAction<string>>
}) {
  return (
    <div
      className={clsx(
        'absolute left-0 right-0 top-full block h-fit min-h-[460px] bg-white shadow-inner drop-shadow transition-all ease-in-out',
        activeMenu && activeMenu === title ? 'block' : 'hidden'
      )}
      onMouseEnter={() => setActiveMenu(title)}
      onMouseLeave={() => setActiveMenu('')}
    >
      {activeMenu && activeMenu === 'Category' && <MenuContextCategory />}
      {activeMenu && activeMenu === 'Brands' && <MenuContextBrand />}
    </div>
  )
}

export default MenuContext

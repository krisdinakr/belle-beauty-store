import { Dispatch, SetStateAction } from 'react'

import MenuContextWrapper from './MenuContextWrapper'

function MenuItem({
  title,
  activeMenu,
  setActiveMenu,
}: {
  title: string
  activeMenu: string
  setActiveMenu: Dispatch<SetStateAction<string>>
}) {
  return (
    <ul className="group static">
      <div
        className="cursor-pointer p-4"
        aria-haspopup="menu"
        aria-expanded={activeMenu ? true : false}
      >
        {title}
      </div>

      <MenuContextWrapper
        title={title}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
    </ul>
  )
}

export default MenuItem

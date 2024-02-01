import { useState } from 'react'

import MenuContext from './MenuContext'

function MenuItem({ title }: { title: string }) {
  const [dropdown, setDropdown] = useState<boolean>(false)

  return (
    <ul
      className="group static"
      onMouseEnter={() => setDropdown(true)}
    >
      <div
        className="cursor-pointer p-4"
        aria-haspopup="menu"
        aria-expanded={dropdown ? true : false}
      >
        {title}
      </div>

      <MenuContext
        dropdown={dropdown}
        setDropdown={setDropdown}
      />
    </ul>
  )
}

export default MenuItem

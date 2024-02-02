import { memo, useMemo } from 'react'

import { Accordion } from '@/components/ui/accordion'
import SidebarHeader from '@/components/SidebarHeader'
import { ICategory, ICategoryWithChildren } from '@/types/Category'

const Sidebar = memo(function Sidebar({
  data,
  activeMenu,
  handleChangeRoute,
}: {
  data: ICategoryWithChildren
  activeMenu?: ICategory
  handleChangeRoute: (i: string) => void
}) {
  const defaultValue = useMemo(() => {
    if (activeMenu && activeMenu.parents && activeMenu.parents.length === 2) {
      return activeMenu.name
    } else if (activeMenu && activeMenu.parents && activeMenu.parents.length > 2) {
      const index = activeMenu.parents.length - 1
      return activeMenu.parents[index].name
    }
    return undefined
  }, [activeMenu])

  return (
    <aside>
      <div key={data._id}>
        <h3 className="pb-4 text-2xl font-medium uppercase">{data.name}</h3>
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue!}
        >
          {data?.children?.map((i) => (
            <SidebarHeader
              data={i}
              key={i._id}
              handleClick={handleChangeRoute}
            />
          ))}
        </Accordion>
      </div>
    </aside>
  )
})

export default Sidebar

import clsx from 'clsx'

import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import SidebarItem from '@/components/SidebarItem'
import { ICategoryWithChildren } from '@/types/Category'

function SidebarHeader({
  data,
  childId,
  handleClick,
}: {
  data: ICategoryWithChildren
  childId?: string
  handleClick: (i: string) => void
}) {
  return (
    <AccordionItem
      value={data.name}
      className={clsx(childId ? 'border-none pl-2' : '')}
    >
      <AccordionTrigger
        className={clsx(childId ? 'pt-0' : '')}
        onClick={() => handleClick(data.slug)}
      >
        {data.name}
      </AccordionTrigger>
      {data.children.map((child) => (
        <SidebarItem
          item={child}
          key={child._id}
          handleClick={handleClick}
        />
      ))}
    </AccordionItem>
  )
}

export default SidebarHeader

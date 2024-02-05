import { useLocation } from 'react-router-dom'
import clsx from 'clsx'

import { Accordion, AccordionContent } from '@/components/ui/accordion'
import SidebarHeader from '@/components/SidebarHeader'
import { ICategoryWithChildren } from '@/types/Category'

function SidebarItem({
  item,
  handleClick,
}: {
  item: ICategoryWithChildren
  handleClick: (i: string) => void
}) {
  const { pathname } = useLocation()

  return (
    <AccordionContent
      key={item._id}
      className={clsx('cursor-pointer', pathname.includes(item.slug) ? 'font-medium' : '')}
    >
      <>
        {item.children && item.children.length > 0 ? (
          <Accordion
            type="single"
            collapsible
          >
            <SidebarHeader
              data={item}
              key={`${item._id}-child`}
              childId={item._id}
              handleClick={handleClick}
            />
          </Accordion>
        ) : (
          <span onClick={() => handleClick(item.slug)}>{item.name}</span>
        )}
      </>
    </AccordionContent>
  )
}

export default SidebarItem

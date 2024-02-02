import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import { ICategory, ICategoryWithChildren } from '@/types/Category'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { memo, useMemo } from 'react'

const SideBar = memo(function SideBar({
  data,
  activeMenu,
  isUseLink,
}: {
  data: ICategoryWithChildren
  activeMenu?: ICategory
  isUseLink?: boolean
}) {
  const { pathname } = useLocation()
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
            <AccordionItem
              key={i._id}
              value={i.name}
            >
              {isUseLink ? (
                <Link to={`/category/${i.slug}`}>
                  <AccordionTrigger>{i.name}</AccordionTrigger>
                </Link>
              ) : (
                <AccordionTrigger>{i.name}</AccordionTrigger>
              )}
              {i.children.map((c) => (
                <AccordionContent
                  key={c._id}
                  className={clsx('cursor-pointer', pathname.includes(c.slug) ? 'font-medium' : '')}
                >
                  {isUseLink ? (
                    <Link to={`/category/${c.slug}`}>{c.name}</Link>
                  ) : (
                    <span>{c.name}</span>
                  )}
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  )
})

export default SideBar

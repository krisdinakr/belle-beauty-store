import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ICategory, ICategoryWithChildren } from '@/types/Category'
import { Link } from 'react-router-dom'

function SideBar({
  data,
  activeMenu,
  isUseLink,
}: {
  data: ICategoryWithChildren
  activeMenu?: ICategory
  isUseLink?: boolean
}) {
  let defaultValue
  if (activeMenu && activeMenu.parents && activeMenu.parents.length === 2) {
    defaultValue = activeMenu.name
  } else if (activeMenu && activeMenu.parents && activeMenu.parents.length > 2) {
    const index = activeMenu.parents.length - 1
    defaultValue = activeMenu.parents[index].name
  }

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
                  className="cursor-pointer"
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
}

export default SideBar

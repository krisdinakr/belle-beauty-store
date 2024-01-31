import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ICategory, ICategoryWithChildren } from '@/types/Category'
import { Link } from 'react-router-dom'

function SideBar({ data, activeMenu }: { data: ICategoryWithChildren; activeMenu: ICategory }) {
  let defaultValue
  if (activeMenu && activeMenu.parents && activeMenu.parents.length === 2) {
    defaultValue = activeMenu.name
  } else if (activeMenu && activeMenu.parents && activeMenu.parents.length > 2) {
    const index = activeMenu.parents.length - 1
    defaultValue = activeMenu.parents[index].name
  }

  return (
    <aside>
      <h3 className="pb-4 text-2xl font-medium uppercase">{data?.name}</h3>
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultValue}
      >
        {data?.children?.map((i) => (
          <AccordionItem
            key={i._id}
            value={i.name}
          >
            <Link to={`/category/${i.slug}`}>
              <AccordionTrigger>{i.name}</AccordionTrigger>
            </Link>
            {i.children.map((c) => (
              <Link
                to={`/category/${c.slug}`}
                key={c._id}
              >
                <AccordionContent className="cursor-pointer">{c.name}</AccordionContent>
              </Link>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  )
}

export default SideBar

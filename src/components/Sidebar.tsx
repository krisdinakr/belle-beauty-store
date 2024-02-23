import { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Accordion } from '@/components/ui/accordion'
import SidebarHeader from '@/components/SidebarHeader'
import { ICategoryWithChildren } from '@/types/Category'

const Sidebar = memo(function Sidebar({
  data,
  handleChangeRoute,
}: {
  data: ICategoryWithChildren
  handleChangeRoute: (i: string) => void
}) {
  const { slug } = useParams()

  const defaultValue = useMemo(() => {
    if (data && data.children && Array.isArray(data.children)) {
      for (let i = 0; i < data.children.length; i++) {
        if (data.children[i].slug === slug) {
          return data.children[i].name
        }
        const child = data.children[i].children.find((c) => c.slug === slug)
        if (child) return data.children[i].name
      }
    }
  }, [data, slug])

  const categoryDataMobile = useMemo(() => {
    if (slug && data) {
      if (data.slug === slug) {
        return [...data.children]
      }

      for (let i = 0; i < data.children.length; i++) {
        if (data.children[i].slug === slug) {
          return [...data.children[i].children]
        }
      }
    }
  }, [slug, data])

  const handleClick = (category: ICategoryWithChildren) => {
    handleChangeRoute(category.slug)
  }

  return (
    <aside className="relative w-full">
      <div
        key={data._id}
        className="hidden sm:block"
      >
        <h3 className="pb-4 text-2xl font-medium uppercase">{data.name}</h3>
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultValue}
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

      <div className="block sm:hidden">
        <div className="w-full">
          <div className="scroll no-scrollbar flex snap-x flex-nowrap gap-1.5 overflow-auto scroll-smooth">
            {categoryDataMobile?.map((category) => (
              <ul
                className="relative w-max min-w-max snap-center rounded-full border px-3 py-1"
                key={category._id}
                onClick={() => handleClick(category)}
              >
                <p className="text-sm uppercase">{category.name}</p>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
})

export default Sidebar

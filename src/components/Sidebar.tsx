import { memo, useMemo } from 'react'

import { Accordion } from '@/components/ui/accordion'
import SidebarHeader from '@/components/SidebarHeader'
import { ICategoryWithChildren } from '@/types/Category'
import { useParams } from 'react-router-dom'

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

  return (
    <aside>
      <div key={data._id}>
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
    </aside>
  )
})

export default Sidebar

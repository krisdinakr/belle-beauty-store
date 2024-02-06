import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface IProductInfoTabProps {
  description: string
  howToUse: string
  ingredients: string
}

function ProductInfoTab({ description, howToUse, ingredients }: IProductInfoTabProps) {
  return (
    <Tabs defaultValue={infoTabList[0].name}>
      <TabsList className="w-full">
        {infoTabList.map((i) => (
          <TabsTrigger
            key={i.id}
            value={i.name}
            className="w-full px-5 capitalize"
          >
            {i.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="description">{description}</TabsContent>
      <TabsContent value="how to use">{howToUse}</TabsContent>
      <TabsContent value="ingredients">{ingredients}</TabsContent>
    </Tabs>
  )
}

export default ProductInfoTab

const infoTabList = [
  { id: 0, name: 'description' },
  { id: 1, name: 'how to use' },
  { id: 2, name: 'ingredients' },
]

import clsx from 'clsx'
import { IAttributeItem } from '@/types/Products'

function ShadeAttribute({
  attributes,
  selected,
  handleSelectAttribute,
}: {
  attributes: IAttributeItem[]
  selected: IAttributeItem | null
  handleSelectAttribute: (type: 'shade' | 'size' | 'variant', name: string | number) => void
}) {
  return (
    <div className="mt-3 flex w-full items-start gap-20 lg:mt-8 lg:justify-start">
      <p className="w-20 text-sm uppercase tracking-wide">Shade</p>
      <div className="w-auto space-y-3">
        {selected ? (
          <span className="text-xs font-semibold">{selected.name}</span>
        ) : (
          <span className="text-xs font-semibold">Select shade:</span>
        )}

        <ul className="flex w-full gap-2">
          {attributes.map((shade) => (
            <li
              className={clsx(
                'h-10 w-10 cursor-pointer rounded-full p-1',
                selected ? 'border' : ''
              )}
              key={shade.name}
              onClick={() => handleSelectAttribute('shade', shade.name)}
            >
              <picture>
                <source type="image/webp" />
                <img
                  src={shade.value}
                  role="presentation"
                />
              </picture>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ShadeAttribute

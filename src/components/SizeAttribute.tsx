import clsx from 'clsx'
import { IAttributeItem } from '@/types/Products'

function SizeAttribute({
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
      <p className="w-20 text-sm uppercase tracking-wide">Size</p>
      <div className="w-auto space-y-3">
        <ul className="flex w-full gap-2">
          {attributes.map((size) => (
            <li
              className={clsx(
                'flex w-max cursor-pointer items-center justify-between rounded border px-5 py-1.5 text-xs',
                selected ? 'border-sherpa-blue text-sherpa-blue' : 'border-slate-300'
              )}
              key={size.name}
              onClick={() => handleSelectAttribute('size', size.name)}
            >
              <span>{size.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SizeAttribute

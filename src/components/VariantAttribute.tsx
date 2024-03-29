import clsx from 'clsx'
import { IAttributeItem } from '@/types/Products'

function VariantAttribute({
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
      <p className="w-20 text-sm uppercase tracking-wide">Variant</p>
      <div className="w-min space-y-3 sm:w-auto">
        <ul className="flex w-full flex-wrap gap-2">
          {attributes.map((variant) => (
            <li
              className={clsx(
                'flex w-max cursor-pointer items-center justify-between rounded border px-5 py-1.5 text-xs',
                selected && selected.name === variant.name
                  ? 'border-sherpa-blue text-sherpa-blue'
                  : 'border-slate-300'
              )}
              key={variant.name}
              onClick={() => handleSelectAttribute('variant', variant.name)}
            >
              <span>{variant.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default VariantAttribute

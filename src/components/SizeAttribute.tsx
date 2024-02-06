interface ISizeAttributeProps {
  name: string
  value: string
}

function SizeAttribute({ size }: { size: ISizeAttributeProps }) {
  return (
    <div className="flex w-max items-center justify-between rounded border border-black-pearl px-5 py-1.5 text-xs">
      {size.name}
    </div>
  )
}

export default SizeAttribute

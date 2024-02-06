interface IShadeAttributeProps {
  value: string
  name: string
}

function ShadeAttribute({ shade }: { shade: IShadeAttributeProps }) {
  return (
    <picture>
      <source type="image/webp" />
      <img
        src={shade.value}
        role="presentation"
      />
    </picture>
  )
}

export default ShadeAttribute

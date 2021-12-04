function PropsChild (props) {
  const { item } = props

  return (
    <div>
      i am item <b>{item.id}</b> with description <b>{item.description}</b>
    </div>
  )
}

export default PropsChild

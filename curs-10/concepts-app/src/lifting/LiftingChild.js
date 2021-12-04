import { useState } from 'react'

function LiftingChild (props) {
  const { item, onParentChange } = props
  const [description, setDescription] = useState(item.description)

  const handlerClick = (evt) => {
    onParentChange(item.id, description)
  }

  return (
    <div>
      for <b>{item.id}</b> description in child
      <input type='text' value={description} onChange={(evt) => setDescription(evt.target.value)} />
      <input type='button' value='update' onClick={handlerClick} />
    </div>
  )
}

export default LiftingChild

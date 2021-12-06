import { useState } from 'react'
import UpdateChild from './UpdateChild'

function UpdateParent () {
  const [id, setId] = useState(1)

  const handlerBlur = (evt) => {
    setId(evt.target.value)
  }

  return (
    <>
      <>
        <div>
          <input type='text' onBlur={handlerBlur} />
        </div>
        <div>
          <UpdateChild item={id} />
        </div>
      </>
    </>
  )
}

export default UpdateParent

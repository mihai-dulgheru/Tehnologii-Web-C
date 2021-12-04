import { useState } from 'react'

function StateExample () {
  const [counter, setCounter] = useState(1)

  const handlerClick = (evt) => {
    setCounter(counter + 1)
  }

  return (
    <>
      <div>current value of counter is: {counter}</div>
      <div>
        <input type='button' value='+' onClick={handlerClick} />
      </div>
    </>
  )
}

export default StateExample

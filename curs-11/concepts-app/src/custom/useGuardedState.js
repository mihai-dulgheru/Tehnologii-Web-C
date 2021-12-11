import { useState } from 'react'

function useGuardedState (initial, min, max) {
  const [value, setValue] = useState(initial)

  const setGuarded = (nextValue) => {
    if (nextValue >= min && nextValue <= max) {
      setValue(nextValue)
    }
  }

  return [value, setGuarded]
}

export default useGuardedState

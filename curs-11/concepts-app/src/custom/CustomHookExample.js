import useGuardedState from './useGuardedState'

function CustomHookExample () {
  const [counter, setCounter] = useGuardedState(1, 0, 10)

  const handleIncrease = (evt) => {
    setCounter(counter + 1)
  }

  const handleDecrease = (evt) => {
    setCounter(counter - 1)
  }

  return (
    <>
      <div>current value of counter is: {counter}</div>
      <div>
        <input type='button' value='+' onClick={handleIncrease} />
        <input type='button' value='-' onClick={handleDecrease} />
      </div>
    </>
  )
}

export default CustomHookExample

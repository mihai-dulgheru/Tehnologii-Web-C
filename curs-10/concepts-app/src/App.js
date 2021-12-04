import './App.css'
import StateExample from './state/StateExample'
import PropsParent from './props/PropsParent'
import UpdateParent from './update/UpdateParent'
import LiftingParent from './lifting/LiftingParent'

function App () {
  return (
    <div className='App'>
      <h2>state</h2>
      <StateExample />
      <h2>props</h2>
      <PropsParent />
      <h2>update</h2>
      <UpdateParent />
      <h2>lifting</h2>
      <LiftingParent />
    </div>
  )
}

export default App

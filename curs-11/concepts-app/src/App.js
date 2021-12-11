import './App.css'
import StateExample from './state/StateExample'
import PropsParent from './props/PropsParent'
import UpdateParent from './update/UpdateParent'
import LiftingParent from './lifting/LiftingParent'
import ContextParent from './context/ContextParent'
import ReducerExample from './reducers/ReducerExample'
import CustomHookExample from './custom/CustomHookExample'

function App () {
  return (
    <div>
      <h2>state</h2>
      <StateExample />
      <h2>props</h2>
      <PropsParent />
      <h2>update</h2>
      <UpdateParent />
      <h2>lifting</h2>
      <LiftingParent />
      <h2>context</h2>
      <ContextParent />
      <h2>reducers</h2>
      <ReducerExample />
      <h2>custom</h2>
      <CustomHookExample />
    </div>
  )
}

export default App

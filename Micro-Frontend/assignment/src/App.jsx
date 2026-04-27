import { useState } from 'react'
import AssignmentForm from './Components/AssignmentForm '
import './App.css'
import RHF from './Components/RHF'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AssignmentForm />
      {/* <RHF /> */}
    </>
  )
}

export default App

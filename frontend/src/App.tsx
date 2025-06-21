import { useState } from 'react'
import './App.css'
import Header from './Header'
import Calendar from './Calendar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Calendar />
    </div>
  )
}

export default App

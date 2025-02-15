import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './components/newsSearchUI'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Article />
  )
}

export default App

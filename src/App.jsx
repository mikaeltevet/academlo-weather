import { useState } from 'react'
import WeatherData from '/src/components/WeatherData'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <WeatherData />
    </div>
  )
}

export default App
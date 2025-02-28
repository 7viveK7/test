// import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import Home from './hom'
import ButtonUsage from './toggleButton'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  // const [count, setCount] = useState(0)
  const [color, setColor] = useState('lavender')


  return (<Provider store={store}>
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2em", backgroundColor: color }}>
      <div style={{ width: "80%", height: "80%", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
        <ButtonUsage color={color} setColor={setColor} />
        <Home />

      </div>
    </div>
  </Provider>)
}

export default App

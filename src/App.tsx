import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useRouterElement from './useRouterElement'

function App() {
  const routerElementr = useRouterElement()
  return (
    <div>
      {routerElementr}
    </div>
  )
}

export default App

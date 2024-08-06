import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'

function App() {
  const routerElementr = useRouterElement()
  return (
    <div>
      {routerElementr}
      <ToastContainer />
    </div>
  )
}

export default App

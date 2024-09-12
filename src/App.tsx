import { Fragment, useContext, useEffect } from 'react'
import './App.css'
import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import { LocalStorageEventTarget } from './utils/auth'
import { themeContext } from './context/app.context'

function App() {
  const { reset } = useContext(themeContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  const routerElementr = useRouterElement()
  return (
    <Fragment>
      {routerElementr}
      <ToastContainer />
    </Fragment>
  )
}

export default App

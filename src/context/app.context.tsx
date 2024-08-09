import { createContext, Fragment, useState } from "react"
import { getAccessTokenFromLS } from "src/utils/auth"

interface appContext {
  isAuthenicated: boolean
  setIsAuthenicated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext: appContext = {
  isAuthenicated: Boolean(getAccessTokenFromLS()),
  setIsAuthenicated: () => null
}

export const themeContext = createContext<appContext>(initialContext)

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenicated, setIsAuthenicated] = useState<boolean>(initialContext.isAuthenicated)
  return (
    <Fragment>
      <themeContext.Provider value={{
        isAuthenicated,
        setIsAuthenicated
      }}>
        {children}
      </themeContext.Provider>
    </Fragment >
  )
}







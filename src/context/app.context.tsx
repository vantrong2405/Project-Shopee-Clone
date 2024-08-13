import { createContext, Fragment, useState } from 'react'
import { User } from 'src/type/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface appContext {
  isAuthenicated: boolean
  setIsAuthenicated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User
  setProfile: React.Dispatch<React.SetStateAction<User>>
}

const initialContext: appContext = {
  isAuthenicated: Boolean(getAccessTokenFromLS()),
  setIsAuthenicated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const themeContext = createContext<appContext>(initialContext)

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenicated, setIsAuthenicated] = useState<boolean>(initialContext.isAuthenicated)
  const [profile, setProfile] = useState<User>(initialContext.profile)
  return (
    <Fragment>
      <themeContext.Provider
        value={{
          isAuthenicated,
          setIsAuthenicated,
          profile,
          setProfile
        }}
      >
        {children}
      </themeContext.Provider>
    </Fragment>
  )
}

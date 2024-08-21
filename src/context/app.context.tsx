import { createContext, Fragment, useState } from 'react'
import { Purchase } from 'src/type/purchase.type'
import { User } from 'src/type/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'
interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
interface appContext {
  isAuthenicated: boolean
  setIsAuthenicated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

const initialContext: appContext = {
  isAuthenicated: Boolean(getAccessTokenFromLS()),
  setIsAuthenicated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
}

export const themeContext = createContext<appContext>(initialContext)

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenicated, setIsAuthenicated] = useState<boolean>(initialContext.isAuthenicated)
  const [profile, setProfile] = useState<User | null>(initialContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialContext.extendedPurchases)
  const reset = () => {
    setIsAuthenicated(false)
    setProfile(null)
    setExtendedPurchases([])

  }
  return (
    <Fragment>
      <themeContext.Provider
        value={{
          isAuthenicated,
          setIsAuthenicated,
          profile,
          setProfile,
          extendedPurchases,
          setExtendedPurchases,
          reset
        }}
      >
        {children}
      </themeContext.Provider>
    </Fragment>
  )
}

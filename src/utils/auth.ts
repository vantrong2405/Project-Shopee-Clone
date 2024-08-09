export const getAccessTokenFromLS = () => localStorage.getItem('accessToken') || ''

export const clearAccessTokenFormLS = () => localStorage.removeItem('accessToken')

export const saveAccessTokenToLS = (accessToken: string) => localStorage.setItem('accessToken', accessToken)
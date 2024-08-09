
export const getAccessTokenFromLS = () => localStorage.getItem('accessToken') || ''

export const clearAccessTokenFromLS = () => localStorage.removeItem('accessToken')

export const setAccessTokenToLS = (accessToken: string) => localStorage.setItem('accessToken', accessToken)


export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const clearProfileFromLS = () => localStorage.removeItem('profile')

export const setProfileToLS = (profile: string) => localStorage.setItem('profile', JSON.stringify(profile))



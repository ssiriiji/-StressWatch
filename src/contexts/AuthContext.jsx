import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const onboardingStatus = localStorage.getItem('onboarding_completed')
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setHasCompletedOnboarding(onboardingStatus === 'true')
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setHasCompletedOnboarding(false)
    localStorage.removeItem('user')
    localStorage.removeItem('onboarding_completed')
    localStorage.removeItem('lifestyle_data')
  }

  const completeOnboarding = (data) => {
    setHasCompletedOnboarding(true)
    localStorage.setItem('onboarding_completed', 'true')
    localStorage.setItem('lifestyle_data', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      hasCompletedOnboarding,
      login,
      logout,
      completeOnboarding
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

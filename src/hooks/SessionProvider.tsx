import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { AuthContext } from './session'
import { LoginForm } from '../components/Login'
import type { LoginFormRef } from '../components/Login'

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  const loginFormRef = useRef<LoginFormRef>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      loginFormRef.current?.show()
    } else {
      loginFormRef.current?.hide()
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isAuthenticated ? children : null}
      <LoginForm ref={loginFormRef} />
    </AuthContext.Provider>
  )
}

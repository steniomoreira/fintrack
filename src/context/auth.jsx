import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignup } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signout: () => {},
  isInitializing: true,
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const signupMutation = useSignup()
  const loginMutation = useLogin()

  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data)
      setUser(createdUser)
      setTokens(createdUser.tokens)

      toast.success('Conta criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error(
        'Erro ao criar a conta. Por favor, tente novamente mais tarde.'
      )
    }
  }

  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data)
      setUser(loggedUser)
      setTokens(loggedUser.tokens)

      toast.success('Login realizado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error(
        'Erro ao logar na conta. Por favor, tente novamente mais tarde.'
      )
    }
  }

  const signout = () => {
    setUser(null)
    removeTokens()
  }

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)

        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )

        if (!accessToken && !refreshToken) return

        const response = await UserService.me()

        setUser(response)
      } catch (error) {
        console.error(error)
        setUser(null)
      } finally {
        setIsInitializing(false)
      }
    }

    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        signout,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

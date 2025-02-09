"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import Cookies from "js-cookie"

interface IUser {
  id: string
  name: string
  avatar_url: string
  email: string
  accessToken: string
}

interface AuthState {
  currentSession: IUser | undefined
  addSession: (user: IUser, accessToken: string, refreshToken: string) => void
  getToken: () => string | null
  signUpWithGoogle: () => Promise<void>
  signUp: (formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) => Promise<void>
  logout: () => Promise<void>
}

const defaultState: AuthState = {
  currentSession: undefined,
  addSession: () => {},
  getToken: () => null,
  signUpWithGoogle: async () => {},
  signUp: async () => {},
  logout: async () => {},
}

const AuthContext = createContext<AuthState>(defaultState)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { push } = useRouter()
  const { data: session } = useSession()
  const [currentSession, setCurrentSession] = useState<IUser | undefined>(
    undefined
  )

  useEffect(() => {
    const token = getToken()
    const userData = Cookies.get("user_data")

    if (token && userData) {
      setCurrentSession({
        ...JSON.parse(userData),
        accessToken: token,
      })
    }
  }, [])

  const getToken = (): string | null => {
    return Cookies.get("access_token") || null
  }

  const addSession = (
    user: IUser,
    accessToken: string,
    refreshToken: string
  ) => {
    setCurrentSession(user)

    Cookies.set("access_token", accessToken, { expires: 7 }) // Expira em 7 dias
    Cookies.set("refresh_token", refreshToken, { expires: 30 }) // Expira em 30 dias
    Cookies.set("user_data", JSON.stringify(user), { expires: 7 })
  }

  const signUpWithGoogle = async () => {
    await signIn("google")

    const res = await fetch(`${process.env.SERVER_URL}/auth/signup/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...session?.user }),
    })

    if (!res.ok) {
      throw new Error(`Erro: ${res.status}`)
    }

    const data = await res.json()

    addSession(data.user, data.access_token, data.refresh_token)
    push(`/user/${data.user.username}`)
  }

  const signUp = async (formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    const res = await fetch(`${process.env.SERVER_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      throw new Error(`Erro: ${res.status}`)
    }

    const data = await res.json()

    addSession(data.user, data.access_token, data.refresh_token)
    push(`/user/${data.user.username}`)
  }

  const logout = async () => {
    setCurrentSession(undefined)

    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    Cookies.remove("user_data")

    await signOut()
  }

  return (
    <AuthContext.Provider
      value={{ currentSession,getToken, signUpWithGoogle, signUp, addSession, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context
}

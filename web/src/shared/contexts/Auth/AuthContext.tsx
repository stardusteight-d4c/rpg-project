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
import { MockAPI } from "@/shared/requests/MockAPI"

interface AuthState {
  currentSession: User | undefined
  signUp: (data: AuthRegisterRequest) => Promise<void>
  // addSession: (user: User, accessToken: string, refreshToken: string) => void
  // getToken: () => string | null
  // signUpWithGoogle: () => Promise<void>
  // logout: () => Promise<void>
}

const defaultState: AuthState = {
  currentSession: undefined,
  signUp: async () => {},
  // addSession: () => {},
  // getToken: () => null,
  // signUpWithGoogle: async () => {},
  // logout: async () => {},
}

const AuthContext = createContext<AuthState>(defaultState)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI()
  const { push } = useRouter()
  const [currentSession, setCurrentSession] = useState<User | undefined>(
    undefined
  )

   const getToken = (): string | null => {
    return Cookies.get("accessToken") || null
  }


  // useEffect(() => {
  //   const token = getToken()
  //   const userData = Cookies.get("user_data")

  //   if (token && userData) {
  //     setCurrentSession({
  //       ...JSON.parse(userData),
  //       accessToken: token,
  //     })
  //   }
  // }, [])

 
  const addSession = (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => {
    setCurrentSession(user)

    Cookies.set("accessToken", accessToken, { expires: 7 })
    Cookies.set("refreshToken", refreshToken, { expires: 30 })
    Cookies.set("currentSession", JSON.stringify(user), { expires: 7 })
  }

  // const signUpWithGoogle = async () => {
  //   await signIn("google")

  //   const res = await fetch(`${process.env.SERVER_URL}/auth/signup/google`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...session?.user }),
  //   })

  //   if (!res.ok) {
  //     throw new Error(`Erro: ${res.status}`)
  //   }

  //   const data = await res.json()

  //   addSession(data.user, data.access_token, data.refresh_token)
  //   push(`/user/${data.user.username}`)
  // }

  const signUp = async (data: AuthRegisterRequest) => {
    const res = await api.auth.register(data)

    addSession(res.user, res.accessToken, res.refreshToken)
    push(`/profile/${res.user.username}`)
  }

  const logout = async () => {
    setCurrentSession(undefined)

    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    Cookies.remove("currentSession")

    await signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        currentSession,
        signUp,
        // getToken,
        // signUpWithGoogle,
        // addSession,
        // logout,
      }}
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

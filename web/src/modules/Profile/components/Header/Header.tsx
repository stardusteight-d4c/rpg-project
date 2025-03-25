import { useAuth } from "@/shared/contexts"
import { Components } from "./components"
import React from "react"

export const Header: React.FC<{ user: IUser }> = ({ user }) => {
  const { currentSession } = useAuth()

  if (!currentSession) return null

  return (
    <Wrapper>
      <Components.Cover image={user.coverImage} />
      <Components.Actions user={user} />
      <Components.Avatar user={user} />
      <Components.Details user={user} />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const elements = React.Children.toArray(children)

  return (
    <header className="mt-[45px]">
      {elements[0]}
      <div className="max-w-7xl h-[150px] z-[500] mx-auto relative">
        {elements[1]}
        {elements[2]}
        {elements[3]}
      </div>
    </header>
  )
}

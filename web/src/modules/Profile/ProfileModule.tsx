"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { Profile } from "./components"

export function ProfileModule() {
  const [user, setUser] = useState<IUser | undefined>(undefined)
  const params = useParams()
  const username = params.username as string
  const { getByUsername, cachedUsers } = useUsers()

  useEffect(() => {
    ;(async () => {
      const foundUser = await getByUsername(username)
      setUser(foundUser!)
    })()
  }, [username, cachedUsers])

  if (!user) return null

  return (
    <Wrapper>
      <Profile.Navbar />
      <Profile.Header user={user} />
      <Profile.Sheets user={user} />
      <Profile.Campaigns user={user} />
      <Profile.Posts user={user} />
      <Profile.Footer />
    </Wrapper>
  )
}

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const elements = React.Children.toArray(children)

  return (
    <main className="w-screen relative">
      {elements[0]}
      {elements[1]}
      <div className="z-[500] max-w-7xl mb-[200px] mt-[80px] flex flex-col gap-y-[100px] w-full mx-auto">
        {elements[2]}
        {elements[3]}
        {elements[4]}
      </div>
      {elements[5]}
    </main>
  )
}

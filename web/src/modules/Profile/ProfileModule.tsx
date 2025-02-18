"use client"

import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Profile } from "./components"

export function ProfileModule() {
  const [user, setUser] = useState<IUser | undefined>(undefined)
  const params = useParams()
  const username = params.username as string
  const { getByUsername, users } = useUsers()

  useEffect(() => {
    ;(async () => {
      const foundUser = await getByUsername(username)
      setUser(foundUser!)
    })()
  }, [username, users])

  if (!user) return null

  return (
    <main className="w-screen relative">
      <Profile.Navbar />
      <Profile.Header user={user} />
      <div className="z-[500] max-w-7xl mb-[200px] -mt-4 flex flex-col gap-y-[100px] w-full mx-auto">
        <Profile.Sheets user={user} />
        <Profile.Campaigns />
        <Profile.LatestPosts />
      </div>
      <Profile.Footer />
    </main>
  )
}

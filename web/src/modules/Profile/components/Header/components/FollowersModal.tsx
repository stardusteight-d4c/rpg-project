"use client"

import { ModalWrapper } from "@/shared/components"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export const FollowersModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { push } = useRouter()
  const { addToast } = useToast()
  const { getFollowers } = useUsers()
  const [followers, setFollowers] = useState<IUser[]>([])

  useEffect(() => {
    ;(async () => {
      await getFollowers(user.id)
        .then((res) => {
          setFollowers(res)
        })
        .catch((error) => {
          addToast(error.message, "error", 45)
        })
    })()
  }, [user])

  return (
    <ModalWrapper
      title="Followers"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">
        <div className="space-y-2">
          {followers.map((follower) => (
            <div
              key={follower.id}
              onClick={() => push(`/profile/${follower.username}`)}
              className="flex bg-ashes p-2 cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
            >
              {follower.avatarUrl ? (
                <img
                  src={follower.avatarUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                />
              ) : (
                <div className="w-[48px] text-2xl font-bold text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full">
                  {getNameInitials(follower.name)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
                  {follower.name}
                </span>
                <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
                  #{follower.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}

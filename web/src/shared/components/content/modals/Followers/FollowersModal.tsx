"use client"

import { ModalWrapper } from "@/shared/components/ui"
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
        {followers.length === 0 && (
          <div className="w-full flex items-center justify-center">
            <div className="p-8 w-full h-[230px] bg-ashes rounded-xl flex flex-col items-center justify-center">
              <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#9ca3af"
                  viewBox="0 0 256 256"
                >
                  <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                </svg>
              </div>
              <span className="text-gray-400 block mt-2 w-[400px] text-center">
                The void responds with silence... but one day, the first adept
                will hear its call.
              </span>
            </div>
          </div>
        )}
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

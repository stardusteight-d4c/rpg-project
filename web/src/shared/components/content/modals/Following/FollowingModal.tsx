"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  EmptyState,
  Loader,
  ModalWrapper,
  Tooltip,
} from "@/shared/components/ui"
import { UserAvatar } from "@/shared/components/content"
import { useUsers, useToast, useAuth } from "@/shared/contexts"
import { Link as LinkIcon } from "@/shared/components/ui/icons"

export const FollowingModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { addToast } = useToast()
  const { getFollowing } = useUsers()
  const { currentSession } = useAuth()
  const [following, setFollowing] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await getFollowing(user.id)
        .then((res) => {
          setFollowing(res)
        })
        .catch((error) => {
          addToast(error.message, "error", 45)
        })
        .finally(() => setIsLoading(false))
    })()
  }, [user])

  return (
    <ModalWrapper
      title="Following"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>
      <div className="w-[700px] p-2">
        {following.length === 0 && (
          <EmptyState description="Not even the most insane occultists walk alone, there's always something whispering in the dark.">
            {isLoading ? <Loader /> : <LinkIcon />}
          </EmptyState>
        )}
        <div className="space-y-2">
          {following.map((userFollowing) => (
            <Link
              href={`/profile/${userFollowing.username}`}
              key={userFollowing.id}
              className="flex w-full p-2 bg-ashes cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
            >
              <UserAvatar
                name={userFollowing.name}
                username={userFollowing.username}
                avatarUrl={userFollowing.avatarUrl}
              />
              <div className="flex flex-col">
                <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
                  {userFollowing.name}
                </span>
                <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
                  #{userFollowing.username}
                </span>
              </div>

              {currentSession?.id === user.id && (
                <div className="ml-auto">
                  <Tooltip text="Unfollow" variant position="left">
                    <span className="w-fit bg-red-500 hover:brightness-110 flex items-center gap-x-2 cursor-pointer duration-300 ease-in-out transition-all p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="#FFFFFF"
                        viewBox="0 0 256 256"
                      >
                        <path d="M168,56a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H176A8,8,0,0,1,168,56Zm58.08,37.33a103.93,103.93,0,1,1-80.76-67.89,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A88,88,0,0,0,211,98.67a8,8,0,0,1,15.09-5.34ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
                      </svg>
                    </span>
                  </Tooltip>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}

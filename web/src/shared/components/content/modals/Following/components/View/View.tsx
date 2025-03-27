import React, { useState } from "react"
import { UserAvatar } from "@/shared/components/content/UserAvatar"
import { Loader, Tooltip } from "@/shared/components/ui"
import { UserCircleMinus } from "@/shared/components/ui/icons"
import { useAuth, useToast, useUsers } from "@/shared/contexts"
import { convertTimestamp } from "@/shared/utils"
import { useRouter } from "next/navigation"

export const View: React.FC<{ following: Follow[]; user: IUser }> = ({
  following,
  user,
}) => {
  const { push } = useRouter()
  const { addToast } = useToast()
  const { unfollow } = useUsers()
  const { currentSession } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (following.length === 0) return null

  const onUnfollow = async (userId: string) => {
    if (isLoading) return
    setIsLoading(true)
    await unfollow(userId, currentSession!.id)
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="space-y-2">
      {following.map((following) => (
        <div
          key={following.id}
          onClick={(e) => {
            const target = e.target as HTMLElement
            if (target.closest("button")) {
              e.preventDefault()
            } else {
              push(`/profile/${following.username}`)
            }
          }}
          className="flex w-full p-2 bg-ashes cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
        >
          <UserAvatar
            name={following.name}
            username={following.username}
            avatarUrl={following.avatarUrl}
          />
          <div className="flex flex-col">
            <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
              {following.name}
            </span>
            <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
              #{following.username}
            </span>
          </div>
          <div className="ml-auto text-sm flex flex-col text-gray-400">
            {convertTimestamp(following.createdAt)}
          </div>
          {currentSession?.id === user.id && (
            <Tooltip text="Unfollow" variant position="left">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onUnfollow(following.id)
                }}
                disabled={isLoading}
                className="bg-red-500 w-[36px] h-[36px] !fill-white text-white disabled:cursor-not-allowed disabled:brightness-90 hover:brightness-110 flex items-center cursor-pointer duration-300 ease-in-out transition-all p-1 rounded-full"
              >
                {isLoading ? <Loader /> : <UserCircleMinus />}
              </button>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  )
}

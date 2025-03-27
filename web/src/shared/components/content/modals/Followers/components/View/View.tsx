import { UserAvatar } from "@/shared/components/content/UserAvatar"
import { convertTimestamp } from "@/shared/utils"
import Link from "next/link"
import React from "react"

export const View: React.FC<{ followers: Follow[] }> = ({ followers }) => {
  if (followers.length === 0) return

  return (
    <div className="space-y-2">
      {followers.map((follower) => (
        <Link
          href={`/profile/${follower.username}`}
          key={follower.id}
          className="flex bg-ashes p-2 cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
        >
          <UserAvatar
            name={follower.name}
            username={follower.username}
            avatarUrl={follower.avatarUrl}
          />
          <div className="flex flex-col">
            <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
              {follower.name}
            </span>
            <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
              #{follower.username}
            </span>
          </div>
          <div className="ml-auto text-sm flex flex-col text-gray-400">
            {convertTimestamp(follower.createdAt)}
          </div>
        </Link>
      ))}
    </div>
  )
}

import { UserAvatar } from "@/shared/components/content/UserAvatar"
import { convertTimestamp } from "@/shared/utils"
import React from "react"

export const View: React.FC<{ notifications: INotification[] }> = ({
  notifications,
}) => {
  if (notifications.length === 0) return

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div className="p-2 relative border rounded-lg border-border bg-ashes z-20">
          <div className="text-gray-500/80 absolute right-2 top-1/2 -translate-y-1/2 select-none flex items-center gap-x-[2px] w-full justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#6b7280"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
            </svg>
            <span className="text-xs block max-h-[16px]">
              {convertTimestamp(notification.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <UserAvatar
                avatarUrl={notification.sender!.avatarUrl}
                name={notification.sender!.name}
                username={notification.sender!.username}
              />

              <div className="flex flex-col">
                <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                  {notification.sender?.name}
                </span>
                <span className="text-gray-400 -mt-1 block">
                  {notification.content}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

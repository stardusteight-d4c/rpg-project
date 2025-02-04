import { convertTimestamp } from "@/modules/Table/utils/convertTimestamp"
import React from "react"

export const PlayerNotification: React.FC<{ notification: INotification }> = ({
  notification,
}) => {
  return (
    <div className="flex p-2 border-b border-border select-none bg-background z-20 items-center gap-x-2">
      <img
        src={notification.by?.infos?.characterUrl}
        alt=""
        className="w-[48px] object-cover select-none pointer-events-none h-[48px] border border-border aspect-square rounded-full"
      />
      <div className="flex flex-col">
        <span className="block text-lg font-bold -tracking-wide">
          {notification.by?.infos?.name}
        </span>
        <span className="text-gray-400 -mt-1 text-sm whitespace-nowrap">
          {notification.content}
        </span>
      </div>
      <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
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
    </div>
  )
}

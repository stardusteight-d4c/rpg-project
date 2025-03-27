import React from "react"
import { ModalWrapper } from "@/shared/components/ui/ModalWrapper"
import { convertTimestamp } from "@/shared/utils"
import { UserAvatar } from "@/shared/components/content/UserAvatar"

export const NotificationsModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  return (
    <ModalWrapper
      title="Notifications"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="w-[700px]">
        <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>

        <div className="p-2 space-y-2">
          <div className="p-2 relative border rounded-lg border-border bg-ashes z-20">
            <div className="text-gray-500/80 absolute right-2 top-2 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
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
                {convertTimestamp(new Date().toISOString())}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-2">
                <UserAvatar
                  avatarUrl="https://avatars.githubusercontent.com/u/87643260?v=4"
                  name="Gabriel Sena"
                  username="stardust"
                />

                <div className="flex flex-col">
                  <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                    Gabriel Sena
                  </span>
                  <span className="text-gray-400 -mt-1 block">
                    Now it's following you!
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 relative border rounded-lg border-border bg-ashes z-20">
            <div className="text-gray-500/80 absolute right-2 top-2 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
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
                {convertTimestamp(new Date().toISOString())}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-2">
                <UserAvatar
                  avatarUrl="https://avatars.githubusercontent.com/u/87643260?v=4"
                  name="Gabriel Sena"
                  username="stardust"
                />

                <div className="flex flex-col">
                  <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                    Gabriel Sena
                  </span>
                  <span className="text-gray-400 -mt-1 block">
                    Invited you to a campaign:{" "}
                    <span className="underline text-blue-500 cursor-pointer">
                      A Assombração
                    </span>
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

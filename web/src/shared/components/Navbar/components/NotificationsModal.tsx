import React from "react"
import { ModalWrapper } from "../../ModalWrapper"
import { convertTimestamp } from "@/shared/utils/convertTimestamp"
import { useNotifications } from "@/shared/contexts/Notifications/NotificationsContext"
import { MasterNotification } from "@/modules/Table/components/Notifications/components/MasterNotification"
import { PlayerNotification } from "@/modules/Table/components/Notifications/components/PlayerNotification"

export const NotificationsModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
}> = ({ status, onStatusChange }) => {
  const { notifications, addNotification } = useNotifications()

  return (
    <ModalWrapper
      title="Notifications"
      status={status}
      onStatusChange={onStatusChange}
    >
      <div className="w-[700px]">
        <div className="border-b pb-2 -mt-2 border-border shadow-md shadow-black/50  w-full z-[200] bg-background"></div>

        <div className="p-2 space-y-2">
          {[
            'Invited you to the campaign "The Haunting", your key is: KKLPO-0258',
            "Started following you.",
          ].map((item, index) => (
            <div
              key={index}
              className="p-2 border rounded-lg border-border bg-background z-20 "
            >
              <div
                key={index}
                className="flex cursor-pointer items-center gap-x-2"
              >
                <span className="text-gray-400 block text-sm">#Starnine</span>
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
                    {convertTimestamp(new Date().toISOString())}
                  </span>
                </div>
              </div>
              <span className="text-base text-gray-400 block">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}

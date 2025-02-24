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
        <div className="border-b h-[1px] border-border shadow-md shadow-black/50  w-full z-[200] bg-background">
          {/* <div className="flex items-center gap-x-4">
            <div
              // onClick={handleClick}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-blue-500 duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M241.75,51.32a15.88,15.88,0,0,0-13.86-2.77l-3.48.94C205.61,54.56,170.61,64,128,64S50.39,54.56,31.59,49.49l-3.48-.94A16,16,0,0,0,8,64V192a16,16,0,0,0,16,16,16.22,16.22,0,0,0,4.18-.55l3.18-.86C50.13,201.49,85.17,192,128,192s77.87,9.49,96.69,14.59l3.18.86A16,16,0,0,0,248,192V64A15.9,15.9,0,0,0,241.75,51.32ZM27.42,64.93C46.94,70.2,83.27,80,128,80s81.06-9.8,100.58-15.07L232,64V182.76l-58.07-58.07a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L24,141.37V64ZM213.84,187.21a391.22,391.22,0,0,0-49-9L142.63,156l20-20ZM27.13,191.14,24,192V164l52-52,64.25,64.25q-6-.24-12.25-.25C83,176,45.28,186.23,27.13,191.14ZM192,108a12,12,0,1,1,12,12A12,12,0,0,1,192,108Z"></path>
                </svg>
              </button>
              <span>System</span>
            </div>
          </div> */}
        </div>

        {/* <div className="mt-2 space-y-2">
          <div
            // onClick={() => push(`/profile/${user.username}`)}
            className="flex p-2 cursor-pointer select-none bg-ashes rounded-lg z-20 items-center gap-x-2"
          >
            <img
              src="https://cdn.leonardo.ai/users/f59187cd-91ad-4718-a31d-e9b6e52d8864/generations/1fbb8579-1782-4e30-a161-8898fcb46776/Leonardo_Phoenix_10_A_stylish_animestyle_raccoon_like_the_Rock_2.jpg"
              alt=""
              referrerPolicy="no-referrer"
              className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
            />

            <div className="flex flex-col">
              <span className="block text-lg font-bold -tracking-wide">
                John Doe
              </span>
              <span className="text-gray-400 -mt-2 block text-sm">
                Now it's following you!
              </span>
            </div>
          </div>
        </div> */}
        <div className="p-2 space-y-2">
          {[
            'Invited you to the campaign "The Haunting", your key is: KKLPO-0258',
            "Started following you.",
          ].map((item, index) => (
            <div className="p-2 border rounded-lg border-border bg-background z-20 ">
              <div
                key={index}
                className="flex cursor-pointer items-center gap-x-2"
              >
                {/* <img
                  src="https://cdn.leonardo.ai/users/f59187cd-91ad-4718-a31d-e9b6e52d8864/generations/1fbb8579-1782-4e30-a161-8898fcb46776/Leonardo_Phoenix_10_A_stylish_animestyle_raccoon_like_the_Rock_2.jpg"
                  alt=""
                  className="w-[48px] object-cover select-none pointer-events-none h-[48px] border border-border aspect-square rounded-full"
                />
                <span className="block text-white whitespace-nowrap font-medium text-lg text-base -tracking-wide">
                  John Doe
                </span> */}
                  <img
                    src="https://cdn.leonardo.ai/users/f59187cd-91ad-4718-a31d-e9b6e52d8864/generations/1fbb8579-1782-4e30-a161-8898fcb46776/Leonardo_Phoenix_10_A_stylish_animestyle_raccoon_like_the_Rock_2.jpg"
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                  />

                  <div className="flex flex-col">
                    <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                      John Doe
                    </span>
                    <span className="text-gray-400 -mt-2 block text-sm">
                      #Starnine
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
                    {convertTimestamp(new Date().toISOString())}
                  </span>
                </div>
              </div>
              <span className="text-base text-gray-400 pt-1 block">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}

"use client"

import { ModalWrapper, Tooltip } from "@/shared/components"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"
import React, { use, useEffect, useState } from "react"

export const FollowingModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ status, onStatusChange, user }) => {
  const { push } = useRouter()
  const { addToast } = useToast()
  const { getFollowing } = useUsers()
  const [following, setFollowing] = useState<IUser[]>([])

  useEffect(() => {
    ;(async () => {
      await getFollowing(user.id)
        .then((res) => {
          setFollowing(res)
        })
        .catch((error) => {
          addToast(error.message, "error", 45)
        })
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
                  <path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path>
                </svg>
              </div>
              <span className="text-gray-400 block mt-2 w-[400px] text-center">
                Not even the most insane occultists walk alone, there's always
                something whispering in the dark.
              </span>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {following.map((userFollowing) => (
            <div
              key={userFollowing.id}
              onClick={() => push(`/profile/${userFollowing.username}`)}
              className="flex w-full p-2 bg-ashes cursor-pointer select-none border border-border rounded-lg z-20 items-center gap-x-2"
            >
              {userFollowing.avatarUrl ? (
                <img
                  src={userFollowing.avatarUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full"
                />
              ) : (
                <div className="w-[48px] text-2xl font-bold text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full">
                  {getNameInitials(userFollowing.name)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="block  whitespace-nowrap text-lg font-bold -tracking-wide">
                  {userFollowing.name}
                </span>
                <span className="text-gray-400 whitespace-nowrap -mt-2 block text-sm">
                  #{userFollowing.username}
                </span>
              </div>

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
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  )
}

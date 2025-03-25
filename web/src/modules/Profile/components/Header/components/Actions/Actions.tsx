import {
  EditProfileModal,
  FollowersModal,
  FollowingModal,
} from "@/shared/components/content/modals"
import { useAuth, useToast, useUsers } from "@/shared/contexts"
import React, { Fragment, useState } from "react"

export const Actions: React.FC<{ user: IUser }> = ({ user }) => {
  const { currentSession, updateSession } = useAuth()
  const { follow, unfollow } = useUsers()
  const { addToast } = useToast()
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenFollowingModal, setIsOpenFollowingModal] =
    useState<boolean>(false)
  const [isOpenFollowersModal, setIsOpenFollowersModal] =
    useState<boolean>(false)

  const onFollow = async () => {
    await follow(user.id, currentSession!.id)
      .then((updatedUser) => {
        updatedUser && updateSession(updatedUser)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
  }

  const onUnfollow = async () => {
    await unfollow(user.id, currentSession!.id)
      .then((updatedUser) => {
        updatedUser && updateSession(updatedUser)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
  }

  if (!currentSession) return

  return (
    <Fragment>
      <EditProfileModal
        status={isOpenEditModal}
        onStatusChange={setIsOpenEditModal}
        user={user}
      />
      <FollowingModal
        status={isOpenFollowingModal}
        onStatusChange={setIsOpenFollowingModal}
        user={user}
      />
      <FollowersModal
        status={isOpenFollowersModal}
        onStatusChange={setIsOpenFollowersModal}
        user={user}
      />
      <div className="absolute w-full  -top-[55px] left-[0px] flex items-center gap-x-2">
        {user.id !== currentSession.id && (
          <>
            {user.followers.includes(currentSession.id) ? (
              <span
                onClick={onUnfollow}
                className="bg-background hover:bg-red-500 flex items-center pr-3 gap-x-2 cursor-pointer shadow-sm shadow-black/50 duration-300 ease-in-out transition-all p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M168,56a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H176A8,8,0,0,1,168,56Zm58.08,37.33a103.93,103.93,0,1,1-80.76-67.89,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A88,88,0,0,0,211,98.67a8,8,0,0,1,15.09-5.34ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
                </svg>
                <span className="font-medium">Unfollow</span>
              </span>
            ) : (
              <span
                onClick={onFollow}
                className="bg-background flex items-center pr-3 gap-x-2 cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
                </svg>
                <span className="font-medium">Follow</span>
              </span>
            )}
          </>
        )}
        <span
          onClick={() => setIsOpenFollowingModal(true)}
          className="bg-background flex items-center pr-3 gap-x-2 cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path>
          </svg>
          <span className="font-medium">Following</span>
        </span>
        <span
          onClick={() => setIsOpenFollowersModal(true)}
          className="bg-background flex items-center pr-3 gap-x-2 cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
          </svg>
          <span className="font-medium">Followers</span>
        </span>
        {currentSession?.id === user.id && (
          <span
            onClick={() => setIsOpenEditModal(true)}
            className="bg-background cursor-pointer flex items-center gap-x-2 shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
            </svg>
          </span>
        )}
      </div>
    </Fragment>
  )
}

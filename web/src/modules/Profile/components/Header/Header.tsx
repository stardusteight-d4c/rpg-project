import { useState } from "react"
import { convertTimestamp } from "@/shared/utils"
import { useUsers, useAuth, useToast } from "@/shared/contexts"
import {
  EditProfileModal,
  FollowersModal,
  FollowingModal,
} from "@/shared/components/content/modals"
import { DonutChart } from "@/shared/components/ui"
import { UserAvatar } from "@/shared/components/content"

export const Header: React.FC<{ user: IUser }> = ({ user }) => {
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

  if (!currentSession) return null

  return (
    <header className="mt-[45px]">
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
      {user.coverImage ? (
        <img
          src={user.coverImage}
          alt=""
          className="pointer-events-none h-[327px] select-none w-screen overflow-hidden object-cover"
        />
      ) : (
        <div className="w-full h-[327px] bg-button"></div>
      )}
      <div className="max-w-7xl h-[150px] z-[500] mx-auto relative">
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

        <div className="w-full z-50 relative">
          {" "}
          <div className="absolute rounded-full shadow-md shadow-black/50  left-1/2 -translate-x-1/2  top-[-90px]">
            <DonutChart
              percentage={(user.exp!.current / user.exp!.nextLevel) * 100}
              strokeWidth={15}
              size={180}
              backgroundColor="#090909"
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[175px]">
            <h2 className="text-5xl capitalize leading-[70px] text-transparent bg-clip-text background-gradient pointer-events-none -mt-2 font-bold ">
              {user.name}
            </h2>
            <span className="block text-center text-3xl lowercase -mt-[15px] text-gray-400">
              #{user.username}
            </span>
          </div>
          <div className="w-[150px] h-[150px] rounded-full object-cover absolute left-1/2 -translate-x-1/2 top-[-75px]">
            <UserAvatar
              name={user.name}
              username={user.username}
              avatarUrl={user.avatarUrl}
              size={150}
              fontSize={60}
              bgColor="button"
            />
            <div className="bg-background pointer-events-none select-none text-lg font-bold shadow-sm shadow-black/50 absolute bottom-[0px] right-[0px] w-[32px] h-[32px] rounded-full flex items-center justify-center">
              {user.exp?.level}
            </div>
          </div>
          <div className="absolute text-sm flex flex-col items-start justify-start left-[0px] top-[4px]">
            <div className="text-gray-400 select-none flex items-center gap-x-[2px] mt-1 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
              </svg>
              <span className="text-xs block">
                Member since {convertTimestamp(user.memberSince)}
              </span>
            </div>
            {user.hoursPlayed !== 0 && (
              <div className="text-gray-400 select-none flex items-center gap-x-[2px] mt-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#9ca3af"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
                <span className="text-xs block">
                  {user.hoursPlayed} hours played
                </span>
              </div>
            )}
            {user.koalCampaigns !== 0 && (
              <div className="text-gray-400 select-none flex items-center gap-x-[2px] mt-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#9ca3af"
                  viewBox="0 0 256 256"
                >
                  <path d="M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z"></path>
                </svg>
                <span className="text-xs block">
                  Keeper of Arcane Lore of {user.koalCampaigns} campaigns
                </span>
              </div>
            )}
            {user.playingCampaigns !== 0 && (
              <div className="text-gray-400 select-none flex items-center gap-x-[2px] mt-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#9ca3af"
                  viewBox="0 0 256 256"
                >
                  <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
                </svg>
                <span className="text-xs block">
                  Playing in {user.playingCampaigns} campaigns
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

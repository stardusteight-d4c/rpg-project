import { DonutChart, GlowingWrapper, ModalWrapper } from "@/shared/components"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { convertTimestamp } from "@/shared/utils/convertTimestamp"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useState } from "react"

export const Header: React.FC<{ user: IUser }> = ({ user }) => {
  const { currentSession } = useAuth()
  const { update } = useUsers()
  const [editableData, setEditableData] = useState({
    id: user.id,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
    coverImage: user.coverImage,
    coverImageFile: undefined,
    avatarUrlFile: undefined,
  })
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)

  const handleModal = (value: boolean) => {
    if (value === true) return setIsOpenEditModal(true)
    if (value === false) {
      setEditableData({
        id: user.id,
        name: user.name,
        username: user.username,
        avatarUrl: user.avatarUrl,
        coverImage: user.coverImage,
        coverImageFile: undefined,
        avatarUrlFile: undefined,
      })
      return setIsOpenEditModal(false)
    }
  }

  const handleEdit = (field: string, value: any) => {
    setEditableData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)

      handleEdit("coverImage", tempUrl)
      handleEdit("coverImageFile", file)
    }
  }

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)

      handleEdit("avatarUrl", tempUrl)
      handleEdit("avatarUrlFile", file)
    }
  }

  const handleCoverClick = () => {
    const fileInput = document.getElementById(
      "file-input-cover"
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value })
  }

  const handleProfileClick = () => {
    const fileInput = document.getElementById(
      "file-input-profile"
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const onSave = async () => {
    const { coverImageFile, avatarUrlFile, ...data } = editableData
    const updatedUser = await update(data)
    if (updatedUser) {
      setIsOpenEditModal(false)
    }
  }

  return (
    <>
      {isOpenEditModal === true && (
        <ModalWrapper
          title="Edit Profile"
          onStatusChange={handleModal}
          status={isOpenEditModal}
        >
          <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-sm shadow-black/50 top-0 w-full inset-x-0 bg-background">
            <div className="flex items-center gap-x-4">
              <div
                onClick={onSave}
                className="cursor-pointer w-fit flex items-center group gap-x-2"
              >
                <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-green-500 duration-300 ease-in-out transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </button>
                <span>Save Changes</span>
              </div>
            </div>
          </div>
          <input
            id="file-input-cover"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverFileChange}
          />
          <input
            id="file-input-profile"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarFileChange}
          />
          <div className="w-[700px] p-2 h-fit">
            <div className="relative h-fit">
              {editableData.coverImage ? (
                <img
                  onClick={handleCoverClick}
                  src={editableData.coverImage}
                  alt=""
                  className="cursor-pointer rounded-md w-full h-[198px] select-none overflow-hidden object-cover"
                />
              ) : (
                <div
                  onClick={handleCoverClick}
                  className="group cursor-pointer rounded-md w-full h-[198px] flex items-center justify-center  bg-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                    className="hidden group-hover:block bg-background rounded-full p-2 cursor-pointer "
                  >
                    <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
                  </svg>
                </div>
              )}
              {editableData.avatarUrl ? (
                <img
                  src={editableData.avatarUrl}
                  alt=""
                  onClick={handleProfileClick}
                  className="w-[100px] absolute cursor-pointer left-1/2 -translate-x-1/2 -bottom-[50px] select-none h-[100px] rounded-full object-cover"
                />
              ) : (
                <div
                  onClick={handleProfileClick}
                  className="group bg-button cursor-pointer w-[100px] absolute left-1/2 -translate-x-1/2 -bottom-[50px] flex items-center text-center justify-center h-[100px] rounded-full select-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    fill="#FFFFFF"
                    viewBox="0 0 256 256"
                    className="hidden group-hover:block bg-background rounded-full p-2"
                  >
                    <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-[65px] w-full">
              <div className="col-span-1">
                <label
                  htmlFor="name"
                  className="text-gray-400 text-sm w-full block cursor-pointer"
                >
                  Name
                </label>
                <GlowingWrapper inset="0" border="rounded-md">
                  <input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    spellCheck="false"
                    type="text"
                    value={editableData.name}
                    onChange={handleChange}
                    className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-md bg-ashes border border-border outline-none"
                  />
                </GlowingWrapper>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="username"
                  className="text-gray-400 text-sm w-full block cursor-pointer"
                >
                  Username
                </label>
                <GlowingWrapper inset="0" border="rounded-md">
                  <input
                    id="username"
                    name="username"
                    placeholder="johnnybgoode"
                    spellCheck="false"
                    type="text"
                    value={editableData.username}
                    onChange={handleChange}
                    className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-md bg-ashes border border-border outline-none"
                  />
                </GlowingWrapper>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
      {user.coverImage ? (
        <img
          src={user.coverImage}
          alt=""
          className="pointer-events-none h-[372px] select-none w-screen overflow-hidden object-cover"
        />
      ) : (
        <div className="w-full h-[372px] bg-button"></div>
      )}
      <div className="max-w-7xl h-[150px] z-[500] mx-auto relative">
        <div className="absolute -top-[55px] left-[0px] flex items-center gap-x-2">
          {user.id !== currentSession?.id && (
            <span className="bg-background cursor-pointer shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
              </svg>
            </span>
          )}
          <span className="bg-background cursor-pointer flex items-center gap-x-2 shadow-sm shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
            </svg>
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
              // percentage={100}
              strokeWidth={15}
              size={180}
              backgroundColor="#090909"
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-[175px]">
            <h2 className="text-5xl capitalize leading-[70px] text-transparent bg-clip-text background-gradient pointer-events-none -mt-2 font-bold ">
              {user.name}
            </h2>
            <span className="block text-center text-3xl lowercase -mt-[15px] text-gray-500/80">
              #{user.username}
            </span>
          </div>
          <div className="w-[150px] h-[150px] rounded-full object-cover absolute left-1/2 -translate-x-1/2 top-[-75px]">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="w-[150px] pointer-events-none select-none h-[150px] rounded-full object-cover"
              />
            ) : (
              <div className="bg-button w-[150px] flex items-center text-center justify-center h-[150px] rounded-full select-none pointer-events-none">
                <span className="text-6xl font-bold">
                  {getNameInitials(user.name)}
                </span>
              </div>
            )}

            <div className="bg-background pointer-events-none select-none text-lg font-bold shadow-sm shadow-black/50 absolute bottom-[0px] right-[0px] w-[32px] h-[32px] rounded-full flex items-center justify-center">
              {user.exp?.level}
            </div>
          </div>
          <div className="absolute text-sm flex flex-col items-start justify-start left-[0px] top-[4px]">
            <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#6b7280"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
              </svg>
              <span className="text-xs block">
                Member since {convertTimestamp(user.memberSince)}
              </span>
            </div>
            {user.hoursPlayed !== 0 && (
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
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
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
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
              <div className="text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
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
    </>
  )
}

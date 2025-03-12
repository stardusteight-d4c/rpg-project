import { GlowingWrapper, ModalWrapper } from "@/shared/components/ui"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { useUsers } from "@/shared/contexts/Users/UsersContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { UserAvatar } from "../../UserAvatar"

export const EditProfileModal: React.FC<{
  status: boolean
  onStatusChange: (value: boolean) => void
  user: IUser
}> = ({ user, status, onStatusChange }) => {
  const { replace } = useRouter()
  const { addToast } = useToast()
  const { update } = useUsers()
  const { updateSession } = useAuth()
  const [editableData, setEditableData] = useState({
    id: user.id,
    name: user.name,
    username: user.username,
    avatarUrl: user.avatarUrl,
    coverImage: user.coverImage,
    coverImageFile: undefined,
    avatarUrlFile: undefined,
  })

  const handleModal = (value: boolean) => {
    if (value === true) return onStatusChange(true)
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
      return onStatusChange(false)
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

  const onRemoveProfileImage = () => {
    setEditableData({
      ...editableData,
      avatarUrl: undefined,
      avatarUrlFile: undefined,
    })
  }

  const onRemoveCoverImage = () => {
    setEditableData({
      ...editableData,
      coverImage: undefined,
      coverImageFile: undefined,
    })
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

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ]+$/
    const usernameRegex = /^[a-z0-9]+$/

    if (!nameRegex.test(data.name)) {
      return addToast(`The name must follow the format "Name Surname"`, "error")
    }

    if (!usernameRegex.test(data.username)) {
      return addToast(
        "The username must be in lowercase, have at least 4 characters and contain only letters and numbers.",
        "error"
      )
    }

    await update(data)
      .then((updatedUser) => {
        onStatusChange(false)
        addToast("The profile has been updated!", "success", 45)
        updatedUser && updateSession(updatedUser)
        updatedUser && replace(`/profile/${updatedUser.username}`)
      })
      .catch((error) => {
        onStatusChange(false)
        addToast(error.message, "error")
      })
  }

  return (
    <ModalWrapper
      title="Editing Profile"
      onStatusChange={handleModal}
      status={status}
    >
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <div
            onClick={handleProfileClick}
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
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120ZM68.67,208A64.36,64.36,0,0,1,87.8,182.2a64,64,0,0,1,80.4,0A64.36,64.36,0,0,1,187.33,208ZM208,208h-3.67a79.9,79.9,0,0,0-46.68-50.29,48,48,0,1,0-59.3,0A79.9,79.9,0,0,0,51.67,208H48V48H208V208Z"></path>
              </svg>
            </button>
            <span>Upload Profile Image</span>
          </div>
          <div
            onClick={handleCoverClick}
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
            <span>Upload Cover Image</span>
          </div>
          <div
            onClick={onSave}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-green-500 duration-300 ease-in-out transition-all">
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
            <div className="group">
              <img
                src={editableData.coverImage}
                alt=""
                className="rounded-md w-full h-[198px] select-none overflow-hidden object-cover"
              />
              <button
                onClick={onRemoveCoverImage}
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 hidden group-hover:block hover:bg-red-500 bg-background rounded-full p-1 cursor-pointer duration-300 ease-in-out transition-all shadow-md shadow-black/50 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-82.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className="group rounded-md w-full h-[198px] flex items-center justify-center bg-ashes border border-border" />
          )}
          <div className="w-[100px] group absolute left-1/2 -translate-x-1/2 -bottom-[50px] select-none h-[100px] rounded-full object-cover">
            <UserAvatar
              name={editableData.name}
              username={editableData.username}
              avatarUrl={editableData.avatarUrl}
              size={100}
              fontSize={36}
              cursor="default"
            />
            {editableData.avatarUrl && (
              <button
                onClick={onRemoveProfileImage}
                className="hidden z-50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:block hover:bg-red-500 bg-background rounded-full p-1 cursor-pointer duration-300 ease-in-out transition-all shadow-md shadow-black/50 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-82.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </button>
            )}
          </div>
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
  )
}

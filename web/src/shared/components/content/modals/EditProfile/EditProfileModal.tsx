import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, GlowingWrapper, ModalWrapper } from "@/shared/components/ui"
import { useToast, useUsers, useAuth } from "@/shared/contexts"
import { UserAvatar } from "@/shared/components/content"
import { Check, Panorama, UserSquare } from "@/shared/components/ui/icons"
import { EditProfileHandler } from "./EditProfileHandler"

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
  const editProfileHandler = new EditProfileHandler(
    addToast,
    update,
    updateSession,
    replace
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditableData((prev) =>
      editProfileHandler.getUpdatedData(prev, e.target.name, e.target.value)
    )
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) {
    setEditableData((prev) =>
      editProfileHandler.getUpdatedFileData(prev, e, field)
    )
  }

  function handleRemoveImage(field: string) {
    setEditableData((prev) =>
      editProfileHandler.getUpdatedRemovedImage(prev, field)
    )
  }

  return (
    <ModalWrapper
      title="Editing Profile"
      onStatusChange={onStatusChange}
      status={status}
    >
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <Button
            title="Upload Profile Image"
            action={() => editProfileHandler.click("file-input-profile")}
            bgColor="blue"
            variant="modal"
          >
            <UserSquare />
          </Button>
          <Button
            title="Upload Cover Image"
            action={() => editProfileHandler.click("file-input-cover")}
            bgColor="blue"
            variant="modal"
          >
            <Panorama />
          </Button>
          <Button
            title="Save Changes"
            action={() =>
              editProfileHandler.onEdit(editableData, onStatusChange)
            }
            bgColor="green"
            variant="modal"
          >
            <Check />
          </Button>
        </div>
      </div>
      <input
        id="file-input-cover"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, "cover")}
      />
      <input
        id="file-input-profile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e, "avatar")}
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
                onClick={() => handleRemoveImage("cover")}
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
                onClick={() => handleRemoveImage("avatar")}
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

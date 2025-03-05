"use client"

import { GlowingWrapper, ModalWrapper } from "@/shared/components"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { timeago } from "@/shared/utils/timeago"
import { ChangeEvent, useEffect, useRef, useState } from "react"

interface PostEditProps {
  post: IPost
  setOpenEditPost: (value: boolean) => void
}

export const PostEdit = ({ post, setOpenEditPost }: PostEditProps) => {
  const { update, remove } = usePosts()
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [postData, setPostData] = useState<IPost>(post)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)

  useEffect(() => {
    adjustHeight()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const tempUrl = URL.createObjectURL(file)
      setImageFile(file)
      handlePostData("image", tempUrl)
      // URL.revokeObjectURL(tempUrl)
    }
  }

  const handleClick = () => {
    const fileInput = document.getElementById(
      `file-input-post-${post.id}`
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  function adjustHeight() {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const onSave = () => {
    if (loading) return null
    setLoading(true)
    update(postData)
      .then(() => {
        addToast("The post has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setPostData(postData)
        setOpenEditPost(false)
        setLoading(false)
      })
  }

  const onDelete = () => {
    if (loading) return null
    setLoading(true)
    remove(postData.id)
      .then(() => {
        addToast("The post has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setPostData(postData)
        setOpenEditPost(false)
        setLoading(false)
      })
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    adjustHeight()
    setPostData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handlePostData = (field: string, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <ModalWrapper
        status={openDeleteModal}
        onStatusChange={setOpenDeleteModal}
      >
        <div className="w-[500px] p-4">
          <h3 className="block text-3xl font-bold text-red-500">Warning!</h3>
          <div className="flex flex-col mt-4 gap-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="58"
              height="58"
              fill="#ef4444"
              viewBox="0 0 256 256"
            >
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
            <span className="block w-[300px] text-center text-gray-400">
              You are about to delete this post. This action cannot be undone!
            </span>
            <button
              onClick={onDelete}
              className={`${
                loading
                  ? " cursor-not-allowed brightness-90 "
                  : " cursor-pointer hover:brightness-125 "
              } p-2 mt-2 w-full flex items-center justify-center max-h-[45px] font-medium text-center text-lg bg-red-500 text-white rounded-full`}
            >
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#FFFFFF"
                  className="animate-spin"
                  viewBox="0 0 256 256"
                >
                  <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                </svg>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </ModalWrapper>
      <input
        id={`file-input-post-${post.id}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
        <div className="flex items-center gap-x-4">
          <button
            onClick={handleClick}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <div className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-blue-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
              </svg>
            </div>
            <span>Upload a Image</span>
          </button>
          {postData.image && (
            <div
              onClick={() => {
                setImageFile(undefined)
                handlePostData("image", undefined)
              }}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
              <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-red-500 duration-300 ease-in-out transition-all">
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
              <span className="capitalize">Remove Image</span>
            </div>
          )}

          <button
            onClick={() => setOpenDeleteModal(true)}
            className="cursor-pointer w-fit flex items-center group gap-x-2"
          >
            <div className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-red-500 duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
            </div>
            <span className="capitalize">Delete Post</span>
          </button>
          <button
            onClick={onSave}
            className={`${
              loading ? " cursor-not-allowed " : " group cursor-pointer "
            }  w-fit flex justify-center items-center gap-x-2`}
          >
            {loading ? (
              <div className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all">
                <div className="w-fit mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#FFFFFF"
                    className="animate-spin"
                    viewBox="0 0 256 256"
                  >
                    <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-green-500 duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </div>
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </div>
      <div className="w-[700px] p-2">
        <div className="p-4 border-border border rounded-xl">
          <div>
            <div className="flex select-none z-20 items-center gap-x-2">
              {post.owner.avatarUrl ? (
                <img
                  src={post.owner.avatarUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                />
              ) : (
                <div className="w-[48px] text-2xl font-bold text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full">
                  {getNameInitials(post.owner.name)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                  {postData.owner.name}
                </span>
                <span className="text-gray-400 -mt-2 block text-sm">
                  #{postData.owner.username}
                </span>
              </div>
              <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
                <span className="text-xs block">
                  {timeago(postData.createdAt)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6b7280"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="py-4">
            <GlowingWrapper inset="0">
              <textarea
                onChange={(e) => handleInputChange(e)}
                value={postData.content}
                spellCheck="false"
                ref={textareaRef}
                className="block border-border rounded-md p-2 relative z-[50] antialiased border bg-background h-fit resize-none overflow-y-hidden no-scrollbar w-full cursor-text outline-none"
              />
            </GlowingWrapper>
          </div>

          {postData.image && (
            <div>
              <img
                src={postData.image}
                alt=""
                className="w-full max-h-[300px] h-fit rounded-xl border border-border bg-button overflow-hidden object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

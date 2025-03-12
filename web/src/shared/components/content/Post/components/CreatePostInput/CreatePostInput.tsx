"use client"

import { useParams } from "next/navigation"
import React, { ChangeEvent, useState } from "react"
import { GlowingWrapper } from "@/shared/components/ui"
import { usePosts, useAuth, useToast } from "@/shared/contexts"
import { getNameInitials } from "@/shared/utils"
import { UserAvatar } from "../../../UserAvatar"

export const CreatePostInput: React.FC<{
  currentPage?: number
  isFeed?: boolean
}> = ({ currentPage, isFeed }) => {
  const { add } = usePosts()
  const { currentSession } = useAuth()
  const { addToast } = useToast()
  const campaignId = useParams().id as string
  const [loading, setLoading] = useState<boolean>(false)
  const [postData, setPostData] = useState<Partial<IPost>>({
    id: "",
    content: "",
    comments: [],
    createdAt: "",
    image: undefined,
    owner: currentSession!,
    likes: [],
  })
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setPostData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handlePostData = (field: string, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

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
      "file-input-post"
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const onPost = async () => {
    if (loading) return null
    setLoading(true)
    add({ ...(postData as IPost), campaignId }, currentPage)
      .then(() => {
        addToast("The post has been created!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setPostData({
          id: "",
          content: "",
          comments: [],
          createdAt: "",
          image: undefined,
          owner: currentSession!,
          likes: [],
        })
        setImageFile(undefined)
        setLoading(false)
      })
  }

  if (!currentSession) return null

  return (
    <div className="relative z-[100]">
      <div className="flex flex-col items-start gap-x-4">
        {isFeed && (
          <div className="flex pb-2 select-none bg-background z-20 items-center gap-x-2">
            <UserAvatar
              name={currentSession.name}
              username={currentSession.username}
              avatarUrl={currentSession.avatarUrl}
            />
            <div className="flex flex-col">
              <span className="block text-lg font-bold -tracking-wide">
                {currentSession?.name}
              </span>
              <span className="text-gray-400 -mt-2 block text-sm">
                #{currentSession?.username}
              </span>
            </div>
          </div>
        )}
        <div className="rounded-xl w-full">
          <GlowingWrapper
            styles="w-full"
            border="rounded-xl rounded-b-none"
            inset="0"
          >
            <textarea
              onChange={(e) => handleInputChange(e)}
              value={postData.content}
              placeholder={
                isFeed
                  ? "Write it down... but don't read it out loud."
                  : "Say something about this campaign..."
              }
              spellCheck="false"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  onPost()
                }
              }}
              className="p-2 bg-background h-[100px]  resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl rounded-b-none border border-border outline-none"
            />
          </GlowingWrapper>
          <div className="flex rounded-b-xl w-full items-center gap-x-2 px-4 py-2 bg-border">
            <input
              id="file-input-post"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onClick={handleClick}
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
                  <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
                </svg>
              </button>
              <span>Upload a Image</span>
            </div>

            {imageFile && (
              <div className="flex items-center gap-x-2">
                <span className="truncate max-w-[300px] text-sm text-gray-400 ml-2">
                  {imageFile.name}
                </span>
                <span
                  onClick={() => {
                    setImageFile(undefined)
                    handlePostData("image", undefined)
                  }}
                  className="text-red-500 underline cursor-pointer"
                >
                  Remove
                </span>
              </div>
            )}
            {loading ? (
              <button className="bg-background cursor-not-allowed ml-auto flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all">
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
              </button>
            ) : (
              <button
                onClick={onPost}
                className="bg-background ml-auto flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

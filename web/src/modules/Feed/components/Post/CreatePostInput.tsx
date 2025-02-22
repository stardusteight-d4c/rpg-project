"use client"

import { GlowingWrapper } from "@/shared/components"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import React, { ChangeEvent, useState } from "react"
import { useParams } from "next/navigation"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"

export const CreatePostInput: React.FC<{
  onPostCreated?: () => void
  currentPage?: number
}> = ({ onPostCreated, currentPage }) => {
  const { add } = usePosts()
  const { currentSession } = useAuth()
  const { addToast } = useToast()
  const campaignId = useParams().id as string
  const [loading, setLoading] = useState<boolean>(false)
  const [postData, setPostData] = useState<IPost>({
    id: "",
    content: "",
    comments: [],
    createdAt: "",
    image: undefined,
    owner: currentSession!,
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
    const fileInput = document.getElementById("file-input") as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const onPost = async () => {
    setLoading(true)
    add({ ...postData, campaignId }, currentPage)
      .then(() => {
        onPostCreated && onPostCreated()
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
        })
        setLoading(false)
        setImageFile(undefined)
      })
  }

  return (
    <div className="relative z-[100]">
      <div className="flex items-start gap-x-4 bottom-0 inset-x-0">
        {/* <img
          src={currentSession.avatarUrl}
          alt=""
          className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
        /> */}

        <div className="rounded-xl w-full">
          <GlowingWrapper
            styles="w-full"
            border="rounded-xl rounded-b-none"
            inset="0"
          >
            <textarea
              onChange={(e) => handleInputChange(e)}
              value={postData.content}
              placeholder="Say something about this campaign..."
              spellCheck="false"
              className="p-2 bg-background h-[100px]  resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl rounded-b-none border border-border outline-none"
            />
          </GlowingWrapper>
          <div className="flex rounded-b-xl w-full items-center gap-x-2 px-4 py-2 bg-border">
            <input
              id="file-input"
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
                    fill="#6b7280"
                    className="animate-spin"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
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

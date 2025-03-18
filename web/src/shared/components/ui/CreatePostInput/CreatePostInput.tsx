"use client"

import { useParams } from "next/navigation"
import React, { ChangeEvent, useState } from "react"
import { Button, GlowingWrapper } from "@/shared/components/ui"
import { usePosts, useAuth, useToast } from "@/shared/contexts"
import { UserAvatar } from "@/shared/components/content"
import { Image, PaperPlaneTilt } from "@/shared/components/ui/icons"

export const CreatePostInput: React.FC<{
  currentPage?: number
  isFeed?: boolean
}> = ({ currentPage, isFeed }) => {
  const { add } = usePosts()
  const { currentSession } = useAuth()
  const { addToast } = useToast()
  const campaignId = useParams().id as string
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  const handleSendPost = () => {
    const fileInput = document.getElementById(
      "send-post-button"
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const onPost = async () => {
    if (isLoading) return null
    setIsLoading(true)
    await add({ ...(postData as IPost), campaignId }, currentPage)
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
        setIsLoading(false)
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
            disabled={isLoading}
            styles="w-full"
            border="rounded-xl rounded-b-none"
            inset="0"
          >
            <textarea
              disabled={isLoading}
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
                  handleSendPost()
                }
              }}
              className="p-2 disabled:cursor-not-allowed disabled:brightness-90 bg-background h-[100px]  resize-none overflow-y-scroll no-scrollbar w-full cursor-text focus:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-xl rounded-b-none border border-border outline-none"
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

            <Button
              action={handleClick}
              title="Upload a Image"
              variant="modal"
              bgColor="blue"
              disabled={isLoading}
            >
              <Image />
            </Button>

            {imageFile && (
              <div className="flex items-center gap-x-2">
                <span className="truncate max-w-[300px] text-sm text-gray-400 ml-2">
                  {imageFile.name}
                </span>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setImageFile(undefined)
                    handlePostData("image", undefined)
                  }}
                  className="text-red-500 disabled:cursor-not-allowed underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
            <Button
              id="send-post-button"
              action={onPost}
              bgColor="gradientBlue"
              variant="icon"
              title="Send"
              className="ml-auto"
            >
              <PaperPlaneTilt />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

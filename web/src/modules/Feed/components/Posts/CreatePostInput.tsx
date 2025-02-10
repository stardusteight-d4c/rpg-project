"use client"

import { GlowingWrapper } from "@/shared/components"
import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { currentSession } from "@/shared/contexts/Users/mock-data"
import { ChangeEvent, useState } from "react"

const userCampaigns = [
  {
    id: "a136d71c-c2fb-421a-8cb8-ab2413d64ee7",
    type: "campaign",
    value: "Beyond_the_Mountains_of_Madness",
    linkId: "c84df9de-5834-43ef-a526-d838a77e75dc",
  },
]

const userFriends = [
  {
    id: "bf4100c9-db08-4a63-9b6c-18f6cc71c7f6",
    type: "user",
    value: "blackwive",
    linkId: "4d6f7287-2e27-4389-bccb-c5beaf761a7d",
  },
  {
    id: "5e081598-5f15-414e-86a6-d20bf3497550",
    type: "user",
    value: "lohvanna",
    linkId: "5e081598-5f15-414e-86a6-d20bf3497550",
  },
]

export const CreatePostInput = () => {
  const { addPost } = useFeed()
  const [postData, setPostData] = useState<IPost>({
    id: "",
    content: "",
    comments: [],
    createdAt: "",
    image: undefined,
    tags: [],
    user: currentSession,
  })
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setPostData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handlePostData = (field: string, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

  function handleCheckEdit(data: {
    type: "user" | "campaign"
    value: string
    linkId: string
  }) {
    const itemExists = postData.tags.some((item) => item.linkId === data.linkId)

    if (itemExists) {
      const updatedTags = postData.tags.filter((item) => item.linkId !== data.linkId)
      handlePostData("tags", updatedTags)
    } else {
      const updatedData = [data, ...postData.tags]
      handlePostData("tags", updatedData)
    }
  }

  function handleCheckbox(data: {
    type: "user" | "campaign"
    value: string
    linkId: string
  }): boolean {
    return postData.tags.some((item) => item.linkId === data.linkId)
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

  const onPost = () => {
    addPost({
      ...postData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })
    setPostData({
      id: "",
      content: "",
      comments: [],
      createdAt: "",
      image: undefined,
      tags: [],
      user: currentSession,
    })
    setImageFile(undefined)
  }

  return (
    <div className="mb-[40px] relative z-[100]">
      <div className="flex items-start gap-x-4 p-2 bottom-0 inset-x-0">
        <img
          src={currentSession.avatar_url}
          alt=""
          className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
        />

        <div className="shadow-sm shadow-black/50 rounded-3xl w-full">
          <GlowingWrapper
            styles="w-full"
            border="rounded-3xl rounded-b-none"
            inset="0"
          >
            <textarea
              onChange={(e) => handleInputChange(e)}
              value={postData.content}
              placeholder="Make a post"
              spellCheck="false"
              className="p-2 bg-background h-[100px]  resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-3xl rounded-b-none border border-border outline-none"
            />
          </GlowingWrapper>
          <div className="flex rounded-b-3xl w-full items-center gap-x-2 px-4 py-2 bg-border">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => handleClick()}
              className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all"
            >
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

            {/*  */}

            <div className="group w-fit h-fit z-50 relative">
              <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path>
                </svg>
              </button>
              <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[500] group-hover:flex flex-col w-fit no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                {userCampaigns.map((campaign: any) => (
                  <li
                    key={campaign.id}
                    onClick={() => handleCheckEdit(campaign)}
                    className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                  >
                    <div className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        id={campaign.id}
                        style={{ display: "none" }}
                        checked={handleCheckbox(campaign)}
                        className="cbx2 !ml-0 !w-fit !px-0"
                      />
                      <label
                        htmlFor={campaign.id}
                        className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                      >
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                      <span>#{campaign.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/*  */}
            <div className="group w-fit h-fit z-50 relative">
              <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                </svg>
              </button>
              <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[500] group-hover:flex flex-col w-fit no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
                {userFriends.map((campaign: any) => (
                  <li
                    key={campaign.id}
                    onClick={() => handleCheckEdit(campaign)}
                    className="whitespace-nowrap cursor-pointer flex items-center gap-x-2 hover:brightness-125 hover:bg-border/50 p-3"
                  >
                    <div className="check cursor-pointer !ml-0 !w-fit !px-0 flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        id={campaign.id}
                        style={{ display: "none" }}
                        checked={handleCheckbox(campaign)}
                        className="cbx2 !ml-0 !w-fit !px-0"
                      />
                      <label
                        htmlFor={campaign.id}
                        className="check !ml-0 !w-fit !px-0 pointer-events-none select-none"
                      >
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                      <span>#{campaign.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/*  */}

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
            <button
              onClick={onPost}
              className="background-gradient ml-auto flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all"
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
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import ReactDOM from "react-dom"
import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { currentSession } from "@/shared/contexts/Users/mock-data"
import { timeago } from "@/shared/utils/timeago"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Fade, Zoom } from "react-awesome-reveal"

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

interface PostEditProps {
  post: IPost
  setOpenEditPost: (value: boolean) => void
}

export const PostEdit = ({ post, setOpenEditPost }: PostEditProps) => {
  const { updatePost } = useFeed()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [postData, setPostData] = useState<IPost>(post)

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
    updatePost(postData.id, postData)
    setPostData(postData)
    setOpenEditPost(false)
  }

  function handleCheckEdit(data: {
    type: "user" | "campaign"
    value: string
    linkId: string
  }) {
    const itemExists = postData.tags.some((item) => item.linkId === data.linkId)

    if (itemExists) {
      const updatedTags = postData.tags.filter(
        (item) => item.linkId !== data.linkId
      )
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

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    adjustHeight()
    setPostData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handlePostData = (field: string, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

  return ReactDOM.createPortal(
    <div className="w-screen flex items-center justify-center h-screen overflow-y-scroll py-28 inset-0 !z-[700] fixed">
      <Fade
        duration={500}
        className="transform backdrop-blur-sm fixed !z-[600] inset-0 w-screen h-screen"
      >
        <div onClick={() => setOpenEditPost(false)} className="w-full h-full" />
      </Fade>

      <Zoom
        className="!z-[800] border shadow-md shadow-black/50 border-border rounded-3xl p-4 bg-background"
        duration={300}
      >
        <div className="flex z-[800] relative w-[841px] bg-background border border-border rounded-3xl pt-2 flex-col">
          <div className="max-h-[300px] no-scrollbar overflow-y-scroll">
            <div>
              <div className="flex select-none px-4 z-20 items-center gap-x-2">
                <img
                  src={postData.owner.avatarUrl}
                  alt=""
                  className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                />
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
              <div className="px-4 mt-1 flex items-center gap-1 flex-wrap">
                {postData.tags.map((tag) => (
                  <span
                    key={tag.linkId}
                    className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer"
                  >
                    #{tag.value}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4">
              <textarea
                onChange={(e) => handleInputChange(e)}
                value={postData.content}
                spellCheck="false"
                ref={textareaRef}
                className="block border-blue-500 relative z-[999] antialiased border bg-background h-fit resize-none overflow-y-scroll no-scrollbar w-full cursor-text outline-none"
              />
            </div>

            {postData.image && (
              <div className="px-4">
                <img
                  src={postData.image}
                  alt=""
                  className="w-full my-2 rounded-3xl border border-border bg-button overflow-hidden object-cover"
                />
              </div>
            )}
          </div>
          <div
            className={`rounded-b-3xl px-4 py-2 bg-border flex flex-col gap-y-2`}
          >
            <div className="flex items-center gap-x-2">
              {currentSession.id === postData.owner.id && (
                <div className="flex items-center gap-x-2 w-full">
                  {!postData.image && (
                    <>
                      <input
                        id={`file-input-post-${post.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <button
                        onClick={() => handleClick()}
                        className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all"
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
                    </>
                  )}
                  {postData.image && (
                    <div
                      onClick={() => {
                        setImageFile(undefined)
                        handlePostData("image", undefined)
                      }}
                      className="cursor-pointer w-fit flex items-center group gap-x-2"
                    >
                      <button className="bg-red-500 flex items-center justify-center text-white p-1 rounded-full shadow-p duration-300 ease-in-out transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#FFFFFF"
                          viewBox="0 0 256 256"
                        >
                          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                        </svg>
                      </button>
                      <span className="capitalize">Delete image</span>
                    </div>
                  )}
                  <div className="group w-fit h-fit z-50 relative">
                    <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-button duration-300 ease-in-out transition-all">
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
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                              >
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
                  <div className="group w-fit h-fit z-50 relative">
                    <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-button duration-300 ease-in-out transition-all">
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
                    <ul className="top-full left-1/2 -translate-x-1/2  bg-background rounded-2xl shadow-p border border-border hidden absolute z-[200] group-hover:flex flex-col w-fit no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
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
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                              >
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

                  <div className="ml-auto flex items-center gap-x-4">
                    <div
                      onClick={() => setOpenEditPost(false)}
                      className="cursor-pointer w-fit flex items-center group gap-x-2"
                    >
                      <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 group-hover:bg-button duration-300 ease-in-out transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#FFFFFF"
                          viewBox="0 0 256 256"
                        >
                          <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                        </svg>
                      </button>
                      <span>Cancel</span>
                    </div>
                    <div
                      onClick={onSave}
                      className="cursor-pointer w-fit flex items-center group gap-x-2"
                    >
                      <button className="bg-green-500 flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all">
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
              )}
            </div>
          </div>
        </div>
      </Zoom>
    </div>,
    document.body
  )
}

"use client"

import { GlowingWrapper, ModalWrapper } from "@/shared/components"
import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { currentSession } from "@/shared/contexts/Users/mock-data"
import { timeago } from "@/shared/utils/timeago"
import { ChangeEvent, useEffect, useRef, useState } from "react"

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

export const Post = ({ post }: { post: IPost }) => {
  const { deletePost, updatePost } = useFeed()
  const [showComments, setShowComments] = useState<boolean>(false)
  const [postData, setPostData] = useState<IPost>(post)
  const [isEditPost, setIsEditPost] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [openDeleteModal, setOpenDeleteModal] = useState<"open" | "close">(
    "close"
  )

  useEffect(() => {
    adjustHeight()
  }, [isEditPost])

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
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const onSave = () => {
    updatePost(postData.id, postData)
    setPostData(postData)
    setIsEditPost(false)
  }

  const onEdit = () => {
    if (isEditPost) {
      setPostData(post)
      setIsEditPost(false)
    } else {
      setIsEditPost(true)
    }
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

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    adjustHeight()
    setPostData((prev) => ({ ...prev, content: e.target.value }))
  }

  const handlePostData = (field: string, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }))
  }

  const onDelete = () => {
    deletePost(postData.id)
  }

  return (
    <div className="flex relative bg-background w-full border border-border rounded-3xl pt-2 flex-col gap-y-1">
      {openDeleteModal === "open" && (
        <ModalWrapper
          status={openDeleteModal}
          onStatusChange={setOpenDeleteModal}
        >
          <div className="w-[500px] p-4">
            {" "}
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
                You are about to delete your postData. This action cannot be
                undone!
              </span>
              <button
                onClick={onDelete}
                className="p-2 mt-2 w-full hover:brightness-125 font-medium text-center text-lg bg-red-500 text-white rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
      <div className="flex select-none px-4 z-20 items-center gap-x-2">
        <img
          src={postData.user.avatar_url}
          alt=""
          className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
        />
        <div className="flex flex-col">
          <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
            {postData.user.name}
          </span>
          <span className="text-gray-400 -mt-2 block text-sm">
            #{postData.user.username}
          </span>
        </div>
        <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
          <span className="text-xs block">{timeago(postData.createdAt)}</span>
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

      <div className="px-4">
        <textarea
          onChange={(e) => handleInputChange(e)}
          value={postData.content}
          spellCheck="false"
          ref={textareaRef}
          className={`${
            !isEditPost &&
            " opacity-0 invisible absolute z-0 pointer-events-none select-none "
          } block border-blue-500 border rounded-md bg-background h-fit resize-none overflow-y-scroll no-scrollbar w-full cursor-text outline-none`}
        />
        {!isEditPost && (
          <span className="block whitespace-pre-wrap">{postData.content}</span>
        )}
      </div>

      {postData.image && (
        <div className="px-4">
          <img
            src={postData.image}
            alt=""
            className="w-full rounded-3xl bg-button overflow-hidden object-cover"
          />
        </div>
      )}
      <div
        className={`${
          showComments ? " rounded-b-none" : " rounded-b-3xl "
        } px-4 py-2 bg-border mt-2 flex flex-col gap-y-2`}
      >
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className={`${
              showComments
                ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
                : " bg-background hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] "
            }  flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50  duration-300 ease-in-out transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
            </svg>
          </button>
          <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path>
            </svg>
          </button>
          <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#FFFFFF"
              viewBox="0 0 256 256"
            >
              <path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path>
            </svg>
          </button>
          {currentSession.id === postData.user.id && (
            <div className="flex items-center gap-x-2 ml-auto">
              {isEditPost && !postData.image && (
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
                </>
              )}
              {isEditPost && postData.image && (
                <div
                  onClick={() => {
                    setImageFile(undefined)
                    handlePostData("image", undefined)
                  }}
                  className="cursor-pointer w-fit flex items-center group gap-x-2"
                >
                  <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-red-500 duration-300 ease-in-out transition-all">
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
                // <span

                //   className="text-red-500 underline cursor-pointer"
                // >
                //   Delete image
                // </span>
              )}
              <button
                onClick={onEdit}
                className={`${
                  isEditPost ? " background-gradient " : " bg-background "
                } flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </button>
              {isEditPost && (
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
              )}
              {isEditPost && (
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
                  <ul className="left-1/2 -translate-x-1/2 bg-background rounded-2xl shadow-p border border-border top-full hidden absolute z-[200] group-hover:flex flex-col w-fit no-scrollbar max-h-[300px] overflow-y-scroll gap-y-1">
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
              )}

              {isEditPost && (
                <button
                  onClick={onSave}
                  className="bg-green-500 flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 duration-300 ease-in-out transition-all"
                >
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
              )}
              {!isEditPost && (
                <button
                  onClick={() => setOpenDeleteModal("open")}
                  className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all"
                >
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
              )}
            </div>
          )}
        </div>
        {showComments && postData.comments.length !== 0 && (
          <div className="mt-2">
            {postData.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex select-none z-20 items-center gap-x-2"
              >
                <img
                  src={comment.user.avatar_url}
                  alt=""
                  className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                />
                <div className="flex flex-col">
                  <span className="block">{comment.content}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showComments && (
        <div className="p-4">
          <div className="bg-background flex items-center gap-x-4 p-2 bottom-0 inset-x-0">
            <GlowingWrapper styles="w-full" border="rounded-3xl" inset="0">
              <input
                // onChange={(e) => handleInputChange(e)}
                // value={newNotification}
                placeholder="Send a comment"
                spellCheck="false"
                className="p-2 px-4  shadow-sm shadow-black/50 resize-none overflow-y-scroll no-scrollbar w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded-3xl bg-border/50 border border-border outline-none"
              />
            </GlowingWrapper>

            <span
              // onClick={onSend}
              className="flex hover:brightness-125 active:scale-95 transition-all duration-300 ease-in-out items-center  justify-center text-white p-2 rounded-full w-fit  shadow-sm shadow-black/50 cursor-pointer bg-button"
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
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

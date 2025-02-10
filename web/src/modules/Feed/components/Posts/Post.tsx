"use client"

import { GlowingWrapper, ModalWrapper } from "@/shared/components"
import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { currentSession } from "@/shared/contexts/Users/mock-data"
import { timeago } from "@/shared/utils/timeago"
import { useState } from "react"
import { PostEdit } from "./PostEdit"

export const Post = ({ post }: { post: IPost }) => {
  const { deletePost } = useFeed()
  const [showComments, setShowComments] = useState<boolean>(false)
  const [openEditPost, setOpenEditPost] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<"open" | "close">(
    "close"
  )

  const onDelete = () => {
    deletePost(post.id)
  }

  return (
    <div className="flex relative bg-background w-full border border-border rounded-3xl pt-2 flex-col gap-y-1">
      {openEditPost && (
        <PostEdit post={post} setOpenEditPost={setOpenEditPost} />
      )}
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
              You are about to delete your post. This action cannot be undone!
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

      <div className="flex select-none px-4 z-20 items-center gap-x-2">
        <img
          src={post.user.avatar_url}
          alt=""
          className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
        />
        <div className="flex flex-col">
          <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
            {post.user.name}
          </span>
          <span className="text-gray-400 -mt-2 block text-sm">
            #{post.user.username}
          </span>
        </div>
        <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
          <span className="text-xs block">{timeago(post.createdAt)}</span>
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
        {post.tags.map((tag) => (
          <span
            key={tag.linkId}
            className="text-gray-400 bg-ashes px-2 border border-border rounded-full w-fit block cursor-pointer"
          >
            #{tag.value}
          </span>
        ))}
      </div>

      <span className="block whitespace-pre-wrap px-4">{post.content}</span>

      {post.image && (
        <div className="px-4">
          <img
            src={post.image}
            alt=""
            className="w-full mt-2 rounded-3xl bg-button overflow-hidden object-cover"
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
          {currentSession.id !== post.user.id && (
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
          )}
          {currentSession.id === post.user.id && (
            <div className="flex items-center gap-x-2 ml-auto">
              <button
                onClick={() => setOpenEditPost(true)}
                className={`${
                  openEditPost ? " background-gradient " : " bg-background "
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
            </div>
          )}
        </div>

        {/* COMMENTS */}

        {showComments && post.comments.length !== 0 && (
          <div className="mt-2">
            {post.comments.map((comment) => (
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

"use client"

import { GlowingWrapper, ModalWrapper } from "@/shared/components"
import { timeago } from "@/shared/utils/timeago"
import { useState } from "react"
import { PostEdit } from "./PostEdit"
import { Comment } from "./Comment"
import { CommentInput } from "./CommentInput"
import { useRouter } from "next/navigation"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"

export const Post = ({ post }: { post: IPost }) => {
  const { push } = useRouter()
  const [postState, setPostState] = useState<IPost>({
    ...post,
    likesCount: post.likesCount ?? 0,
  })
  const { like, unlike } = usePosts()
  const { addToast } = useToast()
  const { currentSession } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [openEditPost, setOpenEditPost] = useState<boolean>(false)

  const onLike = () => {
    if (loading) return
    setLoading(true)
    like(post.id, currentSession!.id)
      .then(() => {
        setPostState((prev) => ({
          ...prev,
          likedByUser: true,
          likesCount: prev.likesCount!++,
        }))
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onUnlike = () => {
    if (loading) return
    setLoading(true)
    unlike(post.id, currentSession!.id)
      .then(() => {
        setPostState((prev) => ({
          ...prev,
          likedByUser: false,
          likesCount: prev.likesCount === 0 ? 0 : prev.likesCount!--,
        }))
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="flex relative bg-background w-full border border-border rounded-xl pt-4 flex-col">
      <ModalWrapper
        title="Editing Post"
        onStatusChange={setOpenEditPost}
        status={openEditPost}
      >
        <PostEdit post={post} setOpenEditPost={setOpenEditPost} />
      </ModalWrapper>
      <div className="flex px-4 z-20 items-center gap-x-2">
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => push(`/profile/${post.owner.username}`)}
        >
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
              {post.owner.name}
            </span>
            <span className="text-gray-400 -mt-2 block text-sm">
              #{post.owner.username}
            </span>
          </div>
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

      <span className="block whitespace-pre-wrap overflow-hidden p-4">
        {post.content}
      </span>

      {post.image && (
        <div className="px-4">
          <img
            src={post.image}
            alt=""
            className="w-full max-h-[300px] h-fit mb-2 border border-border rounded-xl bg-button overflow-hidden object-cover"
          />
        </div>
      )}
      <div className="px-4 flex items-center gap-x-2">
        <span className="text-gray-400 flex items-center gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#9ca3af"
            viewBox="0 0 256 256"
          >
            <path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path>
          </svg>
          {post.likesCount ?? 0} Flames
        </span>
        <span className="text-gray-400 flex items-center gap-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#9ca3af"
            viewBox="0 0 256 256"
          >
            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
          </svg>
          {post.commentsCount ?? 0}{" "}
          {post.commentsCount! === 1 ? "Comment" : "Comments"}
        </span>
      </div>

      <div
        className={`${
          showComments ? " pb-0 " : " pb-2 rounded-b-xl "
        } pt-2 rounded-b-xl bg-border mt-2 flex flex-col gap-y-2`}
      >
        <div className="px-4 flex items-center gap-x-2">
          {post.likes.includes(currentSession!.id) ? (
            <button
              onClick={onUnlike}
              className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9225 2.23105C17.7992 2.12856 17.6531 2.05721 17.4965 2.02301C17.3399 1.98882 17.1773 1.99278 17.0225 2.03457C16.8678 2.07636 16.7253 2.15474 16.6072 2.26312C16.489 2.3715 16.3987 2.50669 16.3438 2.6573L13.5938 10.2085L10.5737 7.2823C10.4723 7.18393 10.3512 7.10817 10.2184 7.06001C10.0856 7.01185 9.94403 6.99238 9.80313 7.00289C9.66223 7.01341 9.52516 7.05365 9.40095 7.12099C9.27674 7.18833 9.1682 7.28122 9.0825 7.39355C6.375 10.941 5 14.5098 5 17.9998C5 20.9172 6.15893 23.7151 8.22183 25.778C10.2847 27.8409 13.0826 28.9998 16 28.9998C18.9174 28.9998 21.7153 27.8409 23.7782 25.778C25.8411 23.7151 27 20.9172 27 17.9998C27 10.5685 20.6513 4.4998 17.9225 2.23105ZM22.9862 19.1673C22.7269 20.6157 22.0301 21.9498 20.9896 22.9902C19.949 24.0305 18.6147 24.7271 17.1663 24.986C17.1113 24.9955 17.0557 25.0001 17 24.9998C16.7492 24.9997 16.5075 24.9054 16.323 24.7355C16.1384 24.5656 16.0245 24.3326 16.0037 24.0826C15.9829 23.8326 16.0569 23.5839 16.2108 23.3859C16.3648 23.1879 16.5876 23.055 16.835 23.0135C18.9062 22.6648 20.6637 20.9073 21.015 18.8323C21.0594 18.5707 21.2059 18.3375 21.4223 18.184C21.6387 18.0304 21.9072 17.9691 22.1688 18.0135C22.4303 18.058 22.6635 18.2045 22.8171 18.4209C22.9706 18.6372 23.0319 18.9057 22.9875 19.1673H22.9862Z"
                  fill="url(#paint0_linear_169_11)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_169_11"
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="28.9998"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stop-color="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          ) : (
            <button
              onClick={onLike}
              className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z"></path>
              </svg>
            </button>
          )}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`${
              showComments
                ? " bg-gradient-to-tr from-[#42d392] to-[#8B5CF6] "
                : " bg-background hover:bg-button "
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

          {currentSession?.id !== post.owner.id && (
            <button className="bg-background flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all">
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
          {currentSession?.id === post.owner.id && (
            <div className="flex items-center gap-x-2 ml-auto">
              <button
                onClick={() => setOpenEditPost(true)}
                className={`${
                  openEditPost ? " background-gradient " : " bg-background "
                } flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all `}
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
            </div>
          )}
        </div>

        {showComments && post.comments.length !== 0 && (
          <div className="px-4 mt-2">
            {post.comments.map((comment) => (
              <Comment comment={comment} postId={post.id} />
            ))}
          </div>
        )}
        {showComments && <CommentInput postId={post.id} />}
      </div>
    </div>
  )
}

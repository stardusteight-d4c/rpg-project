"use client"

import { ModalWrapper } from "@/shared/components"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { getNameInitials } from "@/shared/utils/getNameInitials"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

interface CommentProps {
  postId: string
  comment: IComment
}

export const Comment = ({ comment }: CommentProps) => {
  const { currentSession } = useAuth()
  const { push } = useRouter()
  const { updateComment, deleteComment } = usePosts()
  const { addToast } = useToast()
  const commentRef = useRef<HTMLInputElement>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const [editableComment, setEditableComment] = useState<IComment>(comment)
  const [editComment, setEditComment] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const handleEditableComment = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableComment((prev) => ({ ...prev, content: e.target.value }))
  }

  const onDelete = async () => {
    deleteComment(comment)
      .then(() => {
        addToast("Comment has been deleted!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setEditComment(false)
      })
  }

  const onUpdate = async () => {
    updateComment({
      ...editableComment,
      content: editableComment.content.trim(),
    })
      .then(() => {
        addToast("Comment has been updated!", "success", 45)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setEditComment(false)
      })
  }
  if (!currentSession) return null

  return (
    <div className="flex relative group z-20 gap-x-2">
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
              You are about to delete this comment. This action cannot be
              undone!
            </span>
            <button
              onClick={onDelete}
              className={`cursor-pointer hover:brightness-125 p-2 mt-2 w-full flex items-center justify-center max-h-[45px] font-medium text-center text-lg bg-red-500 text-white rounded-full`}
            >
              Delete
            </button>
          </div>
        </div>
      </ModalWrapper>
      <ModalWrapper
        title="Editing Comment"
        status={editComment}
        onStatusChange={setEditComment}
      >
        <div className="py-2 px-4 sticky z-[200] border-b border-border shadow-md shadow-black/50 top-0 w-full inset-x-0 bg-background">
          <div className="flex items-center gap-x-4">
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
              <span className="capitalize">Delete Comment</span>
            </button>
            <button
              onClick={onUpdate}
              className="cursor-pointer w-fit flex items-center group gap-x-2"
            >
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
              <span>Save Changes</span>
            </button>
          </div>
        </div>
        <div className="w-[700px] p-2">
          <div className="p-4 border-border border rounded-xl">
            <div>
              <div className="flex select-none z-20 items-center gap-x-2">
                {comment.owner.avatarUrl ? (
                  <img
                    src={comment.owner.avatarUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-[48px] aspect-square object-cover select-none pointer-events-none h-[48px] rounded-full"
                  />
                ) : (
                  <div className="w-[48px] text-2xl font-bold text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full">
                    {getNameInitials(comment.owner.name)}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="block whitespace-nowrap text-lg font-bold -tracking-wide">
                    {comment.owner.name}
                  </span>
                  <span className="text-gray-400 -mt-2 block text-sm">
                    #{comment.owner.username}
                  </span>
                </div>
                {/* <div className="ml-auto text-gray-500/80 select-none flex items-center gap-x-[2px] mt-1 w-full justify-end">
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
                       </div> */}
              </div>
              <div className="flex flex-col mt-2 h-full w-full">
                <input
                  onChange={(e) => handleEditableComment(e)}
                  value={editableComment.content}
                  spellCheck="false"
                  ref={commentRef}
                  className={`p-2 px-4 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 rounded-full bg-border/50 border border-border outline-none`}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
      {currentSession.id === comment.owner.id && (
        <button
          onClick={() => setEditComment(true)}
          className={`${
            editComment
              ? " background-gradient flex "
              : " bg-background hidden "
          } absolute right-0 top-0 group-hover:flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#FFFFFF"
            viewBox="0 0 256 256"
          >
            <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
          </svg>
        </button>
      )}

      {comment.owner.avatarUrl ? (
        <img
          src={comment.owner.avatarUrl}
          alt=""
          onClick={() => push(`/profile/${comment.owner.username}`)}
          className="w-[48px] z-10 aspect-square object-cover cursor-pointer h-[48px] rounded-full"
        />
      ) : (
        <div className="w-[48px] text-2xl font-bold bg-background text-white flex items-center justify-center aspect-square object-cover select-none pointer-events-none h-[48px] border border-border rounded-full">
          {getNameInitials(comment.owner.name)}
        </div>
      )}

      <div className="flex flex-col gap-y-1 my-auto h-full w-full">
        <span ref={spanRef} className="my-auto h-fit overflow-hidden">
          {comment.content}
        </span>
      </div>
    </div>
  )
}

"use client"

import { currentSession } from "@/shared/contexts/Users/mock-data"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

interface CommentProps {
  postId: string
  comment: {
    id: string
    owner: IUser
    content: string
    createdAt: string
  }
}

export const Comment = ({ comment, postId }: CommentProps) => {
  const { push } = useRouter()
  const [isEditComment, setIsEditComment] = useState<boolean>(false)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const [editableComment, setEditableComment] = useState<IComment>(comment)

  const handleEditableComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableComment((prev) => ({ ...prev, content: e.target.value }))
    adjustHeight()
  }

  const adjustHeight = () => {
    const comment = commentRef.current

    if (comment) {
      comment.style.height = "auto"
      comment.style.height = `${comment.scrollHeight}px`
    }
  }

  useEffect(() => {
    if (spanRef.current && commentRef.current) {
      commentRef.current.style.height = `${spanRef.current.offsetHeight}px`
    }
  }, [])

  // const onUpdate = () => {
  //   updateComment(postId, {
  //     ...editableComment,
  //     content: editableComment.content.trim(),
  //   })
  //   setIsEditComment(false)
  // }

  return (
    <>
      <div key={comment.id} className="flex mb-4 relative group z-20 gap-x-2">
        {currentSession.id === comment.owner.id && (
          <>
          {!isEditComment && (
              <button
                onClick={() => setIsEditComment(true)}
                className={`${
                  isEditComment ? " background-gradient " : " bg-background "
                } hidden absolute right-0 top-0 group-hover:flex items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all `}
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
          </>
        )}

        <img
          src={comment.owner.avatarUrl}
          alt=""
          onClick={() => push(`/profile/${comment.owner.username}`)}
          className="w-[48px] z-10 aspect-square object-cover cursor-pointer h-[48px] rounded-full"
        />

        <div className="flex flex-col gap-y-1 my-auto h-full w-full">
          <textarea
            onChange={(e) => handleEditableComment(e)}
            value={editableComment.content}
            spellCheck="false"
            ref={commentRef}
            className={`${
              isEditComment ? " block " : " hidden "
            }  border-blue-500 rounded-md relative z-[999] antialiased border bg-transparent h-fit resize-none overflow-y-scroll no-scrollbar w-full cursor-text outline-none`}
          />
          {isEditComment && (
            <div className="flex items-center gap-x-2 ml-auto">
              <span
                onClick={() => {
                  setIsEditComment(false)
                  setEditableComment(comment)
                }}
                className="underline text-gray-400/70 text-sm cursor-pointer"
              >
                Cancel
              </span>
              <span
                // onClick={() => deleteComment(postId, comment.id)}
                className="underline text-gray-400/70 text-sm cursor-pointer hover:text-red-500"
              >
                Delete
              </span>
              <span
                // onClick={onUpdate}
                className="underline text-green-500 text-sm cursor-pointer"
              >
                Update
              </span>
            </div>
          )}

          <span
            ref={spanRef}
            className={`${
              !isEditComment ? " block " : " hidden "
            } my-auto h-fit overflow-hidden`}
          >
            {comment.content}
          </span>
        </div>
      </div>
    </>
  )
}

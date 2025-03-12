"use client"

import { useRef, useState } from "react"
import { useAuth } from "@/shared/contexts"
import { EditCommentModal } from "@/shared/components/content/modals"
import { UserAvatar } from "@/shared/components/content"

interface CommentProps {
  comment: IComment
}

export const Comment = ({ comment }: CommentProps) => {
  const { currentSession } = useAuth()
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const [editComment, setEditComment] = useState<boolean>(false)

  if (!currentSession) return null

  return (
    <div className="flex relative group z-20 gap-x-2">
      <EditCommentModal
        status={editComment}
        onStatusChange={setEditComment}
        comment={comment}
      />
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

      <UserAvatar
        name={comment.owner.name}
        username={comment.owner.username}
        avatarUrl={comment.owner.avatarUrl}
      />

      <div className="flex flex-col gap-y-1 my-auto h-full w-full">
        <span ref={spanRef} className="my-auto h-fit overflow-hidden">
          {comment.content}
        </span>
      </div>
    </div>
  )
}

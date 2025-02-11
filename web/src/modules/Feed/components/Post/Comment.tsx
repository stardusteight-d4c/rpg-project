"use client"

import { currentSession } from "@/shared/contexts/Users/mock-data"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CommentProps {
  comment: {
    id: string
    user: IUser
    content: string
    createdAt: string
  }
}

export const Comment = ({ comment }: CommentProps) => {
  const [onEditComment, setOnEditComment] = useState<boolean>(false)
  const { push } = useRouter()

  return (
    <>
      <div
        key={comment.id}
        className="flex relative select-none z-20 items-start gap-x-2"
      >
        {currentSession.id === comment.user.id && (
          <button
            onClick={() => setOnEditComment(true)}
            className={`${
              onEditComment ? " background-gradient " : " bg-background "
            } flex absolute  items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50 hover:bg-button duration-300 ease-in-out transition-all `}
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
        )}
        <img
          src={comment.user.avatar_url}
          alt=""
          onClick={() => push(`/profile/${comment.user.username}`)}
          className="w-[48px] z-10 aspect-square object-cover select-none cursor-pointer h-[48px] rounded-full"
        />
        <span className="block">{comment.content}</span>
      </div>
    </>
  )
}

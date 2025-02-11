"use client"

import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { currentSession } from "@/shared/contexts/Users/mock-data"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

interface CommentProps {
  postId: string
  comment: {
    id: string
    user: IUser
    content: string
    createdAt: string
  }
}

export const Comment = ({ comment, postId }: CommentProps) => {
  const { push } = useRouter()
  const { updateComment } = useFeed()
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

  const onUpdate = () => {
    updateComment(postId, editableComment)
    setIsEditComment(false)
  }

  return (
    <>
      <div
        key={comment.id}
        className="flex relative group select-none z-20 items-start gap-x-2"
      >
        <img
          src={comment.user.avatar_url}
          alt=""
          onClick={() => push(`/profile/${comment.user.username}`)}
          className="w-[48px] z-10 aspect-square object-cover select-none cursor-pointer h-[48px] rounded-full"
        />
        <div className="flex flex-col gap-y-1 w-full">
          <textarea
            onChange={(e) => handleEditableComment(e)}
            value={editableComment.content}
            spellCheck="false"
            ref={commentRef}
            className={`${
              currentSession.id === comment.user.id && " mr-[50px] "
            } ${
              isEditComment ? " block " : " hidden "
            } border-blue-500 rounded-md relative z-[999] antialiased border bg-transparent h-fit resize-none overflow-y-scroll no-scrollbar w-full cursor-text outline-none`}
          />

          <span
            ref={spanRef}
            className={`${
              currentSession.id === comment.user.id && " mr-[50px] "
            } ${
              !isEditComment ? " block " : " hidden "
            } my-auto whitespace-pre-wrap overflow-hidden`}
          >
            {comment.content}
          </span>

          {currentSession.id === comment.user.id && (
            <div className="ml-auto flex items-center gap-x-2">
              {isEditComment ? (
                <span
                  onClick={() => {
                    setIsEditComment(false)
                    setEditableComment(comment)
                  }}
                  className="underline text-gray-400/70 text-sm cursor-pointer"
                >
                  Cancel
                </span>
              ) : (
                <span
                  onClick={() => setIsEditComment(true)}
                  className="underline text-gray-400/70 text-sm cursor-pointer hover:text-blue-500"
                >
                  Edit
                </span>
              )}
              {isEditComment && (
                <span
                  onClick={onUpdate}
                  className="underline text-green-500 text-sm cursor-pointer"
                >
                  Update
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

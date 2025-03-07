"use client"

import { GlowingWrapper } from "@/shared/components/ui"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import { useToast } from "@/shared/contexts/Toaster/ToasterContext"
import { ChangeEvent, useState } from "react"

export const CommentInput = ({ postId }: { postId: string }) => {
  const { currentSession } = useAuth()
  const { comment } = usePosts()
  const { addToast } = useToast()
  const [isSending, setIsSending] = useState<boolean>(false)
  const [commentData, setCommentData] = useState<IComment>({
    id: "",
    postId,
    content: "",
    createdAt: "",
    owner: currentSession,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCommentData((prev) => ({ ...prev, content: e.target.value }))
  }

  const onSend = () => {
    if (isSending) return null
    setIsSending(true)
    comment(commentData)
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setCommentData({
          id: "",
          postId,
          content: "",
          createdAt: "",
          owner: currentSession,
        })
        setIsSending(false)
      })
  }

  return (
    <div className="p-4 sticky top-[45px] inset-x-0 z-[100] bg-background border border-border shadow-sm shadow-black/50 rounded-b-xl">
      <div className="flex items-center gap-x-4 p-2 bottom-0 inset-x-0">
        <GlowingWrapper styles="w-full" border="rounded-3xl" inset="0">
          <input
            onChange={(e) => handleInputChange(e)}
            value={commentData.content}
            placeholder="Send a comment"
            spellCheck="false"
            className="p-2 px-4 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 rounded-full bg-border/50 border border-border outline-none"
          />
        </GlowingWrapper>

        <button
          onClick={(e) => {
            e.preventDefault()
            onSend()
          }}
          disabled={isSending}
          className="flex hover:brightness-125 active:scale-95 items-center  justify-center text-white p-2 rounded-full w-fit shadow-sm shadow-black/50 cursor-pointer bg-background border border-border hover:border-transparent hover:bg-gradient-to-tr hover:from-[#42d392] hover:to-[#8B5CF6] duration-300 ease-in-out transition-all"
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
  )
}

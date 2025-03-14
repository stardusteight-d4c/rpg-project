"use client"

import { ChangeEvent, useState } from "react"
import { GlowingWrapper, Loader } from "@/shared/components/ui"
import { usePosts, useToast, useAuth } from "@/shared/contexts"
import { PaperPlaneTilt } from "@/shared/components/ui/icons"

export const CommentInput = ({ postId }: { postId: string }) => {
  const { currentSession } = useAuth()
  const { comment } = usePosts()
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  async function onSend() {
    if (isLoading) return null
    setIsLoading(true)
    await comment(commentData)
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
        setIsLoading(false)
      })
  }

  return (
    <div className="p-4 sticky top-[45px] inset-x-0 z-[100] bg-background border border-border shadow-sm shadow-black/50 rounded-b-xl">
      <div className="flex items-center gap-x-4 p-2 bottom-0 inset-x-0">
        <GlowingWrapper styles="w-full" border="rounded-3xl" inset="0">
          <input
            onChange={(e) => handleInputChange(e)}
            value={commentData.content}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onSend()
              }
            }}
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
          data-isLoading={isLoading}
          disabled={isLoading}
          className="bg-background flex hover:brightness-125 active:scale-95 items-center  justify-center text-white p-2 rounded-full w-fit shadow-sm shadow-black/50 cursor-pointer border border-border disabled:cursor-not-allowed data-[isLoading=false]:hover:border-transparent data-[isLoading=false]:hover:bg-gradient-to-tr data-[isLoading=false]:hover:from-[#42d392] data-[isLoading=false]:hover:to-[#8B5CF6] duration-300 ease-in-out transition-all"
        >
          {isLoading ? <Loader /> : <PaperPlaneTilt />}
        </button>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { usePosts, useToast } from "@/shared/contexts"
import { Comment, CommentInput, Actions } from "./components"

export const Footer: React.FC<{
  post: IPost
  openEditPostModal: boolean
  onOpenEditPostModal: (value: boolean) => void
}> = ({ post, openEditPostModal, onOpenEditPostModal }) => {
  const { getCommentsByPost } = usePosts()
  const { addToast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true)
  const pageSize = 5

  const loadMoreComments = async () => {
    if (loading || !hasMoreComments) return
    setLoading(true)

    getCommentsByPost({
      currentPage,
      pageSize,
      postId: post.id,
    })
      .then((commentsList) => {
        setHasMoreComments(commentsList.totalPages >= currentPage)
      })
      .catch((error) => {
        addToast(error.message, "error", 45)
      })
      .finally(() => {
        setCurrentPage((prev) => (prev += 1))
        setLoading(false)
      })
  }

  useEffect(() => {
    if (showComments && post.comments.length === 0) {
      loadMoreComments()
    }
  }, [showComments])

  return (
    <div
      className={`${
        showComments ? " pb-0 " : " pb-2 rounded-b-xl "
      } pt-2 relative border-t border-border  rounded-b-xl bg-background mt-2 flex flex-col gap-y-2`}
    >
      <Actions
        post={post}
        showComments={showComments}
        openEditPostModal={openEditPostModal}
        onShowComments={setShowComments}
        onOpenEditPostModal={onOpenEditPostModal}
      />
      {showComments && <CommentInput postId={post.id} />}

      {showComments && post.comments.length !== 0 && (
        <div className="px-4 mt-2 mb-4 space-y-[20px]">
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {showComments &&
        hasMoreComments &&
        post.commentsCount !== 0 &&
        post.commentsCount > post.comments.length && (
          <button
            onClick={loadMoreComments}
            disabled={loading}
            className="p-2 text-sm text-primary hover:bg-secondary rounded-md"
          >
            {loading ? (
              <div className="w-fit mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFFFFF"
                  className="animate-spin"
                  viewBox="0 0 256 256"
                >
                  <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
                </svg>
              </div>
            ) : (
              <span className="mx-auto block text-blue-500 hover:underline">
                Load more
              </span>
            )}
          </button>
        )}
    </div>
  )
}

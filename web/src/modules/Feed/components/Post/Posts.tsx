"use client"

import { Post } from "../../../../shared/components/content/Post/Post"
import { CreatePostInput } from "../../../../shared/components/content/Post/components/CreatePostInput/CreatePostInput"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"
import { useAuth } from "@/shared/contexts/Auth/AuthContext"
import { useEffect, useState } from "react"

export const Posts = () => {
  const { currentSession } = useAuth()
  const { feedPosts: posts, getFeed } = usePosts()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [lastPage, setLastPage] = useState<number>(10)
  const [hasMorePost, setHasMorePosts] = useState<boolean>(true)

  const pageSize = 10

  useEffect(() => {
    if (currentSession?.id && !loading && hasMorePost) {
      setLoading(true)
      getFeed({ userId: currentSession?.id, currentPage, pageSize })
        .then((postList) => {
          setHasMorePosts(postList.totalPages >= currentPage)
          setLastPage(postList.totalPages)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [currentSession?.id, currentPage])

  window.onscroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      Math.ceil(document.body.offsetHeight)
    ) {
      if (!loading && currentPage <= lastPage) {
        setCurrentPage((prev) => prev + 1)
      }
    }
  }

  if (!currentSession) return null

  return (
    <section
      key={String(posts)}
      className="min-w-[860px] pb-[200px] space-y-4 pr-4 pt-4 border-r border-border w-full min-h-screen"
    >
      <CreatePostInput isFeed />
      {Array.from(posts.values()).map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {posts.size === 0 && (
        <div className="w-full flex items-center justify-center">
          <div className="p-8 w-full h-[230px] bg-ashes rounded-xl flex flex-col items-center justify-center">
            <div className="col-span-1 w-[50px] h-[50px] flex items-center justify-center bg-border/50 border border-border rounded aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#9ca3af"
                viewBox="0 0 256 256"
              >
                <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
              </svg>
            </div>
            <span className="text-gray-400 block mt-2 w-[400px] text-center">
              You feel a shiver run down your spine. The feed is empty.
              Something lurks in the shadows?
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

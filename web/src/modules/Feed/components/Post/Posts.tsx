"use client"

import { useEffect, useState } from "react"
import { useAuth, usePosts } from "@/shared/contexts"
import { CreatePostInput, EmptyState } from "@/shared/components/ui"
import { Post } from "@/shared/components/content/Post/Post"
import { Notepad } from "@/shared/components/ui/icons"

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
      getFeed({ ownerId: currentSession?.id, currentPage, pageSize })
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
        <EmptyState description="You feel a shiver run down your spine. The feed is empty. Something lurks in the shadows?">
          <Notepad />
        </EmptyState>
      )}
    </section>
  )
}

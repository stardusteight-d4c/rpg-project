"use client"

import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { Post } from "./Post"
import { CreatePostInput } from "./CreatePostInput"
import { usePosts } from "@/shared/contexts/Posts/PostsContext"

export const Posts = () => {
  const { posts } = usePosts()
  
  return (
    <section className="min-w-[860px] pb-[200px] space-y-4 pr-4 pt-4 border-r border-border w-full min-h-screen">
      <CreatePostInput isFeed />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  )
}

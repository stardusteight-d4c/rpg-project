"use client"

import { useFeed } from "@/shared/contexts/Feed/FeedContext"
import { Post } from "./Post"
import { CreatePostInput } from "./CreatePostInput"

export const Posts = () => {
  const { posts } = useFeed()
  
  return (
    <section className="min-w-[860px] pb-[100px] space-y-4 pr-4 pt-4 border-r border-border w-full min-h-screen">
      <CreatePostInput />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  )
}

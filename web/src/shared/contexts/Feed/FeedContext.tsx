"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { posts as postsMock } from "./mock-data"

interface FeedState {
  posts: IPost[]
  addPost: (post: IPost) => void
  updatePost: (id: string, updatedPost: Partial<IPost>) => void
  deletePost: (id: string) => void
}

const defaultState: FeedState = {
  posts: [],
  addPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
}

const FeedContext = createContext<FeedState>(defaultState)

export const FeedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<IPost[]>(postsMock)

  const addPost = (post: IPost) => {
    setPosts((prevPosts) => [post, ...prevPosts])
  }

  const updatePost = (id: string, updatedPost: Partial<IPost>) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    )
  }

  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  return (
    <FeedContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}

export const useFeed = () => {
  const context = useContext(FeedContext)
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider")
  }
  return context
}

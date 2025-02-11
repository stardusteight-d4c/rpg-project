"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { posts as postsMock } from "./mock-data"

interface FeedState {
  posts: IPost[]
  addPost: (post: IPost) => void
  updatePost: (id: string, updatedPost: Partial<IPost>) => void
  deletePost: (id: string) => void
  addComment: (postId: string, comment: IComment) => void
  updateComment: (
    postId: string,
    commentId: string,
    updatedComment: Partial<IComment>
  ) => void
  deleteComment: (postId: string, commentId: string) => void
}

const defaultState: FeedState = {
  posts: [],
  addPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
  addComment: () => {},
  updateComment: () => {},
  deleteComment: () => {},
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

  const addComment = (postId: string, comment: IComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, comment],
              commentsCount: (post.commentsCount || 0) + 1,
            }
          : post
      )
    )
  }

  const updateComment = (
    postId: string,
    commentId: string,
    updatedComment: Partial<IComment>
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, ...updatedComment }
                  : comment
              ),
            }
          : post
      )
    )
  }

  const deleteComment = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              ),
              commentsCount: Math.max((post.commentsCount || 0) - 1, 0),
            }
          : post
      )
    )
  }

  return (
    <FeedContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        addComment,
        updateComment,
        deleteComment,
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

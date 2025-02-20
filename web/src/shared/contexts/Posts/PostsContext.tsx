"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface PostsState {
  campaignPosts: IPost[]
  add: (post: IPost) => Promise<IPost | void>
  getByCampaign: (queryParams: ListPostsDTO) => Promise<IPost[]>
}

const defaultState: PostsState = {
  campaignPosts: [],
  add: async (post: IPost) => {},
  getByCampaign: async (queryParams: ListPostsDTO) => [],
}

const PostsContext = createContext<PostsState>(defaultState)

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [campaignPosts, setCampaignPosts] = useState<IPost[]>([])
  const api = new MockAPI()

  const add = async (post: IPost) => {
    return await api.post
      .create(post)
      .then((createdPost) => {
        setCampaignPosts((prev) => [createdPost, ...prev])
        return createdPost
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByCampaign = async (queryParams: ListPostsDTO) => {
    return await api.post
      .list(queryParams)
      .then((posts) => posts)
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <PostsContext.Provider value={{ campaignPosts, add, getByCampaign }}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider")
  }
  return context
}

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
  add: (post: IPost, currentPage?: number) => Promise<IPost | void>
  update: (post: Partial<IPost>) => Promise<IPost | void>
  remove: (postId: string) => Promise<void>
  getByCampaign: (
    queryParams: ListPostsDTO
  ) => Promise<ListPostsResponseDTO<IPost>>
  getByUser: (queryParams: ListPostsDTO) => Promise<ListPostsResponseDTO<IPost>>
}

const defaultState: PostsState = {
  campaignPosts: [],
  add: async (post: IPost, currentPage?: number) => {},
  update: async (post: Partial<IPost>) => {},
  remove: async (postId: string) => {},
  getByCampaign: async (queryParams: ListPostsDTO) => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
  }),
  getByUser: async (queryParams: ListPostsDTO) => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
  }),
}

const PostsContext = createContext<PostsState>(defaultState)

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [campaignPosts, setCampaignPosts] = useState<IPost[]>([])
  const api = new MockAPI()

  const add = async (post: IPost, currentPage?: number) => {
    return await api.post
      .create(post)
      .then((createdPost) => {
        if (currentPage === 1) {
          setCampaignPosts((prev) => [createdPost, ...prev.slice(1, 2)])
        }
        return createdPost
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (post: Partial<IPost>) => {
    return await api.post
      .update(post)
      .then((post) => {
        setCampaignPosts((prev) =>
          prev.map((p) => (p.id === post.id ? post : p))
        )
        return post
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const remove = async (postId: string) => {
    return await api.post.delete(postId).catch((error) => {
      throw new Error(error.message)
    })
  }

  const getByUser = async (queryParams: ListPostsDTO) => {
    return await api.post
      .list(queryParams)
      .then((postsPagination) => postsPagination)
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByCampaign = async (queryParams: ListPostsDTO) => {
    return await api.post
      .list(queryParams)
      .then((postsPagination) => {
        setCampaignPosts(postsPagination.items)
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <PostsContext.Provider
      value={{ campaignPosts, update, remove, add, getByCampaign, getByUser }}
    >
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

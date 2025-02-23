"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { MockAPI } from "@/shared/requests/MockAPI"

interface IPostEvents {
  deletingPost: boolean
  creatingPosts: boolean
  gettingPosts: boolean
  updatingPost: boolean
}

interface PostsState {
  campaignPosts: IPost[]
  postEvents: IPostEvents
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
  postEvents: {
    deletingPost: false,
    creatingPosts: false,
    gettingPosts: false,
    updatingPost: false,
  },
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
  const [postEvents, setPostEvents] = useState<IPostEvents>({
    creatingPosts: false,
    deletingPost: false,
    gettingPosts: false,
    updatingPost: false,
  })

  const api = new MockAPI()

  const add = async (post: IPost, currentPage?: number) => {
    setPostEvents((prev) => ({ ...prev, creatingPosts: true }))
    return await api.post
      .create(post)
      .then((createdPost) => {
        if (currentPage === 1) {
          setCampaignPosts((prev) => [createdPost, ...prev.slice(1, 3)])
        }
        return createdPost
      })
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setPostEvents((prev) => ({ ...prev, creatingPosts: false }))
      })
  }

  const update = async (post: Partial<IPost>) => {
    setPostEvents((prev) => ({ ...prev, updatingPost: true }))
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
      .finally(() => {
        setPostEvents((prev) => ({ ...prev, updatingPost: false }))
      })
  }

  const remove = async (postId: string) => {
    setPostEvents((prev) => ({ ...prev, deletingPost: true }))
    return await api.post
      .delete(postId)
      .then(() => {
        setCampaignPosts((prev) => prev.filter((post) => post.id !== postId))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setPostEvents((prev) => ({ ...prev, deletingPost: false }))
      })
  }

  const getByUser = async (queryParams: ListPostsDTO) => {
    setPostEvents((prev) => ({ ...prev, gettingPosts: true }))
    return await api.post
      .list(queryParams)
      .then((postsPagination) => postsPagination)
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setPostEvents((prev) => ({ ...prev, gettingPosts: false }))
      })
  }

  const getByCampaign = async (queryParams: ListPostsDTO) => {
    setPostEvents((prev) => ({ ...prev, gettingPosts: true }))
    return await api.post
      .list(queryParams)
      .then((postsPagination) => {
        setCampaignPosts(postsPagination.items)
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setPostEvents((prev) => ({ ...prev, gettingPosts: false }))
      })
  }

  return (
    <PostsContext.Provider
      value={{
        postEvents,
        campaignPosts,
        update,
        remove,
        add,
        getByCampaign,
        getByUser,
      }}
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

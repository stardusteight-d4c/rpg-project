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
  postDeleted: boolean
  creatingPost: boolean
  gettingPosts: boolean
  updatingPost: boolean
  postUpdated: boolean
}

interface PostsState {
  campaignPosts: IPost[]
  posts: IPost[]
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
  posts: [],
  postEvents: {
    deletingPost: false,
    postDeleted: false,
    postUpdated: false,
    creatingPost: false,
    gettingPosts: false,
    updatingPost: false,
  },
  add: async () => {},
  update: async () => {},
  remove: async () => {},
  getByCampaign: async () => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
  }),
  getByUser: async () => ({
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
  const [posts, setPosts] = useState<IPost[]>([])
  const [postEvents, setPostEvents] = useState<IPostEvents>({
    creatingPost: false,
    deletingPost: false,
    postDeleted: false,
    gettingPosts: false,
    updatingPost: false,
    postUpdated: false,
  })

  const api = new MockAPI()

  useEffect(() => {
    ;(async () => {
      await api.post
        .list()
        .then((postsPagination) => {
          setPosts(postsPagination.items)
          return postsPagination
        })
        .catch((error) => {
          throw new Error(error.message)
        })
        .finally(() => {
          setPostEvents((prev) => ({ ...prev, gettingPosts: false }))
        })
    })()
  }, [campaignPosts])

  const add = async (post: IPost, currentPage?: number) => {
    setPostEvents((prev) => ({ ...prev, creatingPost: true }))
    return await api.post
      .create(post)
      .then((createdPost) => {
        setPosts((prev) => [createdPost, ...prev])
        if (currentPage === 1) {
          if (campaignPosts.length === 3) {
            setCampaignPosts((prev) => [createdPost, ...prev.slice(0, 2)])
          } else {
            setCampaignPosts((prev) => [createdPost, ...prev])
          }
        }
        return createdPost
      })
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setPostEvents((prev) => ({ ...prev, creatingPost: false }))
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
        setPostEvents((prev) => ({
          ...prev,
          updatingPost: false,
          postUpdated: true,
        }))
        return post
      })
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setTimeout(() => {
          setPostEvents((prev) => ({
            ...prev,
            updatingPost: false,
            postUpdated: false,
          }))
        }, 1000)
      })
  }

  const remove = async (postId: string) => {
    setPostEvents((prev) => ({ ...prev, deletingPost: true }))
    return await api.post
      .delete(postId)
      .then(() => {
        setCampaignPosts((prev) => prev.filter((post) => post.id !== postId))
        setPostEvents((prev) => ({
          ...prev,
          deletingPost: false,
          postDeleted: true,
        }))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
      .finally(() => {
        setTimeout(() => {
          setPostEvents((prev) => ({
            ...prev,
            deletingPost: false,
            postDeleted: false,
          }))
        }, 1000)
      })
  }

  const getByUser = async (queryParams: ListPostsDTO) => {
    setPostEvents((prev) => ({ ...prev, gettingPosts: true }))
    return await api.post
      .list(queryParams)
      .then((postsPagination) => {
        return postsPagination
      })
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
        posts,
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

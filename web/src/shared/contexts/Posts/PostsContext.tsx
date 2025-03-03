"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { MockAPI } from "@/shared/requests/MockAPI"
import { PostsContextHandlers } from "./PostsContextHandlers"

interface PostsState {
  campaignPosts: IPost[]
  posts: IPost[]
  add: (post: IPost, currentPage?: number) => Promise<IPost | void>
  update: (post: Partial<IPost>) => Promise<IPost | void>
  remove: (postId: string) => Promise<void>
  comment(postId: string, comment: IComment): Promise<IComment | void>
  updatedComment(comment: Partial<IComment>): Promise<IComment | void>
  deleteComment(commentId: string): Promise<void>
  like(postId: string, userId: string): Promise<void>
  unlike(postId: string, userId: string): Promise<void>
  getByCampaign: (
    queryParams: ListPostsDTO
  ) => Promise<ListPostsResponseDTO<IPost>>
  getByUser: (queryParams: ListPostsDTO) => Promise<ListPostsResponseDTO<IPost>>
}

const defaultState: PostsState = {
  campaignPosts: [],
  posts: [],
  add: async () => {},
  update: async () => {},
  remove: async () => {},
  comment: async () => {},
  updatedComment: async () => {},
  deleteComment: async () => {},
  like: async () => {},
  unlike: async () => {},
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

  const api = new MockAPI()

  const updatePostState = (updatedPost: IPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    )
    setCampaignPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    )
  }

  const handlers = new PostsContextHandlers(posts, updatePostState)

  const add = async (post: IPost, currentPage?: number) => {
    return api.post
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
  }

  const update = async (post: Partial<IPost>) => {
    return api.post
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
    return api.post
      .delete(postId)
      .then(() => {
        setCampaignPosts((prev) => prev.filter((post) => post.id !== postId))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByUser = async (queryParams: ListPostsDTO) => {
    return api.post
      .list(queryParams)
      .then((postsPagination) => {
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByCampaign = async (queryParams: ListPostsDTO) => {
    return api.post
      .list(queryParams)
      .then((postsPagination) => {
        setCampaignPosts(postsPagination.items)
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const comment = async (postId: string, comment: IComment) => {
    return api.post
      .comment(postId, comment)
      .then((createdComment) =>
        handlers.updatePostComments(postId, createdComment, "add")
      )
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const updatedComment = async (comment: Partial<IComment>) => {
    return api.post.updatedComment(comment).catch((error) => {
      throw new Error(error.message)
    })
  }

  const deleteComment = async (commentId: string) => {
    return api.post.deleteComment(commentId).catch((error) => {
      throw new Error(error.message)
    })
  }

  const like = async (postId: string, userId: string) => {
    return api.post
      .like(postId, userId)
      .then(() => handlers.updatePostLikes(postId, userId, true))
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const unlike = async (postId: string, userId: string) => {
    return api.post
      .unlike(postId, userId)
      .then(() => handlers.updatePostLikes(postId, userId, false))
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        campaignPosts,
        update,
        remove,
        add,
        comment,
        updatedComment,
        deleteComment,
        like,
        unlike,
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

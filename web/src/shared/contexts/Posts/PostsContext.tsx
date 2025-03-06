"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react"
import { MockAPI } from "@/shared/requests/MockAPI"
import { PostsContextHandlers } from "./PostsContextHandlers"

interface PostsState {
  campaignPosts: Map<string, IPost>
  posts: Map<string, IPost>
  feedPosts: Map<string, IPost>
  add: (post: IPost, currentPage?: number) => Promise<IPost | void>
  update: (post: Partial<IPost>) => Promise<IPost | void>
  remove: (postId: string) => Promise<void>
  comment(comment: IComment): Promise<IComment | void>
  updateComment(comment: Partial<IComment>): Promise<IComment | void>
  deleteComment(comment: IComment): Promise<void>
  like(postId: string, userId: string): Promise<void>
  unlike(postId: string, userId: string): Promise<void>
  getByCampaign: (
    queryParams: ListPostsDTO
  ) => Promise<ListPostsResponseDTO<IPost>>
  getByUser: (queryParams: ListPostsDTO) => Promise<ListPostsResponseDTO<IPost>>
  getFeed: (queryParams: ListPostsDTO) => Promise<ListPostsResponseDTO<IPost>>
}

const defaultState: PostsState = {
  campaignPosts: new Map(),
  posts: new Map(),
  feedPosts: new Map(),
  add: async () => {},
  update: async () => {},
  remove: async () => {},
  comment: async () => {},
  updateComment: async () => {},
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
  getFeed: async () => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
  }),
}

const PostsContext = createContext<PostsState>(defaultState)

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [campaignPosts, setCampaignPosts] = useState<Map<string, IPost>>(
    new Map()
  )
  const [posts, setPosts] = useState<Map<string, IPost>>(new Map())
  const [feedPosts, setFeedPosts] = useState<Map<string, IPost>>(new Map())

  const api = new MockAPI()

  const sortPostsMap = (postsMap: Map<string, IPost>) => {
    return new Map(
      Array.from(postsMap.entries()).sort(
        (a, b) =>
          new Date(b[1].createdAt).getTime() -
          new Date(a[1].createdAt).getTime()
      )
    )
  }

  const updatePostState = (updatedPost: IPost) => {
    setPosts((prev) =>
      sortPostsMap(new Map(prev).set(updatedPost.id, updatedPost))
    )
    setCampaignPosts((prev) =>
      sortPostsMap(new Map(prev).set(updatedPost.id, updatedPost))
    )
    setFeedPosts((prev) =>
      sortPostsMap(new Map(prev).set(updatedPost.id, updatedPost))
    )
  }
  const handlers = useMemo(
    () => new PostsContextHandlers(posts, updatePostState),
    [posts]
  )

  const add = async (post: IPost, currentPage?: number) => {
    return api.post
      .create(post)
      .then((createdPost) => {
        setPosts((prev) =>
          sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
        )
        setFeedPosts((prev) =>
          sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
        )
        if (currentPage === 1) {
          setCampaignPosts((prev) =>
            sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
          )
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
        setPosts((prev) => sortPostsMap(new Map(prev).set(post.id, post)))
        setFeedPosts((prev) => sortPostsMap(new Map(prev).set(post.id, post)))
        setCampaignPosts((prev) =>
          sortPostsMap(new Map(prev).set(post.id, post))
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
        setPosts((prev) => {
          const newPosts = new Map(prev)
          newPosts.delete(postId)
          return newPosts
        })
        setCampaignPosts((prev) => {
          const newCampaignPosts = new Map(prev)
          newCampaignPosts.delete(postId)
          return newCampaignPosts
        })
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
        const postsMap = new Map(
          postsPagination.items.map((post) => [post.id, post])
        )
        setCampaignPosts(sortPostsMap(postsMap))
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getFeed = async (queryParams: ListPostsDTO) => {
    return api.post
      .list({ ...queryParams, feed: true })
      .then((postsPagination) => {
        const postsMap = new Map(
          postsPagination.items.map((post) => [post.id, post])
        )
        setFeedPosts(sortPostsMap(postsMap))
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const comment = async (comment: IComment) => {
    return api.post
      .comment(comment.postId, comment)
      .then((createdComment) =>
        handlers.updatePostComments(comment.postId, createdComment, "add")
      )
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const updateComment = async (comment: Partial<IComment>) => {
    return api.post
      .updateComment(comment)
      .then((updatedComment) => {
        handlers.updatePostComments(
          updatedComment.postId,
          updatedComment,
          "edit"
        )
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const deleteComment = async (comment: IComment) => {
    return api.post
      .deleteComment(comment)
      .then(() => {
        handlers.updatePostComments(comment.postId, comment, "delete")
      })
      .catch((error) => {
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
        feedPosts,
        campaignPosts,
        update,
        remove,
        add,
        comment,
        updateComment,
        deleteComment,
        like,
        unlike,
        getByCampaign,
        getByUser,
        getFeed,
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

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
import { sortArrayOfMapObjectByCreatedAt } from "@/shared/utils"

interface PostsState {
  posts: Map<string, IPost>
  lastRequestProfilePostsData: Map<string, ListPostsResponseDTO<IPost>>
  lastRequestCampaignPostsData: Map<string, ListPostsResponseDTO<IPost>>
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
  getCommentsByPost: (
    queryParams: ListCommentsDTO
  ) => Promise<ListCommentsResponseDTO>
}

const defaultState: PostsState = {
  posts: new Map(),
  lastRequestProfilePostsData: new Map(),
  lastRequestCampaignPostsData: new Map(),
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
  getCommentsByPost: async () => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
  }),
}

const PostsContext = createContext<PostsState>(defaultState)

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Map<string, IPost>>(new Map())
  const [feedPosts, setFeedPosts] = useState<Map<string, IPost>>(new Map())
  const [lastRequestProfilePostsData, setLastRequestProfilePostsData] =
    useState<Map<string, ListPostsResponseDTO<IPost>>>(new Map())
  const [lastRequestCampaignPostsData, setLastRequestCampaignPostsData] =
    useState<Map<string, ListPostsResponseDTO<IPost>>>(new Map())

  const api = new MockAPI()

  const sortPostsMap = (postsMap: Map<string, IPost>) => {
    return new Map(sortArrayOfMapObjectByCreatedAt(Array.from(postsMap.entries())))
  }

  const addPostInLocalState = (createdPost: IPost) => {
    setPosts((prev) =>
      sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
    )
    setFeedPosts((prev) =>
      sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
    )
    setLastRequestProfilePostsData((prev) => {
      const updatedCache = new Map(prev)
      const prevProfilePostsRequest = updatedCache.get(createdPost.owner.id)

      if (prevProfilePostsRequest) {
        updatedCache.set(createdPost.owner.id, {
          totalItems: prevProfilePostsRequest.items.length + 1,
          totalPages: Math.ceil(
            (prevProfilePostsRequest.items.length + 1) /
              prevProfilePostsRequest.pageSize!
          ),
          items: [createdPost, ...prevProfilePostsRequest.items],
        })
      }

      return updatedCache
    })
    if (createdPost.campaignId) {
      setLastRequestCampaignPostsData((prev) => {
        const updatedCache = new Map(prev)
        const prevCampaignPostsRequest = updatedCache.get(
          createdPost.campaignId!
        )

        if (prevCampaignPostsRequest) {
          updatedCache.set(createdPost.campaignId!, {
            totalItems: prevCampaignPostsRequest.items.length + 1,
            totalPages: Math.ceil(
              (prevCampaignPostsRequest.items.length + 1) /
                prevCampaignPostsRequest.pageSize!
            ),
            items: [createdPost, ...prevCampaignPostsRequest.items],
          })
        } else {
          updatedCache.set(createdPost.campaignId!, {
            totalItems: 1,
            totalPages: 1,
            items: [createdPost],
          })
        }

        return updatedCache
      })
    }
  }

  const updatePostFromLocalState = (updatedPost: IPost) => {
    setPosts((prev) =>
      sortPostsMap(new Map(prev).set(updatedPost.id, updatedPost))
    )

    setFeedPosts((prev) =>
      sortPostsMap(new Map(prev).set(updatedPost.id, updatedPost))
    )

    setLastRequestProfilePostsData((prev) => {
      const updatedCache = new Map(prev)
      const prevProfileRequest = updatedCache.get(updatedPost.owner.id)

      if (prevProfileRequest) {
        updatedCache.set(updatedPost.owner.id, {
          ...prevProfileRequest,
          items: Array.from(
            sortPostsMap(
              new Map(prevProfileRequest.items.map((p) => [p.id, p])).set(
                updatedPost.id,
                updatedPost
              )
            ).values()
          ),
        })
      }
      return updatedCache
    })

    setLastRequestCampaignPostsData((prev) => {
      const updatedCache = new Map(prev)
      const prevProfileRequest = updatedCache.get(updatedPost.campaignId!)

      if (prevProfileRequest) {
        updatedCache.set(updatedPost.owner.id, {
          ...prevProfileRequest,
          items: Array.from(
            sortPostsMap(
              new Map(prevProfileRequest.items.map((p) => [p.id, p])).set(
                updatedPost.id,
                updatedPost
              )
            ).values()
          ),
        })
      }
      return updatedCache
    })
  }

  const deletePostFromLocalState = (postId: string) => {
    setPosts((prev) => {
      const newPosts = new Map(prev)
      newPosts.delete(postId)
      return newPosts
    })

    setFeedPosts((prev) => {
      const newFeedPosts = new Map(prev)
      newFeedPosts.delete(postId)
      return newFeedPosts
    })

    setLastRequestProfilePostsData((prev) => {
      const updatedCache = new Map(prev)
      updatedCache.forEach((profileData, userId) => {
        const filteredPosts = profileData.items.filter(
          (post) => post.id !== postId
        )
        updatedCache.set(userId, { ...profileData, items: filteredPosts })
      })
      return updatedCache
    })
  }

  const handlers = useMemo(
    () => new PostsContextHandlers(posts, updatePostFromLocalState),
    [posts]
  )

  const add = async (post: IPost) => {
    return api.post
      .create(post)
      .then((createdPost) => {
        addPostInLocalState(createdPost)
        return createdPost
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const update = async (post: Partial<IPost>) => {
    return api.post
      .update(post)
      .then((updatedPost) => {
        const cachedPost = posts.get(post.id!)
        if (cachedPost) {
          updatePostFromLocalState({
            ...updatedPost,
            comments: cachedPost.comments,
          })
        } else {
          updatePostFromLocalState(updatedPost)
        }
        return updatedPost
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const remove = async (postId: string) => {
    return api.post
      .delete(postId)
      .then(() => {
        deletePostFromLocalState(postId)
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByUser = async (queryParams: ListPostsDTO) => {
    const ownerId = queryParams.ownerId

    setLastRequestProfilePostsData((prev) => {
      const existingData = prev.get(ownerId!)
      if (
        existingData &&
        existingData.currentPage === queryParams.currentPage &&
        existingData.pageSize === queryParams.pageSize
      ) {
        return prev
      }
      return prev
    })

    return api.post
      .list(queryParams)
      .then((postsPagination) => {
        setLastRequestProfilePostsData((prev) => {
          const updatedPosts = new Map(prev)
          const existingData = updatedPosts.get(ownerId!)
          const previousPosts = existingData?.items || []
          const previousPostsMap = new Map(
            previousPosts.map((post) => [post.id, post])
          )
          const updatedItems = postsPagination.items.map((newPost) => {
            const existingPost = previousPostsMap.get(newPost.id)
            return existingPost ? existingPost : newPost
          })
          updatedPosts.set(ownerId!, {
            ...postsPagination,
            items: updatedItems,
          })
          return updatedPosts
        })
        return postsPagination
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  const getByCampaign = async (queryParams: ListPostsDTO) => {
    const campaignId = queryParams.campaignId

    return api.post
      .list(queryParams)
      .then((postsPagination) => {
        setLastRequestCampaignPostsData((prev) => {
          const updatedCampaignPosts = new Map(prev)
          const existingData = updatedCampaignPosts.get(campaignId!)
          const previousPosts = existingData?.items || []

          const previousPostsMap = new Map(
            previousPosts.map((post) => [post.id, post])
          )

          const updatedItems = [
            ...previousPosts,
            ...postsPagination.items.filter(
              (newPost) => !previousPostsMap.has(newPost.id)
            ),
          ]

          updatedCampaignPosts.set(campaignId!, {
            ...postsPagination,
            items: updatedItems,
            currentPage: queryParams.currentPage,
            pageSize: queryParams.pageSize,
          })

          return updatedCampaignPosts
        })

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
        setFeedPosts((prev) => {
          const updatedPosts = new Map(prev)
          postsPagination.items.forEach((post) =>
            updatedPosts.set(post.id, post)
          )

          return sortPostsMap(updatedPosts)
        })

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

  const getCommentsByPost = async (
    queryParams: ListCommentsDTO
  ): Promise<ListCommentsResponseDTO> => {
    return api.post
      .listComments(
        queryParams.postId,
        queryParams.currentPage,
        queryParams.pageSize
      )
      .then((commentsPagination) => {
        const post = posts.get(queryParams.postId)
        if (post) {
          const existingCommentIds = new Set(post.comments.map((c) => c.id))
          const newComments = commentsPagination.items.filter(
            (c) => !existingCommentIds.has(c.id)
          )
          post.comments = [...newComments, ...post.comments]
          updatePostFromLocalState(post)
        }
        return commentsPagination
      })
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
        lastRequestProfilePostsData,
        lastRequestCampaignPostsData,
        // campaignPosts,
        update,
        remove,
        add,
        comment,
        updateComment,
        deleteComment,
        like,
        unlike,
        getCommentsByPost,
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

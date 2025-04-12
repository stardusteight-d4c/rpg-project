"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react"

import { MockAPI } from "@/shared/requests/MockAPI"
import { sortArrayOfMapObjectByCreatedAt } from "@/shared/utils"

import { PostsContextHandlers } from "./PostsContextHandlers"

interface PostsState {
  posts: Map<string, IPost>
  lastRequestProfilePostsData: Map<string, ListResponseDTO<IPost>>
  lastRequestCampaignPostsData: Map<string, ListResponseDTO<IPost>>
  feedPosts: Map<string, IPost>
  add: (post: IPost, currentPage?: number) => Promise<IPost>
  update: (post: Partial<IPost>) => Promise<IPost>
  updateLocalPostsOnEditCampaign: (
    campaignId: string,
    campaign: ICampaign
  ) => Promise<void>
  deletePostsFromCampaignOnLocalState: (campaignId: string) => void
  remove: (postId: string) => Promise<void>
  comment(comment: IComment): Promise<void>
  updateComment(comment: Partial<IComment>): Promise<void>
  deleteComment(comment: IComment): Promise<void>
  like(postId: string, userId: string): Promise<void>
  unlike(postId: string, userId: string): Promise<void>
  getByCampaign: (
    queryParams: PostQueryParams
  ) => Promise<ListResponseDTO<IPost>>
  getByUser: (queryParams: PostQueryParams) => Promise<ListResponseDTO<IPost>>
  getFeed: (queryParams: PostQueryParams) => Promise<ListResponseDTO<IPost>>
  getCommentsByPost: (
    queryParams: CommentQueryParams
  ) => Promise<ListResponseDTO<IComment>>
}

const PostsContext = createContext<PostsState | undefined>(undefined)

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const api = new MockAPI().initializeRoutes()
  const [posts, setPosts] = useState<Map<string, IPost>>(new Map())
  const [feedPosts, setFeedPosts] = useState<Map<string, IPost>>(new Map())
  const [lastRequestProfilePostsData, setLastRequestProfilePostsData] =
    useState<Map<string, ListResponseDTO<IPost>>>(new Map())
  const [lastRequestCampaignPostsData, setLastRequestCampaignPostsData] =
    useState<Map<string, ListResponseDTO<IPost>>>(new Map())

  const sortPostsMap = (postsMap: Map<string, IPost>) => {
    return new Map(
      sortArrayOfMapObjectByCreatedAt(Array.from(postsMap.entries()))
    )
  }

  const addPostInLocalState = (createdPost: IPost) => {
    setPosts((prev) =>
      sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
    )
    setFeedPosts((prev) =>
      sortPostsMap(new Map(prev).set(createdPost.id, createdPost))
    )
    setLastRequestProfilePostsData((prev) => {
      const newCache = new Map(prev)
      const prevProfilePostsRequest = newCache.get(createdPost.owner.id)
      if (prevProfilePostsRequest) {
        newCache.set(createdPost.owner.id, {
          totalItems: prevProfilePostsRequest.items.length + 1,
          totalPages: Math.ceil(
            (prevProfilePostsRequest.items.length + 1) /
              prevProfilePostsRequest.pageSize!
          ),
          items: [createdPost, ...prevProfilePostsRequest.items],
        })
      } else {
        newCache.set(createdPost.owner.id, {
          totalItems: 1,
          totalPages: 1,
          items: [createdPost],
        })
      }
      return newCache
    })
    if (createdPost.campaignId) {
      setLastRequestCampaignPostsData((prev) => {
        const newCache = new Map(prev)
        const prevCampaignPostsRequest = newCache.get(createdPost.campaignId!)
        if (prevCampaignPostsRequest) {
          newCache.set(createdPost.campaignId!, {
            totalItems: prevCampaignPostsRequest.items.length + 1,
            totalPages: Math.ceil(
              (prevCampaignPostsRequest.items.length + 1) /
                prevCampaignPostsRequest.pageSize!
            ),
            items: [createdPost, ...prevCampaignPostsRequest.items],
          })
        } else {
          newCache.set(createdPost.campaignId!, {
            totalItems: 1,
            totalPages: 1,
            items: [createdPost],
          })
        }
        return newCache
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
      const newCache = new Map(prev)
      const prevProfileRequest = newCache.get(updatedPost.owner.id)
      if (prevProfileRequest) {
        newCache.set(updatedPost.owner.id, {
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
      return newCache
    })
    setLastRequestCampaignPostsData((prev) => {
      const newCache = new Map(prev)
      const prevCampaignRequest = newCache.get(updatedPost.campaignId!)
      if (prevCampaignRequest) {
        newCache.set(updatedPost.campaignId!, {
          ...prevCampaignRequest,
          items: Array.from(
            sortPostsMap(
              new Map(prevCampaignRequest.items.map((p) => [p.id, p])).set(
                updatedPost.id,
                updatedPost
              )
            ).values()
          ),
        })
      }
      return newCache
    })
  }

  const deletePostsFromCampaignOnLocalState = (campaignId: string) => {
    posts
      .values()
      .filter((post) => post.campaignId === campaignId)
      .forEach((post) => deletePostFromLocalState(post.id))
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
      const newCache = new Map(prev)
      newCache.forEach((profileData, userId) => {
        const filteredPosts = profileData.items.filter(
          (post) => post.id !== postId
        )
        newCache.set(userId, { ...profileData, items: filteredPosts })
      })
      return newCache
    })
  }

  const updateLocalPostsOnEditCampaign = async (
    campaignId: string,
    campaign: ICampaign
  ) => {
    const campaignPosts = Array.from(posts.values()).filter(
      (post) => post.campaignId === campaignId
    )
    if (campaignPosts) {
      campaignPosts.map((campaignPost) => {
        updatePostFromLocalState({ ...campaignPost, campaign })
      })
    }
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

  const getByUser = async (queryParams: PostQueryParams) => {
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

  const getByCampaign = async (queryParams: PostQueryParams) => {
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

  const getFeed = async (queryParams: PostQueryParams) => {
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
    queryParams: CommentQueryParams
  ): Promise<ListResponseDTO<IComment>> => {
    const { postId } = queryParams
    return api.post
      .listComments(queryParams)
      .then((commentsPagination) => {
        const post = posts.get(postId!)
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
        update,
        deletePostsFromCampaignOnLocalState,
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
        updateLocalPostsOnEditCampaign,
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

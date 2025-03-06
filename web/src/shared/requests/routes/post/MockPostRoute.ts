import { MockUserRoute } from "../user/MockUserRoute"

export class MockPostRoute implements IPostRoute {
  static #instance: MockPostRoute | null = null
  #posts: Map<string, IPost>
  #inMemoryUserRoute: IUserRoute

  private constructor() {
    this.#posts = new Map()
    this.#inMemoryUserRoute = MockUserRoute.getInstance()
  }

  public static getInstance(): MockPostRoute {
    if (!this.#instance) {
      this.#instance = new MockPostRoute()
    }
    return this.#instance
  }

  public async create(post: IPost): Promise<IPost> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const newPost: IPost = {
      ...post,
      commentsCount: 0,
      likesCount: 0,
      id: crypto.randomUUID(),
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    }

    this.#posts.set(newPost.id, newPost)
    return newPost
  }

  public async update(post: Partial<IPost>): Promise<IPost> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!post.id || !this.#posts.has(post.id)) {
      throw new Error("Post not found.")
    }

    const existingPost = this.#posts.get(post.id)!
    const updatedPost = { ...existingPost, ...post }
    this.#posts.set(post.id, updatedPost)

    return updatedPost
  }

  public async delete(postId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!this.#posts.delete(postId)) {
      throw new Error("Post not found.")
    }
  }

  public async comment(postId: string, comment: IComment): Promise<IComment> {
    const post = this.#posts.get(postId)
    if (!post) {
      throw new Error("Post not found")
    }

    const newComment: IComment = {
      ...comment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    post.comments.push(newComment)
    post.commentsCount = post.commentsCount += 1

    this.#posts.set(postId, post)
    return newComment
  }

  public async updateComment(comment: Partial<IComment>): Promise<IComment> {
    if (!comment.id) {
      throw new Error("Comment ID is required")
    }

    for (const post of this.#posts.values()) {
      const index = post.comments.findIndex((c) => c.id === comment.id)
      if (index !== -1) {
        post.comments[index] = { ...post.comments[index], ...comment }
        this.#posts.set(post.id, post)
        return post.comments[index]
      }
    }
    throw new Error("Comment not found")
  }

  public async deleteComment(comment: IComment): Promise<void> {
    if (!comment.id) {
      throw new Error("Comment ID is required")
    }

    const post = this.#posts.get(comment.postId)
    if (!post) throw new Error("Post not found")

    const index = post.comments.findIndex((c) => c.id === comment.id)
    if (index === -1) throw new Error("Comment not found")

    post.comments.splice(index, 1)
    post.commentsCount = Math.max((post.commentsCount || 1) - 1, 0)
    this.#posts.set(post.id, post)
  }

  public async like(postId: string, userId: string): Promise<void> {
    const post = this.#posts.get(postId)
    if (!post) {
      throw new Error("Post not found")
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId)
      post.likesCount = post.likes.length
      this.#posts.set(postId, post)
    }
  }

  public async unlike(postId: string, userId: string): Promise<void> {
    const post = this.#posts.get(postId)
    if (!post) {
      throw new Error("Post not found")
    }

    const index = post.likes.indexOf(userId)
    if (index !== -1) {
      post.likes.splice(index, 1)
      post.likesCount = post.likes.length
      this.#posts.set(postId, post)
    }
  }

  public async listComments(
    postId: string,
    currentPage: number = 1,
    pageSize: number = 10
  ): Promise<ListCommentsResponseDTO> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const post = this.#posts.get(postId)
    if (!post) {
      throw new Error("Post not found")
    }

    const totalItems = post.comments.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedComments = post.comments.slice(startIndex, endIndex)

    const users = await this.#inMemoryUserRoute.list()
    const usersMap = new Map(users.map((user) => [user.id, user]))

    const updatedComments = paginatedComments.map((comment) => ({
      ...comment,
      owner: usersMap.get(comment.owner.id) ?? comment.owner,
    }))

    return {
      items: updatedComments,
      totalItems,
      totalPages,
    }
  }

  public async list(
    queryParams?: ListPostsDTO
  ): Promise<ListPostsResponseDTO<IPost>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let filteredPosts = Array.from(this.#posts.values())

    if (queryParams?.campaignId) {
      filteredPosts = filteredPosts.filter(
        (post) => post.campaignId === queryParams.campaignId
      )
    }
    if (queryParams?.ownerId) {
      filteredPosts = filteredPosts.filter(
        (post) => post.owner.id === queryParams.ownerId
      )
    }

    if (queryParams?.feed && queryParams?.userId) {
      const user = await this.#inMemoryUserRoute.list({
        userId: queryParams.userId,
      })
      if (user.length === 0) {
        return { items: [], totalItems: 0, totalPages: 0 }
      }
      const followingIds = user[0].following
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.owner.id === queryParams.userId ||
          followingIds.includes(post.owner.id)
      )
    }

    filteredPosts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const totalItems = filteredPosts.length
    const page = queryParams?.currentPage ?? 1
    const pageSize = queryParams?.pageSize ?? 10
    const totalPages = Math.ceil(totalItems / pageSize)

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    const users = await this.#inMemoryUserRoute.list()
    const usersMap = new Map(users.map((user) => [user.id, user]))

    const updatedPosts = paginatedPosts.map((post) => ({
      ...post,
      owner: usersMap.get(post.owner.id) ?? post.owner,
      comments: [],
    }))

    return {
      items: updatedPosts,
      totalItems,
      totalPages,
    }
  }
}

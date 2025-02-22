import { MockUserRoute } from "../user/MockUserRoute"

export class MockPostRoute implements IPostRoute {
  static #instance: MockPostRoute | null = null
  #posts: Array<IPost>
  #inMemoryUserRoute: IUserRoute

  private constructor() {
    this.#posts = []
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
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    this.#posts.push(newPost)
    return newPost
  }

  public async update(post: Partial<IPost>): Promise<IPost> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const existingPostIndex = this.#posts.findIndex((p) => p.id === post.id)

    if (existingPostIndex === -1) {
      throw new Error("Post not found.")
    }

    const existingPost = this.#posts[existingPostIndex]
    const updatedPost = { ...existingPost, ...post }
    this.#posts[existingPostIndex] = updatedPost

    return updatedPost
  }

  public async delete(postId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const postIndex = this.#posts.findIndex((post) => post.id === postId)
    if (postIndex === -1) {
      throw new Error("Post not found.")
    }
    this.#posts.splice(postIndex, 1)
  }

  public async list(
    queryParams?: ListPostsDTO
  ): Promise<ListPostsResponseDTO<IPost>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let filteredPosts = this.#posts

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
    }))

    return {
      items: updatedPosts,
      totalItems,
      totalPages,
    }
  }
}

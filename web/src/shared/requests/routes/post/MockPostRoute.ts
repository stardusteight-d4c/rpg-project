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
      id: crypto.randomUUID(),
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

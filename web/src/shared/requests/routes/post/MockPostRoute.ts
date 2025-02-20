export class MockPostRoute implements IPostRoute {
  static #instance: MockPostRoute | null = null
  #posts: Array<IPost>

  private constructor() {
    this.#posts = []
  }

  public static getInstance(): MockPostRoute {
    if (!this.#instance) {
      this.#instance = new MockPostRoute()
    }
    return this.#instance
  }

  public async create(post: IPost): Promise<IPost> {
    const newPost: IPost = {
      ...post,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    
    this.#posts.push(newPost)
    return newPost
  }

  public async update(post: Partial<IPost>): Promise<IPost> {
    const existingPostIndex = this.#posts.findIndex((p) => p.id === post.id);
    
    if (existingPostIndex === -1) {
      throw new Error("Post not found.");
    }

    const existingPost = this.#posts[existingPostIndex];
    const updatedPost = { ...existingPost, ...post };
    this.#posts[existingPostIndex] = updatedPost;

    return updatedPost;
  }

  public async delete(postId: string): Promise<void> {
    const postIndex = this.#posts.findIndex((post) => post.id === postId);
    if (postIndex === -1) {
      throw new Error("Post not found.");
    }
    this.#posts.splice(postIndex, 1);
  }

  public async list(queryParams?: ListPostsDTO): Promise<Array<IPost>> {
    let filteredPosts = this.#posts;

    if (queryParams?.campaignId) {
      filteredPosts = filteredPosts.filter((post) => post.campaignId === queryParams.campaignId);
    }
    if (queryParams?.ownerId) {
      filteredPosts = filteredPosts.filter((post) => post.owner.id === queryParams.ownerId);
    }

    if (queryParams?.currentPage && queryParams?.pageSize) {
      const page = parseInt(queryParams.currentPage, 10) || 1;
      const pageSize = parseInt(queryParams.pageSize, 10) || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      filteredPosts = filteredPosts.slice(startIndex, endIndex);
    }

    return filteredPosts;
  }
}

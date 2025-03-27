interface InMemoryUser extends IUser {
  password: string
  followers: Follow[]
  following: Follow[]
}

export class MockUserRoute implements IUserRoute {
  static #instance: MockUserRoute | null = null
  #users: Map<string, InMemoryUser>

  private constructor() {
    this.#users = new Map()
  }

  public static getInstance(): MockUserRoute {
    if (!this.#instance) {
      this.#instance = new MockUserRoute()
    }
    return this.#instance
  }

  public async create(data: SignUpDTO): Promise<IUser> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if ([...this.#users.values()].some((user) => user.email === data.email)) {
      throw new Error("This email already exists.")
    }

    if (
      [...this.#users.values()].some((user) => user.username === data.username)
    ) {
      throw new Error("This username already exists.")
    }

    const newUser: IUser & {
      password: string
      followers: Follow[]
      following: Follow[]
    } = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      createdAt: new Date().toISOString(),
      hoursPlayed: 0,
      avatarUrl: undefined,
      coverImage: undefined,
      exp: {
        current: 0,
        level: 0,
        nextLevel: 500,
      },
      followers: [],
      following: [],
      koalCampaigns: 0,
      memberSince: new Date().toISOString(),
      playingCampaigns: 0,
    }

    this.#users.set(newUser.id, newUser)
    return newUser
  }

  public async update(user: Partial<IUser>): Promise<IUser> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!user.id || !this.#users.has(user.id)) {
      throw new Error("User not found.")
    }

    const existingUser = this.#users.get(user.id)!
    const updatedUser = { ...existingUser, ...user }
    this.#users.set(
      user.id,
      updatedUser as IUser & {
        password: string
        followers: Follow[]
        following: Follow[]
      }
    )
    return updatedUser
  }

  public async list(queryParams: UserQueryParams): Promise<Array<IUser>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const usersArray = [...this.#users.values()]
    if (!queryParams) return usersArray

    if (queryParams.search) {
      return usersArray.filter((user) =>
        user.username
          .toLowerCase()
          .includes(queryParams.username?.toLowerCase()!)
      )
    }

    return usersArray.filter((user) => {
      const isMatchingId = !queryParams.userId || user.id === queryParams.userId
      const isMatchingUsername =
        !queryParams.username || user.username === queryParams.username
      return isMatchingId && isMatchingUsername
    })
  }

  public async follow(
    followedUserId: string,
    followingUserId: string
  ): Promise<{ followed: Follow; following: Follow }> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (followingUserId === followedUserId) {
      throw new Error("You cannot follow yourself.")
    }

    const whoIsBeingFollowed = this.#users.get(followedUserId)
    if (!whoIsBeingFollowed) {
      throw new Error("Followed user not found")
    }

    const whoIsFollowing = this.#users.get(followingUserId)
    if (!whoIsFollowing) {
      throw new Error("Following user not found")
    }

    const alreadyFollow = whoIsBeingFollowed.following.find(
      (following) => following.id === whoIsFollowing.id
    )
    if (alreadyFollow) throw new Error("You already follow this user.")

    const whoIsFollowingFollowingData: Follow = {
      id: whoIsFollowing.id,
      name: whoIsFollowing.name,
      username: whoIsFollowing.username,
      avatarUrl: whoIsFollowing.avatarUrl,
      coverImage: whoIsFollowing.coverImage,
      createdAt: new Date().toISOString(),
    }

    const whoIsBeingFollowedData: Follow = {
      id: whoIsBeingFollowed.id,
      name: whoIsBeingFollowed.name,
      username: whoIsBeingFollowed.username,
      avatarUrl: whoIsBeingFollowed.avatarUrl,
      coverImage: whoIsBeingFollowed.coverImage,
      createdAt: new Date().toISOString(),
    }

    const newFollower: InMemoryUser = {
      ...whoIsBeingFollowed,
      followers: [whoIsFollowingFollowingData, ...whoIsBeingFollowed.followers],
    }

    const newFollowing: InMemoryUser = {
      ...whoIsFollowing,
      following: [whoIsBeingFollowedData, ...whoIsFollowing.following],
    }

    this.#users.set(whoIsBeingFollowed.id, newFollower)
    this.#users.set(whoIsFollowing.id, newFollowing)

    return {
      followed: whoIsBeingFollowedData,
      following: whoIsFollowingFollowingData,
    }
  }

  public async unfollow(
    followedUserId: string,
    followingUserId: string
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const followedFound = this.#users.get(followedUserId)
    if (!followedFound) {
      throw new Error("Followed user not found")
    }

    const followingFound = this.#users.get(followingUserId)
    if (!followingFound) {
      throw new Error("Following user not found")
    }

    const updatedFollowedUser: InMemoryUser = {
      ...followedFound,
      followers: followedFound.followers.filter(
        (follow) => follow.id !== followingUserId
      ),
    }

    const updatedFollowingUser: InMemoryUser = {
      ...followingFound,
      following: followingFound.following.filter(
        (follow) => follow.id !== followedUserId
      ),
    }

    this.#users.set(followedUserId, updatedFollowedUser)
    this.#users.set(followingUserId, updatedFollowingUser)
  }

  public async followers(
    queryParams: FollowQueryParams
  ): Promise<ListResponseDTO<Follow>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const user = this.#users.get(queryParams.userId)
    if (!user) {
      throw new Error("User not found")
    }

    const sortedFollowers = [...user.followers].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const start =
      ((queryParams.currentPage || 1) - 1) * (queryParams.pageSize || 10)
    const end = start + (queryParams.pageSize || 10)
    const totalItems = user.followers.length

    return {
      items: sortedFollowers.slice(start, end),
      totalItems,
      totalPages: Math.ceil(totalItems / (queryParams.pageSize || 10)),
      currentPage: queryParams.currentPage || 1,
      pageSize: queryParams.pageSize || 10,
    }
  }

  public async following(
    queryParams: FollowQueryParams
  ): Promise<ListResponseDTO<Follow>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const user = this.#users.get(queryParams.userId)
    if (!user) {
      throw new Error("User not found")
    }

    const sortedFollowing = [...user.following].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const start =
      ((queryParams.currentPage || 1) - 1) * (queryParams.pageSize || 10)
    const end = start + (queryParams.pageSize || 10)
    const totalItems = user.following.length

    return {
      items: sortedFollowing.slice(start, end),
      totalItems,
      totalPages: Math.ceil(totalItems / (queryParams.pageSize || 10)),
      currentPage: queryParams.currentPage || 1,
      pageSize: queryParams.pageSize || 10,
    }
  }
}

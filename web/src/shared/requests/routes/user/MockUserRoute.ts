export class MockUserRoute implements IUserRoute {
  static #instance: MockUserRoute | null = null
  #users: Map<string, IUser & { password: string }>
  #follows: Map<string, Set<string>>

  private constructor() {
    this.#users = new Map()
    this.#follows = new Map()
  }

  public static getInstance(): MockUserRoute {
    if (!this.#instance) {
      this.#instance = new MockUserRoute()
    }
    return this.#instance
  }

  public async create(data: SignUpDTO): Promise<IUser> {
    if ([...this.#users.values()].some((user) => user.email === data.email)) {
      throw new Error("This email already exists.")
    }

    if (
      [...this.#users.values()].some((user) => user.username === data.username)
    ) {
      throw new Error("This username already exists.")
    }

    const newUser: IUser & { password: string } = {
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
      koalCampaigns: 0,
      memberSince: new Date().toISOString(),
      playingCampaigns: 0,
    }

    this.#users.set(newUser.id, newUser)
    this.#follows.set(newUser.id, new Set())
    return newUser
  }

  public async update(user: Partial<IUser>): Promise<IUser> {
    if (!user.id || !this.#users.has(user.id)) {
      throw new Error("User not found.")
    }

    const existingUser = this.#users.get(user.id)!
    const updatedUser = { ...existingUser, ...user }
    this.#users.set(user.id, updatedUser as IUser & { password: string })
    return updatedUser
  }

  public async list(queryParams?: ListUsersDTO): Promise<Array<IUser>> {
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
    userFollowId: string,
    userSessionId: string
  ): Promise<void> {
    if (userFollowId === userSessionId) {
      throw new Error("You cannot follow yourself.")
    }

    const followerSet = this.#follows.get(userSessionId)
    if (!followerSet) {
      throw new Error("User session not found.")
    }

    followerSet.add(userFollowId)
  }

  public async unfollow(
    userFollowId: string,
    userSessionId: string
  ): Promise<void> {
    const followerSet = this.#follows.get(userSessionId)
    if (!followerSet) {
      throw new Error("User session not found.")
    }

    followerSet.delete(userFollowId)
  }

  public async followers(userId: string): Promise<Array<IUser>> {
    const followers: IUser[] = []

    this.#follows.forEach((followedUsers, followerId) => {
      if (followedUsers.has(userId)) {
        const user = this.#users.get(followerId)
        if (user) {
          followers.push(user)
        }
      }
    })

    return followers
  }

  public async following(userId: string): Promise<Array<IUser>> {
    const followedUserIds = this.#follows.get(userId) || new Set()
    return [...this.#users.values()].filter((user) =>
      followedUserIds.has(user.id)
    )
  }
}

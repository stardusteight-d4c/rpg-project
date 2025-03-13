export class MockUserRoute implements IUserRoute {
  static #instance: MockUserRoute | null = null
  #users: Map<string, IUser & { password: string }>

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
      following: [],
      followers: [],
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
    return newUser
  }

  public async update(user: Partial<IUser>): Promise<IUser> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!user.id || !this.#users.has(user.id)) {
      throw new Error("User not found.")
    }

    const existingUser = this.#users.get(user.id)!
    const updatedUser = { ...existingUser, ...user }
    this.#users.set(user.id, updatedUser as IUser & { password: string })
    return updatedUser
  }

  public async list(queryParams?: ListUsersDTO): Promise<Array<IUser>> {
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
    userFollowed: string,
    userFollowing: string
  ): Promise<{ updatedFollowedUser: IUser; updatedFollowingUser: IUser }> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (userFollowing === userFollowed) {
      throw new Error("You cannot follow yourself.")
    }

    const followedFound = this.#users.get(userFollowed)
    if (!followedFound) {
      throw new Error("Followed user not found")
    }

    const followingFound = this.#users.get(userFollowing)
    if (!followingFound) {
      throw new Error("Following user not found")
    }

    const updatedFollowedUser = {
      ...followedFound,
      followers: [...followedFound.followers, userFollowing],
    }
    const updatedFollowingUser = {
      ...followingFound,
      following: [...followingFound.following, userFollowed],
    }

    this.#users.set(
      userFollowed,
      updatedFollowedUser as IUser & { password: string }
    )
    this.#users.set(
      userFollowing,
      updatedFollowingUser as IUser & { password: string }
    )
    return { updatedFollowedUser, updatedFollowingUser }
  }

  public async unfollow(
    userFollowed: string,
    userFollowing: string
  ): Promise<{ updatedFollowedUser: IUser; updatedFollowingUser: IUser }> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const followedFound = this.#users.get(userFollowed)
    if (!followedFound) {
      throw new Error("Followed user not found")
    }

    const followingFound = this.#users.get(userFollowing)
    if (!followingFound) {
      throw new Error("Following user not found")
    }

    const updatedFollowedUser = {
      ...followedFound,
      followers: followedFound.followers.filter(
        (follow) => follow !== userFollowing
      ),
    }
    const updatedFollowingUser = {
      ...followingFound,
      following: followingFound.following.filter(
        (follow) => follow !== userFollowed
      ),
    }

    this.#users.set(
      userFollowed,
      updatedFollowedUser as IUser & { password: string }
    )
    this.#users.set(
      userFollowing,
      updatedFollowingUser as IUser & { password: string }
    )

    return { updatedFollowedUser, updatedFollowingUser }
  }

  public async followers(userId: string): Promise<Array<IUser>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const user = this.#users.get(userId)
    if (!user) {
      throw new Error("User not found")
    }
    const followersIds = user.followers || []
    const followers = followersIds
      .map((id) => this.#users.get(id))
      .filter((user) => user !== undefined) as IUser[]

    return followers
  }

  public async following(userId: string): Promise<Array<IUser>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const user = this.#users.get(userId)
    if (!user) {
      throw new Error("User not found")
    }
    const followingIds = user.following || []
    const following = followingIds
      .map((id) => this.#users.get(id))
      .filter((user) => user !== undefined) as IUser[]

    return following
  }
}

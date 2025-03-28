interface InMemoryUser extends IUser {
  password: string
  followers: Follow[]
  totalFollowers: number
  following: Follow[]
  totalFollowing: number
}

export class MockUserRoute implements IUserRoute {
  static #instance: MockUserRoute | null = null
  #users: Map<string, InMemoryUser>
  #notifications: Map<string, UserNotifications>

  private constructor() {
    this.#users = new Map()
    this.#notifications = new Map()
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

    const newUser: InMemoryUser = {
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
      totalFollowers: 0,
      totalFollowing: 0,
      koalCampaigns: 0,
      memberSince: new Date().toISOString(),
      playingCampaigns: 0,
    }

    this.#notifications.set(newUser.id, {
      notifications: [],
      viewed: true,
    })
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
    this.#users.set(user.id, updatedUser as InMemoryUser)
    return updatedUser
  }

  public async notifications(
    queryParams: NotificationQueryParams
  ): Promise<NotificationsResponseDTO> {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const { recipientId, currentPage, pageSize } = queryParams

    if (!recipientId) throw new Error("recipientId is required.")

    const recipient = this.#notifications.get(recipientId)
    if (!recipient) {
      throw new Error("Recipient not found.")
    }

    const sortedNotifications = [...recipient.notifications].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const start = ((currentPage || 1) - 1) * (pageSize || 10)
    const end = start + (pageSize || 10)
    const totalItems = sortedNotifications.length

    return {
      notifications: sortedNotifications.slice(start, end),
      viewed: recipient.viewed,
      totalItems,
      totalPages: Math.ceil(totalItems / (pageSize || 10)),
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
    }
  }

  public async viewedNotifications(
    recipientId: string,
    isViewed: boolean
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const recipientNotifications = this.#notifications.get(recipientId)

    if (recipientNotifications) {
      this.#notifications.set(recipientId, {
        notifications: recipientNotifications.notifications,
        viewed: isViewed,
      })
    }
  }

  public async sendNotification(notification: INotification): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const recipientNotifications = this.#notifications.get(
      notification.recipientId
    )
    if (recipientNotifications) {
      this.#notifications.set(notification.recipientId, {
        notifications: [notification, ...recipientNotifications.notifications],
        viewed: false,
      })
    } else {
      this.#notifications.set(notification.recipientId, {
        notifications: [notification],
        viewed: false,
      })
    }
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
      throw new Error("Followed user not found.")
    }

    const whoIsFollowing = this.#users.get(followingUserId)
    if (!whoIsFollowing) {
      throw new Error("Following user not found.")
    }

    const alreadyFollow = whoIsBeingFollowed.followers.find(
      (follower) => follower.id === whoIsFollowing.id
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
      totalFollowers: whoIsBeingFollowed.totalFollowers + 1,
      followers: [whoIsFollowingFollowingData, ...whoIsBeingFollowed.followers],
    }

    const newFollowing: InMemoryUser = {
      ...whoIsFollowing,
      totalFollowing: whoIsFollowing.totalFollowing + 1,
      following: [whoIsBeingFollowedData, ...whoIsFollowing.following],
    }

    this.#users.set(whoIsBeingFollowed.id, newFollower)
    this.#users.set(whoIsFollowing.id, newFollowing)

    const newNotification: INotification = {
      id: crypto.randomUUID(),
      type: "text",
      content: `Now it's following you!`,
      recipientId: whoIsBeingFollowed.id,
      sender: {
        id: whoIsFollowing.id,
        name: whoIsFollowing.name,
        avatarUrl: whoIsFollowing.avatarUrl,
        username: whoIsFollowing.username,
      },
      createdAt: new Date().toISOString(),
    }

    await this.sendNotification(newNotification)

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
      throw new Error("Followed user not found.")
    }

    const followingFound = this.#users.get(followingUserId)
    if (!followingFound) {
      throw new Error("Following user not found.")
    }

    const updatedFollowedUser: InMemoryUser = {
      ...followedFound,
      totalFollowers: followedFound.totalFollowers - 1,
      followers: followedFound.followers.filter(
        (follow) => follow.id !== followingUserId
      ),
    }

    const updatedFollowingUser: InMemoryUser = {
      ...followingFound,
      totalFollowing: followingFound.totalFollowing - 1,
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
    const { userId, currentPage, pageSize } = queryParams
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const user = this.#users.get(userId)
    if (!user) {
      throw new Error("User not found.")
    }

    const sortedFollowers = [...user.followers].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const start = ((currentPage || 1) - 1) * (pageSize || 10)
    const end = start + (pageSize || 10)
    const totalItems = user.followers.length

    return {
      items: sortedFollowers.slice(start, end),
      totalItems,
      totalPages: Math.ceil(totalItems / (pageSize || 10)),
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
    }
  }

  public async following(
    queryParams: FollowQueryParams
  ): Promise<ListResponseDTO<Follow>> {
    const { userId, currentPage, pageSize } = queryParams
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const user = this.#users.get(userId)
    if (!user) {
      throw new Error("User not found.")
    }

    const sortedFollowing = [...user.following].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const start = ((currentPage || 1) - 1) * (pageSize || 10)
    const end = start + (pageSize || 10)
    const totalItems = user.following.length

    return {
      items: sortedFollowing.slice(start, end),
      totalItems,
      totalPages: Math.ceil(totalItems / (pageSize || 10)),
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
    }
  }
}

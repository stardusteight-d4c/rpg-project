export class MockUserRoute implements IUserRoute {
  static #instance: MockUserRoute | null = null
  #users: Array<
    IUser & {
      password: string
    }
  >

  private constructor() {
    this.#users = []
  }

  public static getInstance(): MockUserRoute {
    if (!this.#instance) {
      this.#instance = new MockUserRoute()
    }
    return this.#instance
  }

  public async getUsers(): Promise<Array<IUser>> {
    return this.#users
  }

  public async getByUsername(username: string): Promise<IUser | undefined> {
    return this.#users.find((user) => user.username === username)
  }

  public async add(data: SignUpDTO): Promise<IUser> {
    const isEmailAlreadyExists = this.#users.find(
      (user) => user.email === data.email
    )

    const isUsernameAlreadyExists = this.#users.find(
      (user) => user.username === data.username
    )

    if (isEmailAlreadyExists) {
      throw new Error("This email already exists.")
    }

    if (isUsernameAlreadyExists) {
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

    this.#users.push(newUser)
    return newUser
  }

  public async update(user: Partial<IUser>): Promise<IUser> {
    const existingUserIndex = this.#users.findIndex((u) => u.id === user.id)
    if (existingUserIndex === -1) {
      throw new Error("User not found.")
    }

    const existingUser = this.#users[existingUserIndex]
    const updatedUser = { ...existingUser, ...user }

    this.#users[existingUserIndex] = updatedUser as IUser & { password: string }
    return updatedUser
  }
}

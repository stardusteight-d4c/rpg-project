export class MockAuthRoute implements IAuthRoute {
  #users: Array<
    User & {
      password: string
    }
  >

  constructor() {
    this.#users = []
  }

  public async register(
    data: AuthRegisterRequest
  ): Promise<AuthRegisterResponse> {
    const newUser: User & { password: string } = {
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

    const accessToken = crypto.randomUUID()

    const refreshToken = crypto.randomUUID()

    return {
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }
}

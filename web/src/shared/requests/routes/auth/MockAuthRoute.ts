import { MockUserRoute } from "../user/MockUserRoute"

export class MockAuthRoute implements IAuthRoute {
  static #instance: MockAuthRoute | null = null
  inMemoryUserRoute: MockUserRoute

  private constructor() {
    this.inMemoryUserRoute = MockUserRoute.getInstance()
  }

  public static getInstance(): MockAuthRoute {
    if (!this.#instance) {
      this.#instance = new MockAuthRoute()
    }
    return this.#instance
  }

  public async signUp(data: SignUpDTO): Promise<AuthResponse> {
    return this.inMemoryUserRoute
      .add(data)
      .then((newUser) => {
        const accessToken = crypto.randomUUID()
        const refreshToken = crypto.randomUUID()
        return {
          user: newUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  public async signIn(data: SignInDTO): Promise<AuthResponse> {
    return this.inMemoryUserRoute
      .getUsers()
      .then((users) => {
        const accessToken = crypto.randomUUID()
        const refreshToken = crypto.randomUUID()

        if (data.email) {
          const foundUser = users.find((user) => user.email === data.email)
          if (!foundUser) {
            throw new Error("There is no user with this email.")
          }
          if (foundUser.password !== data.password) {
            throw new Error("Email or password incorret.")
          }
          return {
            user: foundUser,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }
        }

        const foundUser = users.find((user) => user.username === data.username)
        if (!foundUser) {
          throw new Error("There is no user with this username.")
        }
        if (foundUser.password !== data.password) {
          throw new Error("Username or password incorret.")
        }
        return {
          user: foundUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }
}

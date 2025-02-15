interface AuthRegisterRequest {
  name: string
  email: string
  username: string
  password: string
}

interface AuthRegisterResponse {
  user: User
  accessToken: string
  refreshToken: string
}


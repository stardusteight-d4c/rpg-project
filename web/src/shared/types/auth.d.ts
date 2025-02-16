interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

interface SignUpDTO {
  name: string
  email: string
  username: string
  password: string
}

interface SignInDTO {
  email?: string
  username?: string
  password: string
}

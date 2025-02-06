interface SignUpDTO {
  name: string
  username: string
  password: string
  email: string
}

interface SignInDTO {
  username?: string
  email?: string
  password: string
}

interface UserDB extends SignUpDTO {
  id: string
}

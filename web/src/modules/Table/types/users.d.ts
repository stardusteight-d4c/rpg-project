type UserRole = "master" | "player"

interface IUser {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string
  role: UserRole
}

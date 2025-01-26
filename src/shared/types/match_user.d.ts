type MatchUserRole = "master" | "player"

interface IMatchUser {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string
  role: MatchUserRole
}

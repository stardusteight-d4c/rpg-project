type UserTableRole = "master" | "player"

interface User {
  id: string
  name: string
  username: string
  email: string
  avatarUrl: string | undefined
  coverImage: string | undefined
  exp: {
    level: number
    current: number
    nextLevel: number
  }
  memberSince: string
  hoursPlayed: number
  koalCampaigns: number
  playingCampaigns: number
  createdAt: string
}

interface TableUser extends User {
  role: UserTableRole
}

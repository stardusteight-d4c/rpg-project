type UserRole = "master" | "player"

interface IUser {
  id: string
  name: string
  username: string
  email: string
  avatarUrl: string
  role: UserRole
  coverImage?: string
  exp?: {
    level: number
    current: number
    nextLevel: number
  }
  memberSince?: string
  hoursPlayed?: number
  koalCampaigns?: number
  playingCampaigns?: number
}

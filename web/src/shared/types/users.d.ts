type UserTableRole = "master" | "player"

interface IUser {
  id: string
  name: string
  username: string
  password?: string
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

interface TableUser extends IUser {
  role: UserTableRole
}

interface ListUsersDTO {
  search?: boolean
  username?: string 
  userId?: string
}
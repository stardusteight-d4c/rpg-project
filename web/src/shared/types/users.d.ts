interface Follow {
  id: string
  name: string
  username: string
  avatarUrl: string | undefined
  coverImage: string | undefined
  createdAt: string
}

interface IUser {
  id: string
  name: string
  username: string
  password?: string
  email: string
  avatarUrl: string | undefined
  coverImage: string | undefined
  followers?: Follow[]
  following?: Follow[]
  totalFollowers?: number
  totalFollowing?: number
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

interface FollowQueryParams extends ListQueryParams {
  userId: string
}

interface UserQueryParams extends ListQueryParams {
  search?: boolean
  username?: string
  userId?: string
}

interface NotificationQueryParams extends ListQueryParams {
  recipientId?: string
}

interface INotification {
  id: string
  recipientId: string
  content: string
  type: "text" | "html"
  sender?: {
    id: string
    name: string
    avatarUrl?: string
    username: string
  }
  createdAt: string
}

interface UserNotifications {
  notifications: Array<INotification>
  viewed: boolean
}

interface NotificationsResponseDTO {
  notifications: INotification[]
  viewed: boolean
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
}

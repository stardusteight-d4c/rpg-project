interface IPost {
  id: string
  owner: IUser
  campaignId?: string
  campaign?: Partial<ICampaign>
  content: string
  image?: string | undefined
  commentsCount: number
  likes: Array<string>
  likesCount: number
  likedByUser: boolean
  comments: Array<IComment>
  createdAt: string
}

interface IComment {
  id: string
  postId: string
  owner: User
  content: string
  createdAt: string
}

interface ListPostsDTO {
  feed?: boolean
  campaignId?: string
  ownerId?: string
  currentPage?: number
  pageSize?: number
}

interface ListCommentsDTO {
  postId: string
  currentPage?: number
  pageSize?: number
}

interface ListPostsResponseDTO<T> {
  items: Array<T>
  totalItems: number
  totalPages: number
  currentPage?: number
  pageSize?: number
}

interface ListCommentsResponseDTO {
  items: IComment[]
  totalItems: number
  totalPages: number
}

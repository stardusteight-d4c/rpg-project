interface IPost {
  id: string
  owner: IUser
  campaignId?: string
  content: string
  image?: string | undefined
  commentsCount?: number
  likes: Array<string>
  likesCount?: number
  likedByUser?: boolean
  comments: Array<IComment>
  createdAt: string
}

interface IComment {
  id: string
  owner: User
  content: string
  createdAt: string
}

interface ListPostsDTO {
  campaignId?: string
  ownerId?: string
  currentPage?: number
  pageSize?: number
}

interface ListPostsResponseDTO<T> {
  items: Array<T>
  totalItems: number
  totalPages: number
}

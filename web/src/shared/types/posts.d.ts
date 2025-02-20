interface IPost {
  id: string
  owner: User
  campaignId?: string
  content: string
  image?: string | undefined
  commentsCount?: number
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
  currentPage?: string
  pageSize?: string
}

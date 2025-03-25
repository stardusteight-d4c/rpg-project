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

interface PostQueryParams extends ListQueryParams {
  feed?: boolean
  campaignId?: string
  ownerId?: string
}

interface CommentQueryParams {
  postId?: string
  currentPage?: number
  pageSize?: number
}

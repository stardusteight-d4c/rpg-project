interface IPost {
  id: string
  user: User
  content: string
  createdAt: string
  image?: string | undefined
  commentsCount?: number,
  likesCount?: number,
  likedByUser?: boolean,
  tags: Array<{
    type: "profile" | "campaign"
    value: string
    linkId: string
  }>
  comments: Array<IComment>
}

interface IComment {
  id: string
  user: User
  content: string
  createdAt: string
}
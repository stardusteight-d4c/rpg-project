interface IPost {
  id: string
  user: IUser
  content: string
  createdAt: string
  image?: string | undefined
  likesCount?: number,
  likedByUser?: boolean,
  tags: Array<{
    type: "user" | "campaign"
    value: string
    linkId: string
  }>
  comments: Array<{
    id: string
    user: IUser
    content: string
    createdAt: string
  }>
}
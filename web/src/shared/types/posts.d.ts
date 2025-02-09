interface IPost {
  id: string
  user: IUser
  content: string
  createdAt: string
  image?: string | undefined
  tags: Array<{
    type: "user" | "campaign"
    id: string
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
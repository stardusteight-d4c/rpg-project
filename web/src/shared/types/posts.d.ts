interface IPost {
  id: string
  user: IUser
  content: string
  createdAt: string
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
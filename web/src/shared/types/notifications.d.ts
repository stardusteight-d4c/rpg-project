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

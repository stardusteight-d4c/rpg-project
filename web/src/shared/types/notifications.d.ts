interface INotification {
  id: string
  by?: Partial<ISheet>
  owner?: User
  content: string
  createdAt: string
}

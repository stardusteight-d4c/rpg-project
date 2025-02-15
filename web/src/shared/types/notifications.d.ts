interface INotification {
  id: string
  by?: Partial<ICharacter>
  owner?: User
  content: string
  createdAt: string
}

interface INotification {
  id: string
  by?: Partial<ICharacter>
  owner?: IUser
  content: string
  createdAt: string
}

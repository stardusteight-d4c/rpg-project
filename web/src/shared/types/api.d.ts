interface API {
  auth: IAuthRoute
  user: IUserRoute
  sheet: ISheetRoute
  map: IMapRoute
  campaign: ICampaignRoute
  post: IPostRoute
}

// Criar rotas findOne (with params)

interface IAuthRoute {
  signUp(data: SignUpDTO): Promise<AuthResponse>
  signIn(data: SignInDTO): Promise<AuthResponse>
}

interface IUserRoute {
  create(user: CreateUserDTO): Promise<IUser>
  update(user: Partial<IUser>): Promise<IUser>
  list(queryParams: UserQueryParams): Promise<Array<IUser>>
  follow(
    followedUserId: string,
    followingUserId: string
  ): Promise<{ followed: Follow; following: Follow }>
  unfollow(followedUserId: string, followingUserId: string): Promise<void>
  followers(queryParams: FollowQueryParams): Promise<ListResponseDTO<Follow>>
  following(queryParams: FollowQueryParams): Promise<ListResponseDTO<Follow>>
  sendNotification(notification: INotification): Promise<void>
  notifications(
    queryParams: NotificationQueryParams
  ): Promise<NotificationsResponseDTO>
  viewedNotifications(recipientId: string, isViewed: boolean): Promise<void>
}

interface ISheetRoute {
  create(sheet: ISheet): Promise<ISheet>
  update(sheet: Partial<ISheet>): Promise<ISheet>
  delete(sheetId: string): Promise<void>
  list(queryParams: SheetQueryParams): Promise<ListResponseDTO<ISheet>>
  toggleActive(sheetId: string, tableId: string): Promise<ISheet[]>
  addToTable(sheetId: string, tableId: string): Promise<ISheet>
  removeFromTable(sheetId: string, tableId: string): Promise<ISheet>
}

interface IMapRoute {
  create(map: IMap): Promise<IMap>
  update(updatedMap: Partial<IMap>): Promise<IMap>
  delete(id: string): Promise<void>
  moveSheet(sheetPosition: SheetPosition): Promise<void>
}

interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
  update(campaign: Partial<ICampaign>): Promise<ICampaign>
  delete(campaignId: string): Promise<void>
  roll(roll: IRoll): Promise<IRoll>
  rolls(queryParams: RollsQueryParams): Promise<ListResponseDTO<IRoll>>
  list(queryParams: CampaignQueryParams): Promise<ListResponseDTO<ICampaign>>
  join(params: JoinCampaignParams): Promise<ICampaign>
  kick(params: KickPlayerParams): Promise<void>
}

interface IPostRoute {
  create(post: IPost): Promise<IPost>
  update(post: Partial<IPost>): Promise<IPost>
  delete(postId): Promise<void>
  comment(postId: string, comment: IComment): Promise<IComment>
  updateComment(comment: Partial<IComment>): Promise<IComment>
  deleteComment(comment: IComment): Promise<void>
  like(postId: string, userId: string): Promise<void>
  unlike(postId: string, userId: string): Promise<void>
  listComments(
    queryParams: CommentQueryParams
  ): Promise<ListResponseDTO<IComment>>
  list(queryParams: PostQueryParams): Promise<ListResponseDTO<IPost>>
}

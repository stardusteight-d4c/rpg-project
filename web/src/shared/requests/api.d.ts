interface API {
  auth: IAuthRoute
  user: IUserRoute
  sheet: ISheetRoute
  campaign: ICampaignRoute
  post: IPostRoute
}

interface IAuthRoute {
  signUp(data: SignUpDTO): Promise<AuthResponse>
  signIn(data: SignInDTO): Promise<AuthResponse>
}

interface IUserRoute {
  create(user: CreateUserDTO): Promise<IUser>
  update(user: Partial<IUser>): Promise<IUser>
  list(queryParams: UserQueryParams): Promise<Array<IUser>>
  follow(
    userFollowed: string,
    userFollowing: string
  ): Promise<{ updatedFollowedUser: IUser; updatedFollowingUser: IUser }>
  unfollow(
    userFollowed: string,
    userFollowing: string
  ): Promise<{ updatedFollowedUser: IUser; updatedFollowingUser: IUser }>
  followers(userId: string): Promise<Array<IUser>>
  following(userId: string): Promise<Array<IUser>>
}

interface ISheetRoute {
  create(sheet: ISheet): Promise<ISheet>
  update(sheet: Partial<ISheet>): Promise<ISheet>
  delete(sheetId: string): Promise<void>
  list(queryParams: SheetQueryParams): Promise<ListResponseDTO<ISheet>>
}

interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
  update(campaign: Partial<ICampaign>): Promise<ICampaign>
  delete(campaignId: string): Promise<void>
  list(queryParams: CampaignQueryParams): Promise<ListResponseDTO<ICampaign>>
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

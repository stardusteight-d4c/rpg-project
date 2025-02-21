interface IAuthRoute {
  signUp(data: SignUpDTO): Promise<AuthResponse>
  signIn(data: SignInDTO): Promise<AuthResponse>
}

interface IUserRoute {
  create(user: CreateUserDTO): Promise<IUser>
  update(user: Partial<IUser>): Promise<IUser>
  list(queryParams?: ListUsersDTO): Promise<Array<IUser>>
}

interface ISheetRoute {
  create(sheet: ISheet): Promise<ISheet>
  update(sheet: Partial<ISheet>): Promise<ISheet>
  delete(sheetId: string): Promise<void>
  list(queryParams?: ListSheetsDTO): Promise<Array<ISheet>>
}

interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
  update(campaign: Partial<ICampaign>): Promise<ICampaign>
  delete(campaignId: string): Promise<void>
  list(queryParams?: ListCampaignsDTO): Promise<Array<ICampaign>>
}

interface IPostRoute {
  create(post: IPost): Promise<IPost>
  update(post: Partial<IPost>): Promise<IPost>
  delete(postId): Promise<void>
  list(queryParams?: ListPostsDTO): Promise<ListPostsResponseDTO<IPost>>
}

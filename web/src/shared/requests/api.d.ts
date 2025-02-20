interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
  getUserCampaigns(userId: string): Promise<Array<ICampaign>>
  getById(campaignId: string): Promise<ICampaign | undefined>
  update(campaign: Partial<ICampaign>): Promise<ICampaign>
  delete(campaignId: string): Promise<void>
}

interface IAuthRoute {
  signUp(data: SignUpDTO): Promise<AuthResponse>
  signIn(data: SignInDTO): Promise<AuthResponse>
}

interface IUserRoute {
  add(user: CreateUserDTO): Promise<IUser>
  update(user: Partial<IUser>): Promise<IUser>
  getUsers(): Promise<Array<IUser>>
  getByUsername(username: string): Promise<IUser | undefined>
}

interface ISheetRoute {
  add(sheet: ISheet): Promise<ISheet>
  update(sheet: Partial<ISheet>): Promise<ISheet>
  getUserSheets(userId: string): Promise<Array<ISheet>>
  delete(sheetId: string): Promise<void>
}

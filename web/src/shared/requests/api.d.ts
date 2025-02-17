interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
  getCampaigns(): Array<ICampaign>
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

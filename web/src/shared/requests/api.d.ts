interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
}

interface IAuthRoute {
  register(data: AuthRegisterRequest): Promise<AuthRegisterResponse>
}

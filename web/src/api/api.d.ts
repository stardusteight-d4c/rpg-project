interface ICampaignRoute {
  create(campaign: CampaignCreate): Promise<ICampaign>
}

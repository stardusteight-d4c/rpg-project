export class MockCampaignRoute implements ICampaignRoute {
  static #instance: MockCampaignRoute | null = null
  #campaigns: Array<ICampaign>

  private constructor() {
    this.#campaigns = []
  }

  public static getInstance(): MockCampaignRoute {
    if (!this.#instance) {
      this.#instance = new MockCampaignRoute()
    }
    return this.#instance
  }

  public async getUserCampaigns(userId: string): Promise<Array<ICampaign>> {
    return this.#campaigns.filter(
      (campaign) => campaign.createdBy.id === userId
    )
  }

  public async getById(campaignId: string): Promise<ICampaign | undefined> {
    return this.#campaigns.find((campaign) => campaign.id === campaignId)
  }

  public async create(campaign: CampaignCreate): Promise<ICampaign> {
    const newCampaign: ICampaign = {
      ...campaign,
      id: crypto.randomUUID(),
      duration: "0",
      coverUrl: campaign.coverUrl ?? undefined,
      status: "inactive" as "inactive",
      players: [campaign.createdBy],
      tableId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    return newCampaign
  }
}

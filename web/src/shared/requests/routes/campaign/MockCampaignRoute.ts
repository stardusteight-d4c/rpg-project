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

  public getCampaigns(): Array<ICampaign> {
    return this.#campaigns
  }

  public async create(campaign: CampaignCreate): Promise<ICampaign> {
    const newCampaign = {
      ...campaign,
      id: crypto.randomUUID(),
      duration: "0",
      coverUrl: campaign.coverUrl ?? "",
      status: "inactive" as "inactive",
      players: [],
      tableId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    return newCampaign
  }
}

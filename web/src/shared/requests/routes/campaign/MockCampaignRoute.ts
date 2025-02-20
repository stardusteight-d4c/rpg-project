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

  public async update(campaign: Partial<ICampaign>): Promise<ICampaign> {
    const existingCampaignIndex = this.#campaigns.findIndex(
      (c) => c.id === campaign.id
    )

    if (existingCampaignIndex === -1) {
      throw new Error("Campaign not found.")
    }

    const existingCampaign = this.#campaigns[existingCampaignIndex]
    const updatedCampaign = { ...existingCampaign, ...campaign }
    this.#campaigns[existingCampaignIndex] = updatedCampaign

    return updatedCampaign
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
    this.#campaigns.push(newCampaign)
    return newCampaign
  }

  public async delete(campaignId: string): Promise<void> {
    const newArray = this.#campaigns.filter(
      (campaign) => campaign.id !== campaignId
    )
    this.#campaigns = newArray
  }
}

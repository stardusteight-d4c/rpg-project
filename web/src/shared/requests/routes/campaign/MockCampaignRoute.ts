import { MockUserRoute } from "../user/MockUserRoute"

export class MockCampaignRoute implements ICampaignRoute {
  static #instance: MockCampaignRoute | null = null
  #campaigns: Array<ICampaign>
  #inMemoryUserRoute: IUserRoute

  private constructor() {
    this.#campaigns = []
    this.#inMemoryUserRoute = MockUserRoute.getInstance()
  }

  public static getInstance(): MockCampaignRoute {
    if (!this.#instance) {
      this.#instance = new MockCampaignRoute()
    }
    return this.#instance
  }

  public async create(campaign: CampaignCreate): Promise<ICampaign> {
    const newCampaign: ICampaign = {
      ...campaign,
      id: crypto.randomUUID(),
      duration: "0",
      coverUrl: campaign.coverUrl ?? undefined,
      status: "inactive" as "inactive",
      players: [campaign.owner],
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

  public async list(queryParams?: ListCampaignsDTO): Promise<Array<ICampaign>> {
    const users = await this.#inMemoryUserRoute.list()
    const usersMap = new Map(users.map((user) => [user.id, user]))

    let filteredCampaigns = this.#campaigns.filter((campaign) => {
      const isMatchingId =
        !queryParams?.campaignId || campaign.id === queryParams.campaignId
      const isMatchingOwner =
        !queryParams?.ownerId || campaign.owner.id === queryParams.ownerId
      const isMatchingStatus =
        !queryParams?.status || campaign.status === queryParams.status
      return isMatchingId && isMatchingOwner && isMatchingStatus
    })

    filteredCampaigns = filteredCampaigns.map((campaign) => {
      const updatedOwner = usersMap.get(campaign.owner.id) ?? campaign.owner
      return { ...campaign, owner: updatedOwner }
    })

    return filteredCampaigns
  }
}

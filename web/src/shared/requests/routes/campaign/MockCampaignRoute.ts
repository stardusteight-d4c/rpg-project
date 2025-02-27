import { MockUserRoute } from "../user/MockUserRoute"

export class MockCampaignRoute implements ICampaignRoute {
  static #instance: MockCampaignRoute | null = null
  #campaigns: Map<string, ICampaign>
  #inMemoryUserRoute: IUserRoute

  private constructor() {
    this.#campaigns = new Map()
    this.#inMemoryUserRoute = MockUserRoute.getInstance()
  }

  public static getInstance(): MockCampaignRoute {
    if (!this.#instance) {
      this.#instance = new MockCampaignRoute()
    }
    return this.#instance
  }

  public async create(campaign: CampaignCreate): Promise<ICampaign> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

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
    this.#campaigns.set(newCampaign.id, newCampaign)
    return newCampaign
  }

  public async delete(campaignId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    this.#campaigns.delete(campaignId)
  }

  public async update(campaign: Partial<ICampaign>): Promise<ICampaign> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!campaign.id || !this.#campaigns.has(campaign.id)) {
      throw new Error("Campaign not found.")
    }

    const existingCampaign = this.#campaigns.get(campaign.id)!
    const updatedCampaign = { ...existingCampaign, ...campaign }
    this.#campaigns.set(campaign.id, updatedCampaign)

    return updatedCampaign
  }

  public async list(queryParams?: ListCampaignsDTO): Promise<Array<ICampaign>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let filteredCampaigns = Array.from(this.#campaigns.values())

    if (queryParams?.search) {
      filteredCampaigns = filteredCampaigns.filter((campaign) =>
        campaign.name
          .toLocaleLowerCase()
          .includes(queryParams.name?.toLocaleLowerCase()!)
      )
    }

    const users = await this.#inMemoryUserRoute.list()
    const usersMap = new Map(users.map((user) => [user.id, user]))

    filteredCampaigns = filteredCampaigns.filter((campaign) => {
      const isMatchingId =
        !queryParams?.campaignId || campaign.id === queryParams.campaignId
      const isMatchingOwner =
        !queryParams?.ownerId || campaign.owner.id === queryParams.ownerId
      const isMatchingStatus =
        !queryParams?.status || campaign.status === queryParams.status
      return isMatchingId && isMatchingOwner && isMatchingStatus
    })

    return filteredCampaigns.map((campaign) => {
      const updatedOwner = usersMap.get(campaign.owner.id) ?? campaign.owner
      return { ...campaign, owner: updatedOwner }
    })
  }
}

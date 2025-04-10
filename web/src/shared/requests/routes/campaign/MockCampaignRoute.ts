import { MockUserRoute } from "../user/MockUserRoute"

export class MockCampaignRoute implements ICampaignRoute {
  static #instance: MockCampaignRoute | null = null
  #campaigns: Map<string, ICampaign>
  #inMemoryUserRoute: IUserRoute
  #inMemoryPostRoute: IPostRoute | null = null

  private constructor() {
    this.#campaigns = new Map()
    this.#inMemoryUserRoute = MockUserRoute.getInstance()
  }

  public static initialize(postRoute: IPostRoute): void {
    if (this.#instance) {
      this.#instance.#inMemoryPostRoute = postRoute
    }
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
      rolls: [],
      maps: [],
      players: [campaign.owner],
      tableId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    this.#campaigns.set(newCampaign.id, newCampaign)
    return newCampaign
  }

  public async delete(campaignId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const campaignPostsIds = await this.#inMemoryPostRoute!.list({
      campaignId,
    }).then((res) => res.items.map((post) => post.id))

    await Promise.all(
      campaignPostsIds.map((id) => this.#inMemoryPostRoute!.delete(id))
    )

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

  public async roll(roll: IRoll): Promise<IRoll> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const campaign = this.#campaigns.get(roll.campaignId)
    if (!campaign) throw new Error("Campaign not found.")

    this.#campaigns.set(campaign.id, {
      ...campaign,
      rolls: [{ ...roll, ...campaign.rolls }],
    })

    return roll
  }

  public async rolls(
    queryParams: RollsQueryParams
  ): Promise<ListResponseDTO<IRoll>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const { campaignId } = queryParams
    const pageSize = queryParams?.pageSize || 20
    const currentPage = queryParams?.currentPage || 1

    if (!campaignId) throw new Error("campaignId is required.")
    const campaign = this.#campaigns.get(campaignId)
    if (!campaign) throw new Error("Campaign not found.")

    const rolls = campaign.rolls
    const totalItems = rolls.length
    const totalPages = Math.ceil(totalItems / pageSize)

    const startIndex = (currentPage - 1) * pageSize
    const pagedItems = rolls
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(startIndex, startIndex + pageSize)

    return {
      items: pagedItems,
      totalItems,
      totalPages,
      currentPage,
      pageSize,
    }
  }

  public async list(
    queryParams: CampaignQueryParams
  ): Promise<ListResponseDTO<ICampaign>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let filteredCampaigns = Array.from(this.#campaigns.values())

    if (queryParams?.search && queryParams?.name) {
      filteredCampaigns = filteredCampaigns.filter((campaign) =>
        campaign.name
          .toLocaleLowerCase()
          .includes(queryParams.name!.toLocaleLowerCase())
      )
    }

    const users = await this.#inMemoryUserRoute.list({})
    const usersMap = new Map(users.map((user) => [user.id, user]))

    filteredCampaigns = filteredCampaigns.filter((campaign) => {
      const isMatchingId =
        !queryParams?.campaignId || campaign.id === queryParams.campaignId
      const isMatchingOwner =
        !queryParams?.ownerId || campaign.owner.id === queryParams.ownerId
      const isMatchingStatus =
        !queryParams?.status || campaign.status === queryParams.status
      const isMatchingTableId =
        !queryParams?.tableId || campaign.tableId === queryParams.tableId
      return (
        isMatchingId && isMatchingOwner && isMatchingStatus && isMatchingTableId
      )
    })

    const updatedCampaigns = filteredCampaigns.map((campaign) => {
      const updatedOwner = usersMap.get(campaign.owner.id) ?? campaign.owner
      return { ...campaign, owner: updatedOwner }
    })

    const totalItems = updatedCampaigns.length
    const pageSize = queryParams?.pageSize || 10
    const totalPages = Math.ceil(totalItems / pageSize)
    const currentPage = queryParams?.currentPage || 1

    const startIndex = (currentPage - 1) * pageSize
    const pagedItems = updatedCampaigns
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(startIndex, startIndex + pageSize)

    return {
      items: pagedItems,
      totalItems,
      totalPages,
      currentPage,
      pageSize,
    }
  }
}

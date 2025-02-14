import { campaigns } from "@/shared/contexts/Campaigns/mock-data"

export class MockCampaignRoute implements ICampaignRoute {
  #campaigns: Array<ICampaign>

  constructor() {
    this.#campaigns = campaigns
  }

  public async create(campaign: CampaignCreate): Promise<ICampaign> {
    const newCampaign = {
      ...campaign,
      id: crypto.randomUUID(),
      duration: "0",
      coverUrl: campaign.coverUrl ?? '',
      status: "inactive" as "inactive",
      players: [],
      tableId: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    return newCampaign
  }
}

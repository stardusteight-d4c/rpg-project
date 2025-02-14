import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"

export class MockAPI {
  campaign: ICampaignRoute

  constructor() {
    this.campaign = new MockCampaignRoute()
  }
}

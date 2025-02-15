import { MockAuthRoute } from "./routes/auth/MockAuthRoute"
import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"

export class MockAPI {
  auth: IAuthRoute
  campaign: ICampaignRoute

  constructor() {
    this.auth = new MockAuthRoute()
    this.campaign = new MockCampaignRoute()
  }
}

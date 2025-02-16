import { MockAuthRoute } from "./routes/auth/MockAuthRoute"
import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"
import { MockUserRoute } from "./routes/user/MockUserRoute"

export class MockAPI {
  auth: IAuthRoute
  campaign: ICampaignRoute
  user: IUserRoute

  constructor() {
    this.auth = MockAuthRoute.getInstance()
    this.campaign = MockCampaignRoute.getInstance()
    this.user = MockUserRoute.getInstance()
  }
}

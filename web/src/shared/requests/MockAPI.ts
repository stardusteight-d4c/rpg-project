import { MockAuthRoute } from "./routes/auth/MockAuthRoute"
import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"
import { MockSheetRoute } from "./routes/sheet/MockSheetRoute"
import { MockUserRoute } from "./routes/user/MockUserRoute"

export class MockAPI {
  auth: IAuthRoute
  user: IUserRoute
  sheet: ISheetRoute
  campaign: ICampaignRoute

  constructor() {
    this.auth = MockAuthRoute.getInstance()
    this.user = MockUserRoute.getInstance()
    this.sheet = MockSheetRoute.getInstance()
    this.campaign = MockCampaignRoute.getInstance()
  }
}

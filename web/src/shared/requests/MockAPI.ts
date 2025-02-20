import { MockAuthRoute } from "./routes/auth/MockAuthRoute"
import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"
import { MockPostRoute } from "./routes/post/MockPostRoute"
import { MockSheetRoute } from "./routes/sheet/MockSheetRoute"
import { MockUserRoute } from "./routes/user/MockUserRoute"

export class MockAPI {
  auth: IAuthRoute
  user: IUserRoute
  sheet: ISheetRoute
  campaign: ICampaignRoute
  post: IPostRoute

  constructor() {
    this.auth = MockAuthRoute.getInstance()
    this.user = MockUserRoute.getInstance()
    this.sheet = MockSheetRoute.getInstance()
    this.campaign = MockCampaignRoute.getInstance()
    this.post = MockPostRoute.getInstance()
  }
}

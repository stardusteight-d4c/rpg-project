import { MockAuthRoute } from "./routes/auth/MockAuthRoute"
import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"
import { MockPostRoute } from "./routes/post/MockPostRoute"
import { MockSheetRoute } from "./routes/sheet/MockSheetRoute"
import { MockUserRoute } from "./routes/user/MockUserRoute"

export class MockAPI {
  #auth: IAuthRoute | undefined
  #user: IUserRoute | undefined
  #sheet: ISheetRoute | undefined
  #campaign: ICampaignRoute | undefined
  #post: IPostRoute | undefined

  constructor() {}

  public initializeRoutes(): {
    auth: IAuthRoute
    user: IUserRoute
    sheet: ISheetRoute
    campaign: ICampaignRoute
    post: IPostRoute
  } {
    if (!this.#auth) {
      this.#auth = MockAuthRoute.getInstance()
    }
    if (!this.#user) {
      this.#user = MockUserRoute.getInstance()
    }
    if (!this.#user) {
      this.#user = MockUserRoute.getInstance()
    }
    if (!this.#sheet) {
      this.#sheet = MockSheetRoute.getInstance()
    }
    if (!this.#campaign) {
      this.#campaign = MockCampaignRoute.getInstance()
    }
    if (!this.#post) {
      this.#post = MockPostRoute.getInstance()
    }

    MockCampaignRoute.initialize(this.#post)
    MockPostRoute.initialize(this.#campaign)

    return {
      auth: this.#auth!,
      user: this.#user!,
      sheet: this.#sheet!,
      campaign: this.#campaign!,
      post: this.#post!,
    }
  }
}

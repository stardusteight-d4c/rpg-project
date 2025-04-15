import { MockAuthRoute } from "./routes/auth/MockAuthRoute"
import { MockCampaignRoute } from "./routes/campaign/MockCampaignRoute"
import { MockMapRoute } from "./routes/map/MockMapRoute"
import { MockPostRoute } from "./routes/post/MockPostRoute"
import { MockSheetRoute } from "./routes/sheet/MockSheetRoute"
import { MockUserRoute } from "./routes/user/MockUserRoute"

export class MockAPI {
  #auth: IAuthRoute | undefined
  #user: IUserRoute | undefined
  #sheet: ISheetRoute | undefined
  #map: IMapRoute | undefined
  #campaign: ICampaignRoute | undefined
  #post: IPostRoute | undefined

  constructor() {}

  public initializeRoutes(): {
    auth: IAuthRoute
    user: IUserRoute
    sheet: ISheetRoute
    map: IMapRoute
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
    if (!this.#map) {
      this.#map = MockMapRoute.getInstance()
    }
    if (!this.#campaign) {
      this.#campaign = MockCampaignRoute.getInstance()
    }
    if (!this.#post) {
      this.#post = MockPostRoute.getInstance()
    }

    MockCampaignRoute.initialize({
      post: this.#post,
      user: this.#user,
      sheet: this.#sheet,
    })
    MockPostRoute.initialize({ campaign: this.#campaign, user: this.#user })
    MockSheetRoute.initialize({ campaign: this.#campaign, user: this.#user })

    return {
      auth: this.#auth!,
      user: this.#user!,
      sheet: this.#sheet!,
      map: this.#map!,
      campaign: this.#campaign!,
      post: this.#post!,
    }
  }
}

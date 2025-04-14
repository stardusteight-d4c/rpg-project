type CampaignStatus = "active" | "recent_active" | "inactive"
// active -> Agora | recent_active -> 24h | inactive > 24h

interface SheetPosition {
  sheetId: string
  mapId: string
  characterUrl: string
  ownerId: string
  isOwner: boolean
  position: {
    x: number
    y: number
  }
}

interface IMap {
  id: string
  campaignId: string
  type: "exploration" | "scenario"
  name: string
  imageUrl: string
  active: boolean
  visibility?: "low" | "default"
  gridSize?: Array<number>
  positions?: SheetPosition[]
}

interface IRoll {
  id: string
  character: ISheet
  campaignId: string
  characterRoll?: {
    name: string
    value: number
    halfValue: number
    fifthValue: number
    rolled: number
  }
  systemRoll?: {
    diceQuantity: number
    diceType: number
    rolled: Array<number>
    total: number
  }
  createdAt: string
}

interface ICampaign {
  id: string
  tableId: string
  key?: number | undefined
  name: string
  description: string
  coverUrl: string | undefined
  duration: string
  status: CampaignStatus
  players: IUser[]
  streaming?: { watchers: IUser[]; startedAt: string }
  rolls: IRoll[]
  maps: IMap[]
  owner: IUser
  activeSheets?: ISheet[]
  createdAt: string
}

interface CampaignCreate {
  name: string
  description: string
  coverUrl?: string
  owner: IUser
}

interface CampaignQueryParams extends ListQueryParams {
  search?: boolean
  name?: string
  campaignId?: string
  ownerId?: string
  tableId?: string
  status?: CampaignStatus
}

interface RollsQueryParams extends ListQueryParams {
  campaignId?: string
}

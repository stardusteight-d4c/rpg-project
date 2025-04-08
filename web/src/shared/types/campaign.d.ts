type CampaignStatus = "active" | "recent_active" | "inactive"
// active -> Agora | recent_active -> 24h | inactive > 24h

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
  name: string
  description: string
  coverUrl: string | undefined
  duration: string
  status: CampaignStatus
  players: IUser[]
  streaming?: { watchers: IUser[]; startedAt: string }
  rolls: IRoll[]
  owner: IUser
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


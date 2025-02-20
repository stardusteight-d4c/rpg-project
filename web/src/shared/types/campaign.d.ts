type CampaignStatus = "active" | "recent_active" | "inactive"
// active -> Agora | recent_active -> 24h | inactive > 24h

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
  owner: IUser
  createdAt: string
}

interface CampaignCreate {
  name: string
  description: string
  coverUrl?: string
  owner: IUser
}

interface ListCampaignsDTO {
  campaignId?: string 
  ownerId?: string
  status?: CampaignStatus
}

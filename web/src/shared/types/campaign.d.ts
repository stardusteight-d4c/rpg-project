type CampaignStatus = "active" | "recent_active" | "inactive"
// active -> Agora | recent_active -> 24h | inactive > 24h

interface ICampaign {
  id: string
  tableId: string
  name: string
  description: string
  coverUrl: string
  duration: string
  status: CampaignStatus
  players: IUser[]
  streaming?: { watchers: IUser[]; startedAt: string }
  createdBy: IUser
  createdAt: string
}

interface CampaignCreate {
  name: string
  description: string
  coverUrl?: string
  createdBy: IUser
}

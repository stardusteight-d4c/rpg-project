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

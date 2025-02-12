interface IMap {
  id: string
  type: "map" | "scenario"
  name: string
  imageUrl: string
  gridSize?: Array<number>
  visibility?: "low" | "default"
  active: boolean
}

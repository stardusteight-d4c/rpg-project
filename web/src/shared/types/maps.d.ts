interface IMap {
  id: string
  type: "exploration" | "scenario"
  name: string
  imageUrl: string
  gridSize?: Array<number>
  visibility?: "low" | "default"
  active: boolean
}

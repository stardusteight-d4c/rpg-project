interface IMap {
  id: string
  type: "map" | "scenario"
  name: string
  image_url: string
  grid_size?: Array<number>
  visibility?: "low" | "default"
  active: boolean
}

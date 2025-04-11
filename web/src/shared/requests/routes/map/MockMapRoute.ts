export class MockMapRoute implements IMapRoute {
  static #instance: MockMapRoute | null = null
  #maps: Map<string, IMap>

  private constructor() {
    this.#maps = new Map()
  }

  public static getInstance(): MockMapRoute {
    if (!this.#instance) {
      this.#instance = new MockMapRoute()
    }
    return this.#instance
  }

  public async create(map: IMap): Promise<IMap> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    this.#maps.set(map.id, map)
    return map
  }

  public async update(updatedMap: Partial<IMap>): Promise<IMap> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const existingMap = this.#maps.get(updatedMap.id!)
    if (!existingMap) throw new Error("Map not found.")
    const updateMap = { ...existingMap, ...updatedMap }
    this.#maps.set(existingMap.id, updateMap)
    return updateMap
  }

  public async delete(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    this.#maps.delete(id)
  }

  public async moveSheet(newSheetPosition: SheetPosition): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const existingMap = this.#maps.get(newSheetPosition.mapId)
    if (!existingMap) throw new Error("Map not found.")
    const positions = existingMap.positions ?? []
    const updatedPositions = positions.filter(
      (position) => position.sheetId !== newSheetPosition.sheetId
    )
    this.#maps.set(existingMap.id, {
      ...existingMap,
      positions: [newSheetPosition, ...updatedPositions],
    })
  }
}

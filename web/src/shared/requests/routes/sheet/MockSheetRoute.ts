export class MockSheetRoute implements ISheetRoute {
  static #instance: MockSheetRoute | null = null
  #sheets: Map<string, ISheet>

  private constructor() {
    this.#sheets = new Map()
  }

  public static getInstance(): MockSheetRoute {
    if (!this.#instance) {
      this.#instance = new MockSheetRoute()
    }
    return this.#instance
  }

  public async create(sheet: ISheet): Promise<ISheet> {
    const newSheet: ISheet = {
      ...sheet,
      tableId: sheet.tableId ?? undefined,
      id: crypto.randomUUID(),
    }
    this.#sheets.set(newSheet.id, newSheet)
    return newSheet
  }

  public async update(sheet: Partial<ISheet>): Promise<ISheet> {
    if (!sheet.id || !this.#sheets.has(sheet.id)) {
      throw new Error("Sheet not found.")
    }

    const existingSheet = this.#sheets.get(sheet.id)!
    const updatedSheet = { ...existingSheet, ...sheet }
    this.#sheets.set(sheet.id, updatedSheet)

    return updatedSheet
  }

  public async delete(sheetId: string): Promise<void> {
    this.#sheets.delete(sheetId)
  }

  public async list(queryParams?: ListSheetsDTO): Promise<Array<ISheet>> {
    const sheetsArray = [...this.#sheets.values()]
    if (!queryParams) return sheetsArray

    return sheetsArray.filter((sheet) => {
      const isMatchingId =
        !queryParams.sheetId || sheet.id === queryParams.sheetId
      const isMatchingOwner =
        !queryParams.ownerId || sheet.owner.id === queryParams.ownerId
      return isMatchingId && isMatchingOwner
    })
  }
}

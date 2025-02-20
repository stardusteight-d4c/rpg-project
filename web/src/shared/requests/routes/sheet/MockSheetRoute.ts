export class MockSheetRoute implements ISheetRoute {
  static #instance: MockSheetRoute | null = null
  #sheets: Array<ISheet>

  private constructor() {
    this.#sheets = []
  }

  public static getInstance(): MockSheetRoute {
    if (!this.#instance) {
      this.#instance = new MockSheetRoute()
    }
    return this.#instance
  }

  public async add(sheet: ISheet): Promise<ISheet> {
    const newSheet: ISheet = {
      ...sheet,
      tableId: sheet.tableId ?? undefined,
      id: crypto.randomUUID(),
    }
    this.#sheets.push(newSheet)
    return newSheet
  }

  public async update(sheet: Partial<ISheet>): Promise<ISheet> {
    const existingSheetIndex = this.#sheets.findIndex((s) => s.id === sheet.id)

    if (existingSheetIndex === -1) {
      throw new Error("Sheet not found.")
    }

    const existingSheet = this.#sheets[existingSheetIndex]
    const updatedSheet = { ...existingSheet, ...sheet }
    this.#sheets[existingSheetIndex] = updatedSheet

    return updatedSheet
  }

  public async delete(sheetId: string): Promise<void> {
    const newArray = this.#sheets.filter((sheet) => sheet.id !== sheetId)
    this.#sheets = newArray
  }

  public async getUserSheets(userId: string): Promise<ISheet[]> {
    const userSheets = this.#sheets.filter((sheet) => sheet.user.id === userId)

    return userSheets
  }
}

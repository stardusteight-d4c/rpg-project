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

  public async getUserSheets(userId: string): Promise<ISheet[]> {
    console.log("userId", userId)
    console.log("this.#sheets", this.#sheets)

    const userSheets = this.#sheets.filter(
      (sheet) => sheet.user.id === userId
    )

    return userSheets
  }
}

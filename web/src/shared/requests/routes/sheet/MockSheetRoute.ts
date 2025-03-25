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
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const newSheet: ISheet = {
      ...sheet,
      tableId: sheet.tableId ?? undefined,
      id: crypto.randomUUID(),
    }
    this.#sheets.set(newSheet.id, newSheet)
    return newSheet
  }

  public async update(sheet: Partial<ISheet>): Promise<ISheet> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    if (!sheet.id || !this.#sheets.has(sheet.id)) {
      throw new Error("Sheet not found.")
    }

    const existingSheet = this.#sheets.get(sheet.id)!
    const updatedSheet = { ...existingSheet, ...sheet }
    this.#sheets.set(sheet.id, updatedSheet)

    return updatedSheet
  }

  public async delete(sheetId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    this.#sheets.delete(sheetId)
  }

  public async list(
    queryParams: SheetQueryParams
  ): Promise<ListResponseDTO<ISheet>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let filteredSheets = Array.from(this.#sheets.values())

    if (queryParams?.sheetId) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.id === queryParams.sheetId
      )
    }

    if (queryParams?.ownerId) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.owner.id === queryParams.ownerId
      )
    }

    filteredSheets.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const totalItems = filteredSheets.length

    const page = queryParams?.currentPage ?? 1

    const pageSize = queryParams?.pageSize ?? 10

    const totalPages = Math.ceil(totalItems / pageSize)

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    const paginatedSheets = filteredSheets.slice(startIndex, endIndex)

    return {
      items: paginatedSheets,
      totalItems,
      totalPages,
      currentPage: page,
      pageSize,
    }
  }
}

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
      active: false,
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

  public async toggleActive(
    sheetId: string,
    tableId: string
  ): Promise<ISheet[]> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const sheet = this.#sheets.get(sheetId)
    if (!sheet) throw new Error("Sheet not found.")

    const existingSheet = Array.from(this.#sheets.values()).find(
      (s) => s.tableId === tableId && s.owner.id === sheet.owner.id
    )

    const updatedSheets = []

    if (existingSheet) {
      const updatedExistingSheet = {
        ...existingSheet,
        active: false,
      }
      this.#sheets.set(existingSheet.id, updatedExistingSheet)
      updatedSheets.push(updatedExistingSheet)
    }

    const newActiveSheet = {
      ...sheet,
      active: true,
    }

    this.#sheets.set(sheet.id, newActiveSheet)
    updatedSheets.push(newActiveSheet)

    return updatedSheets
  }

  public async addToTable(sheetId: string, tableId: string): Promise<ISheet> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const sheet = this.#sheets.get(sheetId)
    if (!sheet) throw new Error("Sheet not found.")

    const updatedSheet = { ...sheet, tableId }
    this.#sheets.set(sheetId, updatedSheet)
    return updatedSheet
  }

  public async removeFromTable(
    sheetId: string,
    tableId: string
  ): Promise<ISheet> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const sheet = this.#sheets.get(sheetId)
    if (!sheet) throw new Error("Sheet not found.")

    if (sheet.tableId !== tableId) {
      throw new Error("Sheet is not associated with the specified table.")
    }

    const updatedSheet = { ...sheet, tableId: undefined }
    this.#sheets.set(sheetId, updatedSheet)
    return updatedSheet
  }

  public async list(
    queryParams: SheetQueryParams
  ): Promise<ListResponseDTO<ISheet>> {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    let filteredSheets = Array.from(this.#sheets.values())

    if (queryParams.sheetId) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.id === queryParams.sheetId
      )
    }

    if (queryParams.ownerId) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.owner.id === queryParams.ownerId
      )
    }

    if (queryParams.tableId) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.tableId === queryParams.tableId
      )
    }

    if (queryParams.tableId !== undefined) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.tableId === queryParams.tableId
      )
    }

    if (queryParams.active !== undefined) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.active === queryParams.active
      )
    }

    if (queryParams.visibility !== undefined) {
      filteredSheets = filteredSheets.filter(
        (sheet) => sheet.infos.visibility === queryParams.visibility
      )
    }

    filteredSheets.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const totalItems = filteredSheets.length
    const page = queryParams.currentPage ?? 1
    const pageSize = queryParams.pageSize ?? 10
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

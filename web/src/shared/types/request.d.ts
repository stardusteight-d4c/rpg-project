interface ListResponseDTO<T> {
  items: Array<T>
  totalItems: number
  totalPages: number
  currentPage?: number
  pageSize?: number
}

interface ListQueryParams {
  currentPage?: number
  pageSize?: number
}

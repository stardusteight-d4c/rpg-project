export function sortArrayOfMapObjectByCreatedAt<
  T extends { createdAt: string }
>(items: [string, T][]) {
  return items.sort(
    (a, b) =>
      new Date(b[1].createdAt).getTime() - new Date(a[1].createdAt).getTime()
  )
}

export function sortArrayByCreatedAt<T extends { createdAt: string }>(
  items: T[]
) {
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

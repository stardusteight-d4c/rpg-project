type PartialMapWithID<T> = T extends { id: infer U }
  ? { id: U } & Partial<Omit<T, "id">>
  : never

interface IRoll {
  id: string
  character: ISheet
  characterRoll?: {
    name: string
    value: number
    halfValue: number
    fifthValue: number
    rolled: number
  }
  systemRoll?: {
    diceQuantity: number
    diceType: number
    rolled: Array<number>
    total: number
  }
  createdAt: string
}

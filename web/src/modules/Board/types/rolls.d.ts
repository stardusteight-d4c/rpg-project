interface IRoll {
  id: string
  character: ICharacter
  character_roll?: {
    name: string
    value: number
    half_value: number
    fifth_value: number
    rolled: number
  }
  system_roll?: {
    dice_quantity: number
    dice_type: number
    rolled: Array<number>
    total: number
  }
  createdAt: string
}

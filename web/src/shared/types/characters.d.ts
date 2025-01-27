type Gender = "male" | "female" | "neuter"
type CharacterType = "player" | "npc" | "enemy"

type Infos = {
  id: string
  type: CharacterType
  name: string
  sex: Gender
  characterUrl: string
  occupation: string
  hitPoints: number
  magicPoints: number
  sanity: number
  inspiration: boolean
}

type Attributes = {
  strength: number
  dexterity: number
  intelligence: number
  power: number
  constitution: number
  appearance: number
  size: number
  education: number
  luck: number
}

type Weapon = {
  id?: string
  name: string
  iconUrl: string
  skill: "Fighting(Brawl)"
  damage: string
  attacks: "1" | "1(2)" | "1(3)" | "1(4)" | "1(5)"
  ammo?: string | number
  range: string
  malfunction?: string | number
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}

type Gun = {
  id?: string
  name: string
  iconUrl: string
  skill: "Firearms(HG)" | "Firearms(R/S)" | "Firearms(HW)"
  damage: string
  attacks: string
  ammo?: string | number
  range: string
  malfunction?: string | number
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}

type Explosive = {
  id?: string
  name: string
  iconUrl: string
  skill: "Throwing" | "Demolitions"
  damage: string
  attacks: string
  ammo?: string | number
  range: string
  malfunction?: string | number | null
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}

type CombatItem = Weapon | Gun | Explosive

type InventoryItem = {
  id: string
  name: string
  for?: { id: string; name: string }[]
  visibility?: { id: string; name: string }[]
  content?: {
    type: { name: string; inputs: number }
    inputs: string[]
  }
  upload?: string
}

type Skill = {
  id: string
  name: string
  baseValue: number | "half DEX" | "EDU"
  currentValue: number
  checked: boolean
}

interface ICharacter {
  user: IMatchUser
  infos: Infos
  attributes: Attributes
  combat: CombatItem[]
  inventory: InventoryItem[]
  backstory: string
  skills: Skill[]
}

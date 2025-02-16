type Gender = "male" | "female" | "neuter"
type CharacterType = "player" | "npc" | "enemy"

type Infos = {
  type: CharacterType
  name: string
  sex: Gender
  visibility?: boolean
  characterUrl: string
  occupation: string
  hitPoints: number
  maxHitPoints: number
  magicPoints: number
  maxMagicPoints: number
  sanity: number
  maxSanity: number
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
  name: string
  baseValue: number | "half DEX" | "EDU"
  currentValue: number
  checked: boolean
}


interface ICharacter {
  id: string
  user: TableUser
  infos: Infos
  attributes: Attributes
  combat: CombatItem[]
  inventory: InventoryItem[]
  backstory: string
  skills: Skill[]
}

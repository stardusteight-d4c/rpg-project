interface IWeapon {
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

interface IGun {
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

interface IExplosive {
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

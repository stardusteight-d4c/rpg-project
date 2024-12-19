interface IWeapon {
  name: string
  iconUrl: string
  skill: "Fighting(Brawl)"
  damage: string
  attacks: "1" | "1(2)" | "1(3)" | "1(4)" | "1(5)"
  ammo?: number
  range: string
  malfunction?: number
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}

interface IGun {
  name: string
  iconUrl: string
  skill: "Firearms(HG)" | "Firearms(R/S)" | "Firearms(HW)"
  damage: string
  attacks: string
  ammo?: number
  range: string
  malfunction?: number
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}

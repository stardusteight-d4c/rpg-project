interface IWeapons {
  name: string
  iconUrl: string
  skill: "Fighting(Brawl)" | "Firearms(HG)" | "Firearms(R/S)"
  damage: string
  attacks: "1" | "1(2)" | "1(3)" | "1(4)" | "1(5)"
  ammo?: number
  range: string
  malfunction?: number
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}

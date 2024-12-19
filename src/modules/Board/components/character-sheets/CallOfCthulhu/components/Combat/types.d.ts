interface IWeapons {
  name: string
  iconUrl: string
  skill: "Fighting(Brawl)" | "Firearms(HG)" | "Firearms(R/S)"
  damage?: "4" | "6" | "8" | "10" | "12" | "20" | "100"
  attacks?: "1" | "2" | "3" | "4" | "5" | "1(2)" | "1(3)" | "1(4)" | "1(5)"
  ammo?: number
  range: string
  malfunction?: number
  quality?: "Excellent" | "Good" | "Bad" | "Broken"
  description: string
  properties: Array<string>
}
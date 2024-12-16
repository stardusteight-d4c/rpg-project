"use client"
import React, { useState } from "react"
import {
  Attributes,
  Backstory,
  Combat,
  Inventory,
  Notes,
  ProfileInfo,
  Skills,
} from "./components"

export const CallOfCthulhu = () => {
  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])
  // Atributos típicos de Call of Cthulhu
  const attributes = {
    strength: 50,
    dexterity: 60,
    intelligence: 70,
    power: 65,
    constitution: 55,
    appearance: 60,
    size: 50,
    education: 70,
  }

  const infos = {
    name: "Erwin Farwell",
    player: "Gabriel Sena",
    sex: "male" as "male",
    characterUrl:
      "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
    occupation: "Journalist and Private Detective",
    hitPoints: 75,
    magicPoints: 42,
    sanity: 22,
  }

  const actions = {
    activeItems,
    toggleItem,
  }

  // Habilidades comuns
  const skills = [
    { name: "Accounting", baseValue: 5, currentValue: 50},
    { name: "Anthropology", baseValue: 1, currentValue: 50},
    { name: "Appraise", baseValue: 5, currentValue: 50},
    { name: "Archaeology", baseValue: 1, currentValue: 50},
    { name: "Charm", baseValue: 15, currentValue: 50},
    { name: "Climb", baseValue: 20, currentValue: 50},
    { name: "Credit Rating", baseValue: 0, currentValue: 50},
    { name: "Cthulhu Mythos", baseValue: 0, currentValue: 50},
    { name: "Disguise", baseValue: 5, currentValue: 50},
    { name: "Dodge", baseValue: "half DEX",  currentValue: 50},
    { name: "Drive Auto", baseValue: 20, currentValue: 50},
    { name: "Elec Repair", baseValue: 10, currentValue: 50},
    { name: "Fast Talk", baseValue: 5, currentValue: 50},
    { name: "Fighting(Brawl)", baseValue: 25, currentValue: 50},
    { name: "Firearms(HG)", baseValue: 20, currentValue: 50},
    { name: "Firearms(R/S)", baseValue: 25, currentValue: 50},
    { name: "First Aid", baseValue: 30, currentValue: 50},
    { name: "History", baseValue: 5, currentValue: 50},
    { name: "Intimidate", baseValue: 15, currentValue: 50},
    { name: "Jump", baseValue: 20, currentValue: 50},
    { name: "Language(Own)", baseValue: "EDU", currentValue: 50},
    { name: "Law", baseValue: 5, currentValue: 50},
    { name: "Library Use", baseValue: 20, currentValue: 50},
    { name: "Listen", baseValue: 20, currentValue: 50},
    { name: "Locksmith", baseValue: 1, currentValue: 50},
    { name: "Luck", baseValue: 65, currentValue: 50},
    { name: "Mech Repair", baseValue: 10, currentValue: 50},
    { name: "Medicine", baseValue: 1, currentValue: 50},
    { name: "Natural World", baseValue: 10, currentValue: 50},
    { name: "Navigate", baseValue: 10, currentValue: 50},
    { name: "Occult", baseValue: 5, currentValue: 50},
    { name: "Op Hv Machine", baseValue: 1, currentValue: 50},
    { name: "Persuade", baseValue: 10, currentValue: 50},
    { name: "Psychoanalysis", baseValue: 1, currentValue: 50},
    { name: "Psychology", baseValue: 10, currentValue: 50},
    { name: "Ride", baseValue: 5, currentValue: 50},
    { name: "Sleight of Hand", baseValue: 10, currentValue: 50},
    { name: "Spot Hidden", baseValue: 25, currentValue: 50},
    { name: "Stealth", baseValue: 20, currentValue: 50},
    { name: "Swim", baseValue: 20, currentValue: 50},
    { name: "Throw", baseValue: 20, currentValue: 50},
    { name: "Track", baseValue: 10, currentValue: 50},
  ]

  function toggleItem(
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        // Remove o item se ele já estiver no array
        return prev.filter((i) => i !== item)
      } else {
        // Adiciona o item se ele não estiver no array
        return [...prev, item]
      }
    })
  }

  return (
    <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
      <ProfileInfo {...infos} />
      <Attributes attributes={attributes} {...actions} />
      <Skills skills={skills} {...actions} />
      <Combat {...actions} />
      <Inventory {...actions} />
      <Backstory {...actions} />
      <Notes />
    </section>
  )
}

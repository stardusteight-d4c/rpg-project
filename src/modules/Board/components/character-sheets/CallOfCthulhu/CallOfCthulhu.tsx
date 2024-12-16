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
    { name: "Accounting", value: 5 },
    { name: "Anthropology", value: 1 },
    { name: "Appraise", value: 5 },
    { name: "Archaeology", value: 1 },
    { name: "Charm", value: 15 },
    { name: "Climb", value: 20 },
    { name: "Credit Rating", value: 0 },
    { name: "Cthulhu Mythos", value: 0 },
    { name: "Disguise", value: 5 },
    { name: "Dodge", value: "half DEX" },
    { name: "Drive Auto", value: 20 },
    { name: "Elec Repair", value: 10 },
    { name: "Fast Talk", value: 5 },
    { name: "Fighting(Brawl)", value: 25 },
    { name: "Firearms(HG)", value: 20 },
    { name: "Firearms(R/S)", value: 25 },
    { name: "First Aid", value: 30 },
    { name: "History", value: 5 },
    { name: "Intimidate", value: 15 },
    { name: "Jump", value: 20 },
    { name: "Language(Own)", value: "EDU" },
    { name: "Law", value: 5 },
    { name: "Library Use", value: 20 },
    { name: "Listen", value: 20 },
    { name: "Locksmith", value: 1 },
    { name: "Luck", value: 65 },
    { name: "Mech Repair", value: 10 },
    { name: "Medicine", value: 1 },
    { name: "Natural World", value: 10 },
    { name: "Navigate", value: 10 },
    { name: "Occult", value: 5 },
    { name: "Op Hv Machine", value: 1 },
    { name: "Persuade", value: 10 },
    { name: "Psychoanalysis", value: 1 },
    { name: "Psychology", value: 10 },
    { name: "Ride", value: 5 },
    { name: "Sleight of Hand", value: 10 },
    { name: "Spot Hidden", value: 25 },
    { name: "Stealth", value: 20 },
    { name: "Swim", value: 20 },
    { name: "Throw", value: 20 },
    { name: "Track", value: 10 },
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

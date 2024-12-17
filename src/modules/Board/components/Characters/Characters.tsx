"use client"

import { Dispatch, SetStateAction, useState } from "react"
import {
  Attributes,
  Backstory,
  Combat,
  Inventory,
  ProfileInfo,
  Skills,
} from "../character-sheets/CallOfCthulhu/components"

export const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<{
    player: any
    infos: any
    attributes: any
    skills: any
  } | null>(null)

  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])
  const [editMode, setEditMode] = useState<boolean>(false)

  const currentSession = {
    id: "alsmdlsamdslamds",
    name: "Gabriel Sena",
    username: "#stardusteight",
    avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
  }

  const actions = {
    activeItems,
    toggleItem,
  }

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

  const playerCharacter = {
    player: {
      id: "alsmdlsamdslamds",
      name: "Gabriel Sena",
      username: "#stardusteight",
      avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
    },
    infos: {
      id: "asdsaas",
      name: "Erwin Farwell",
      sex: "male" as "male",
      characterUrl:
        "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
      occupation: "Journalist and Private Detective",
      hitPoints: 75,
      magicPoints: 42,
      sanity: 22,
    },
    attributes: {
      strength: 50,
      dexterity: 60,
      intelligence: 70,
      power: 65,
      constitution: 55,
      appearance: 60,
      size: 50,
      education: 70,
    },
    skills: [
      { name: "Accounting", baseValue: 5, currentValue: 50 },
      { name: "Anthropology", baseValue: 1, currentValue: 50 },
      { name: "Appraise", baseValue: 5, currentValue: 50 },
      { name: "Archaeology", baseValue: 1, currentValue: 50 },
      { name: "Charm", baseValue: 15, currentValue: 50 },
      { name: "Climb", baseValue: 20, currentValue: 50 },
      { name: "Credit Rating", baseValue: 0, currentValue: 50 },
      { name: "Cthulhu Mythos", baseValue: 0, currentValue: 50 },
      { name: "Disguise", baseValue: 5, currentValue: 50 },
      { name: "Dodge", baseValue: "half DEX", currentValue: 50 },
      { name: "Drive Auto", baseValue: 20, currentValue: 50 },
      { name: "Elec Repair", baseValue: 10, currentValue: 50 },
      { name: "Fast Talk", baseValue: 5, currentValue: 50 },
      { name: "Fighting(Brawl)", baseValue: 25, currentValue: 50 },
      { name: "Firearms(HG)", baseValue: 20, currentValue: 50 },
      { name: "Firearms(R/S)", baseValue: 25, currentValue: 50 },
      { name: "First Aid", baseValue: 30, currentValue: 50 },
      { name: "History", baseValue: 5, currentValue: 50 },
      { name: "Intimidate", baseValue: 15, currentValue: 50 },
      { name: "Jump", baseValue: 20, currentValue: 50 },
      { name: "Language(Own)", baseValue: "EDU", currentValue: 50 },
      { name: "Law", baseValue: 5, currentValue: 50 },
      { name: "Library Use", baseValue: 20, currentValue: 50 },
      { name: "Listen", baseValue: 20, currentValue: 50 },
      { name: "Locksmith", baseValue: 1, currentValue: 50 },
      { name: "Luck", baseValue: 65, currentValue: 50 },
      { name: "Mech Repair", baseValue: 10, currentValue: 50 },
      { name: "Medicine", baseValue: 1, currentValue: 50 },
      { name: "Natural World", baseValue: 10, currentValue: 50 },
      { name: "Navigate", baseValue: 10, currentValue: 50 },
      { name: "Occult", baseValue: 5, currentValue: 50 },
      { name: "Op Hv Machine", baseValue: 1, currentValue: 50 },
      { name: "Persuade", baseValue: 10, currentValue: 50 },
      { name: "Psychoanalysis", baseValue: 1, currentValue: 50 },
      { name: "Psychology", baseValue: 10, currentValue: 50 },
      { name: "Ride", baseValue: 5, currentValue: 50 },
      { name: "Sleight of Hand", baseValue: 10, currentValue: 50 },
      { name: "Spot Hidden", baseValue: 25, currentValue: 50 },
      { name: "Stealth", baseValue: 20, currentValue: 50 },
      { name: "Swim", baseValue: 20, currentValue: 50 },
      { name: "Throw", baseValue: 20, currentValue: 50 },
      { name: "Track", baseValue: 10, currentValue: 50 },
    ],
  }

  const characters = [
    {
      player: {
        id: "alsmdlsamdslamds",
        name: "Gabriel Sena",
        username: "#stardusteight",
        avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
      },
      infos: {
        id: "asdsaas",
        name: "Erwin Farwell",
        sex: "male" as "male",
        characterUrl:
          "https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg",
        occupation: "Journalist and Private Detective",
        hitPoints: 75,
        magicPoints: 42,
        sanity: 22,
      },
      attributes: {
        strength: 50,
        dexterity: 60,
        intelligence: 70,
        power: 65,
        constitution: 55,
        appearance: 60,
        size: 50,
        education: 70,
      },
      skills: [
        { name: "Accounting", baseValue: 5, currentValue: 50 },
        { name: "Anthropology", baseValue: 1, currentValue: 50 },
        { name: "Appraise", baseValue: 5, currentValue: 50 },
        { name: "Archaeology", baseValue: 1, currentValue: 50 },
        { name: "Charm", baseValue: 15, currentValue: 50 },
        { name: "Climb", baseValue: 20, currentValue: 50 },
        { name: "Credit Rating", baseValue: 0, currentValue: 50 },
        { name: "Cthulhu Mythos", baseValue: 0, currentValue: 50 },
        { name: "Disguise", baseValue: 5, currentValue: 50 },
        { name: "Dodge", baseValue: "half DEX", currentValue: 50 },
        { name: "Drive Auto", baseValue: 20, currentValue: 50 },
        { name: "Elec Repair", baseValue: 10, currentValue: 50 },
        { name: "Fast Talk", baseValue: 5, currentValue: 50 },
        { name: "Fighting(Brawl)", baseValue: 25, currentValue: 50 },
        { name: "Firearms(HG)", baseValue: 20, currentValue: 50 },
        { name: "Firearms(R/S)", baseValue: 25, currentValue: 50 },
        { name: "First Aid", baseValue: 30, currentValue: 50 },
        { name: "History", baseValue: 5, currentValue: 50 },
        { name: "Intimidate", baseValue: 15, currentValue: 50 },
        { name: "Jump", baseValue: 20, currentValue: 50 },
        { name: "Language(Own)", baseValue: "EDU", currentValue: 50 },
        { name: "Law", baseValue: 5, currentValue: 50 },
        { name: "Library Use", baseValue: 20, currentValue: 50 },
        { name: "Listen", baseValue: 20, currentValue: 50 },
        { name: "Locksmith", baseValue: 1, currentValue: 50 },
        { name: "Luck", baseValue: 65, currentValue: 50 },
        { name: "Mech Repair", baseValue: 10, currentValue: 50 },
        { name: "Medicine", baseValue: 1, currentValue: 50 },
        { name: "Natural World", baseValue: 10, currentValue: 50 },
        { name: "Navigate", baseValue: 10, currentValue: 50 },
        { name: "Occult", baseValue: 5, currentValue: 50 },
        { name: "Op Hv Machine", baseValue: 1, currentValue: 50 },
        { name: "Persuade", baseValue: 10, currentValue: 50 },
        { name: "Psychoanalysis", baseValue: 1, currentValue: 50 },
        { name: "Psychology", baseValue: 10, currentValue: 50 },
        { name: "Ride", baseValue: 5, currentValue: 50 },
        { name: "Sleight of Hand", baseValue: 10, currentValue: 50 },
        { name: "Spot Hidden", baseValue: 25, currentValue: 50 },
        { name: "Stealth", baseValue: 20, currentValue: 50 },
        { name: "Swim", baseValue: 20, currentValue: 50 },
        { name: "Throw", baseValue: 20, currentValue: 50 },
        { name: "Track", baseValue: 10, currentValue: 50 },
      ],
    },
    {
      player: {
        id: "asnshlkasjlalssla",
        name: "Juan Paul",
        username: "#paullz",
        avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
      },
      infos: {
        id: "asfafsafv",
        name: "Erik Bjorn ",
        sex: "male" as "male",
        characterUrl:
          "https://neural.love/cdn/thumbnails/1eed6701-3f10-66ae-a3ea-41b70a0743ac/eeb65884-de3b-5ffc-9982-79cfe16f394b.webp?Expires=1767225599&Signature=tnQgxe3HIRNHu4D532pE79A2nbqUhNwYrzKXOsl-ZX9uqsiDQY1orBDBv1pBmKVfHtCWwp9N31Q7wP4n2S~BKTJRHElZheN-DJU5Q3nHRIiXqvXdxKBYnD7ZH3Mcjl6n9RuxIy5YywbWqvTIs05HYX13SmDMOBx4sCaJvD4MBovknJ1OWL~1txwStM7fNnsyLKf8j857Kci1OLDKuDeJyRgKzQryixLSt-KB7lknK2tXGeAA~XW31yW9dbVhw0oeuXwhJAXYtezI9pcGaBHmm2sPtr3BMM7mJtkK-arna11zegqXaYVEeCsdRxQCwTHQUuApPYk0Kc6OHZ4eTnr42w__&Key-Pair-Id=K2RFTOXRBNSROX",
        occupation: "Journalist and Private Detective",
        hitPoints: 150,
        magicPoints: 0,
        sanity: 100,
      },
      attributes: {
        strength: 50,
        dexterity: 60,
        intelligence: 70,
        power: 65,
        constitution: 55,
        appearance: 60,
        size: 50,
        education: 70,
      },
      skills: [
        { name: "Accounting", baseValue: 5, currentValue: 50 },
        { name: "Anthropology", baseValue: 1, currentValue: 50 },
        { name: "Appraise", baseValue: 5, currentValue: 50 },
        { name: "Archaeology", baseValue: 1, currentValue: 50 },
        { name: "Charm", baseValue: 15, currentValue: 50 },
        { name: "Climb", baseValue: 20, currentValue: 50 },
        { name: "Credit Rating", baseValue: 0, currentValue: 50 },
        { name: "Cthulhu Mythos", baseValue: 0, currentValue: 50 },
        { name: "Disguise", baseValue: 5, currentValue: 50 },
        { name: "Dodge", baseValue: "half DEX", currentValue: 50 },
        { name: "Drive Auto", baseValue: 20, currentValue: 50 },
        { name: "Elec Repair", baseValue: 10, currentValue: 50 },
        { name: "Fast Talk", baseValue: 5, currentValue: 50 },
        { name: "Fighting(Brawl)", baseValue: 25, currentValue: 50 },
        { name: "Firearms(HG)", baseValue: 20, currentValue: 50 },
        { name: "Firearms(R/S)", baseValue: 25, currentValue: 50 },
        { name: "First Aid", baseValue: 30, currentValue: 50 },
        { name: "History", baseValue: 5, currentValue: 50 },
        { name: "Intimidate", baseValue: 15, currentValue: 50 },
        { name: "Jump", baseValue: 20, currentValue: 50 },
        { name: "Language(Own)", baseValue: "EDU", currentValue: 50 },
        { name: "Law", baseValue: 5, currentValue: 50 },
        { name: "Library Use", baseValue: 20, currentValue: 50 },
        { name: "Listen", baseValue: 20, currentValue: 50 },
        { name: "Locksmith", baseValue: 1, currentValue: 50 },
        { name: "Luck", baseValue: 65, currentValue: 50 },
        { name: "Mech Repair", baseValue: 10, currentValue: 50 },
        { name: "Medicine", baseValue: 1, currentValue: 50 },
        { name: "Natural World", baseValue: 10, currentValue: 50 },
        { name: "Navigate", baseValue: 10, currentValue: 50 },
        { name: "Occult", baseValue: 5, currentValue: 50 },
        { name: "Op Hv Machine", baseValue: 1, currentValue: 50 },
        { name: "Persuade", baseValue: 10, currentValue: 50 },
        { name: "Psychoanalysis", baseValue: 1, currentValue: 50 },
        { name: "Psychology", baseValue: 10, currentValue: 50 },
        { name: "Ride", baseValue: 5, currentValue: 50 },
        { name: "Sleight of Hand", baseValue: 10, currentValue: 50 },
        { name: "Spot Hidden", baseValue: 25, currentValue: 50 },
        { name: "Stealth", baseValue: 20, currentValue: 50 },
        { name: "Swim", baseValue: 20, currentValue: 50 },
        { name: "Throw", baseValue: 20, currentValue: 50 },
        { name: "Track", baseValue: 10, currentValue: 50 },
      ],
    },
    {
      player: {
        id: "sadjsaljdsaljdlsj",
        name: "Fernanda Sena",
        username: "#fevient",
        avatarUrl: "https://avatars.githubusercontent.com/u/87643260?v=4",
      },
      infos: {
        id: "aksalskals",
        name: "Lizabeth White",
        player: "Gabriel Sena",
        sex: "female" as "female",
        characterUrl:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2664fbe-b0bd-454c-bfe6-6e930a07fc49/dh1yf6m-9a50d508-4a14-4f63-9a0b-b4339f5d284a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YyNjY0ZmJlLWIwYmQtNDU0Yy1iZmU2LTZlOTMwYTA3ZmM0OVwvZGgxeWY2bS05YTUwZDUwOC00YTE0LTRmNjMtOWEwYi1iNDMzOWY1ZDI4NGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VNORNfSflxfLfH0SH-r1mLEM8eyB8LsRfinCHZuP5Jc",
        occupation: "Journalist and Private Detective",
        hitPoints: 100,
        magicPoints: 12,
        sanity: 84,
      },
      attributes: {
        strength: 50,
        dexterity: 60,
        intelligence: 70,
        power: 65,
        constitution: 55,
        appearance: 60,
        size: 50,
        education: 70,
      },
      skills: [
        { name: "Accounting", baseValue: 5, currentValue: 50 },
        { name: "Anthropology", baseValue: 1, currentValue: 50 },
        { name: "Appraise", baseValue: 5, currentValue: 50 },
        { name: "Archaeology", baseValue: 1, currentValue: 50 },
        { name: "Charm", baseValue: 15, currentValue: 50 },
        { name: "Climb", baseValue: 20, currentValue: 50 },
        { name: "Credit Rating", baseValue: 0, currentValue: 50 },
        { name: "Cthulhu Mythos", baseValue: 0, currentValue: 50 },
        { name: "Disguise", baseValue: 5, currentValue: 50 },
        { name: "Dodge", baseValue: "half DEX", currentValue: 50 },
        { name: "Drive Auto", baseValue: 20, currentValue: 50 },
        { name: "Elec Repair", baseValue: 10, currentValue: 50 },
        { name: "Fast Talk", baseValue: 5, currentValue: 50 },
        { name: "Fighting(Brawl)", baseValue: 25, currentValue: 50 },
        { name: "Firearms(HG)", baseValue: 20, currentValue: 50 },
        { name: "Firearms(R/S)", baseValue: 25, currentValue: 50 },
        { name: "First Aid", baseValue: 30, currentValue: 50 },
        { name: "History", baseValue: 5, currentValue: 50 },
        { name: "Intimidate", baseValue: 15, currentValue: 50 },
        { name: "Jump", baseValue: 20, currentValue: 50 },
        { name: "Language(Own)", baseValue: "EDU", currentValue: 50 },
        { name: "Law", baseValue: 5, currentValue: 50 },
        { name: "Library Use", baseValue: 20, currentValue: 50 },
        { name: "Listen", baseValue: 20, currentValue: 50 },
        { name: "Locksmith", baseValue: 1, currentValue: 50 },
        { name: "Luck", baseValue: 65, currentValue: 50 },
        { name: "Mech Repair", baseValue: 10, currentValue: 50 },
        { name: "Medicine", baseValue: 1, currentValue: 50 },
        { name: "Natural World", baseValue: 10, currentValue: 50 },
        { name: "Navigate", baseValue: 10, currentValue: 50 },
        { name: "Occult", baseValue: 5, currentValue: 50 },
        { name: "Op Hv Machine", baseValue: 1, currentValue: 50 },
        { name: "Persuade", baseValue: 10, currentValue: 50 },
        { name: "Psychoanalysis", baseValue: 1, currentValue: 50 },
        { name: "Psychology", baseValue: 10, currentValue: 50 },
        { name: "Ride", baseValue: 5, currentValue: 50 },
        { name: "Sleight of Hand", baseValue: 10, currentValue: 50 },
        { name: "Spot Hidden", baseValue: 25, currentValue: 50 },
        { name: "Stealth", baseValue: 20, currentValue: 50 },
        { name: "Swim", baseValue: 20, currentValue: 50 },
        { name: "Throw", baseValue: 20, currentValue: 50 },
        { name: "Track", baseValue: 10, currentValue: 50 },
      ],
    },
  ]

  if (editMode) {
    return (
      <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
        <ProfileInfo
          infos={playerCharacter.infos}
          player={playerCharacter.player}
          isEditMode={true}
        />
      </section>
    )
  }

  return (
    <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
      {!selectedCharacter && (
        <div className="space-y-2 ">
          <div className="flex items-center gap-x-4">
            <div className="flex cursor-pointer items-center group w-fit gap-x-2">
              <button className="bg-border flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FAFAFA"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                </svg>
              </button>
              <span>Create Character</span>
            </div>
            <div
              onClick={() => setEditMode(true)}
              className="flex cursor-pointer items-center group w-fit gap-x-2"
            >
              <button className="bg-border flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FAFAFA"
                  viewBox="0 0 256 256"
                >
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
                </svg>
              </button>
              <span>Edit Character</span>
            </div>
          </div>
          {characters.map((character) => (
            <div
              onClick={() => setSelectedCharacter(character)}
              key={character.infos.id}
              className="cursor-pointer border border-border hover:bg-border p-2 rounded"
            >
              <ProfileInfo infos={character.infos} player={character.player} />
            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <div>
          <div
            onClick={() => setSelectedCharacter(null)}
            className="flex mb-2 cursor-pointer items-center group w-fit gap-x-2"
          >
            <button className="bg-border flex items-center justify-center text-white p-1 rounded-full shadow-p group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FAFAFA"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <span>Back</span>
          </div>
          <ProfileInfo
            infos={selectedCharacter.infos}
            player={selectedCharacter.player}
          />
          <Attributes attributes={selectedCharacter.attributes} {...actions} />
          <Skills skills={selectedCharacter.skills} {...actions} />
          <Combat {...actions} />
          <Inventory {...actions} />
          <Backstory {...actions} />
        </div>
      )}
    </section>
  )
}

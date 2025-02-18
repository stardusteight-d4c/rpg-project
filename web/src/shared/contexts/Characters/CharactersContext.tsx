"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { characters as mockCharacters } from "./mock-data"

interface CharactersState {
  characters: ISheet[]
  copyCharacters: ISheet[]
  getCharacterById: (id: string) => ISheet | undefined
  getCharactersByType: () => {
    players: ISheet[]
    npcs: ISheet[]
    enemies: ISheet[]
  }
  addCharacter: (user: ISheet) => void
  updateCharacter: (id: string, updatedCharacter: Partial<ISheet>) => void
  updateCopyCharacter: (
    id: string,
    updatedCharacter: Partial<ISheet>
  ) => void
  removeCharacter: (id: string) => void
}

const defaultState: CharactersState = {
  characters: [],
  copyCharacters: [],
  getCharactersByType: () => ({
    players: [],
    npcs: [],
    enemies: [],
  }),
  addCharacter: () => {},
  updateCharacter: () => {},
  updateCopyCharacter: () => {},
  removeCharacter: () => {},
  getCharacterById: () => undefined,
}

const CharactersContext = createContext<CharactersState>(defaultState)

export const CharactersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<ISheet[]>(mockCharacters)
  const [copyCharacters, setCopyCharacters] =
    useState<ISheet[]>(mockCharacters)

  const getCharactersByType = (): {
    players: ISheet[]
    npcs: ISheet[]
    enemies: ISheet[]
  } => {
    const players = characters.filter(
      (character) => character.infos.type === "player"
    )
    const npcs = characters.filter(
      (character) => character.infos.type === "npc"
    )
    const enemies = characters.filter(
      (character) => character.infos.type === "enemy"
    )

    return { players, npcs, enemies }
  }

  const addCharacter = (user: ISheet) => {
    setCharacters((prev) => [...prev, user])
  }

  const updateCopyCharacter = (
    id: string,
    updatedCharacter: Partial<ISheet>
  ) => {
    setCopyCharacters((prev) => {
      const existingCharacter = prev.find((character) => character.id === id)

      if (existingCharacter) {
        return prev.map((character) =>
          character.id === id
            ? { ...character, ...updatedCharacter }
            : character
        )
      } else {
        return [...prev, { id, ...updatedCharacter } as ISheet]
      }
    })
  }

  const updateCharacter = (
    id: string,
    updatedCharacter: Partial<ISheet>
  ) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, ...updatedCharacter } : character
      )
    )
  }

  const removeCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((character) => character.id !== id))
    setCopyCharacters((prev) => prev.filter((character) => character.id !== id))
  }

  const getCharacterById = (id: string): ISheet | undefined => {
    return characters.find((character) => character.id === id)
  }

  return (
    <CharactersContext.Provider
      value={{
        characters,
        copyCharacters,
        getCharactersByType,
        addCharacter,
        getCharacterById,
        updateCharacter,
        updateCopyCharacter,
        removeCharacter,
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}

export const useCharacters = () => {
  const context = useContext(CharactersContext)
  if (!context) {
    throw new Error("useCharacters must be used within a CharactersProvider")
  }
  return context
}

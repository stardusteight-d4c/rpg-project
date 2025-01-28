"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { characters as mockCharacters } from "./mock-data"

interface CharactersState {
  characters: ICharacter[]
  getCharactersByType: () => {
    players: ICharacter[]
    npcs: ICharacter[]
    enemies: ICharacter[]
  }
  addCharacter: (user: ICharacter) => void
  updateCharacter: (id: string, updatedCharacter: Partial<ICharacter>) => void
  removeCharacter: (id: string) => void
}

const defaultState: CharactersState = {
  characters: [],
  getCharactersByType: () => ({
    players: [],
    npcs: [],
    enemies: [],
  }),
  addCharacter: () => {},
  updateCharacter: () => {},
  removeCharacter: () => {},
}

const CharactersContext = createContext<CharactersState>(defaultState)

export const CharactersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<ICharacter[]>(mockCharacters)

  const getCharactersByType = (): {
    players: ICharacter[]
    npcs: ICharacter[]
    enemies: ICharacter[]
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

  const addCharacter = (user: ICharacter) => {
    setCharacters((prev) => [...prev, user])
  }

  const updateCharacter = (id: string, updatedCharacter: Partial<ICharacter>) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, ...updatedCharacter } : character
      )
    )
  }

  const removeCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((character) => character.id !== id))
  }

  return (
    <CharactersContext.Provider
      value={{
        characters,
        getCharactersByType,
        addCharacter,
        updateCharacter,
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

"use client"

import { Board } from "./components"
import { useState } from "react"
import { renderingActiveSection } from "./utils/renderingActiveSection"
import { DraggableItem } from "./components/Map/components"
import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"

export function BoardModule() {
  const [active, setActive] = useState<MenuItem>("map")
  const charactersContext = useCharacters()
  const { players, enemies, npcs } = charactersContext.getCharactersByType()

  return (
    <main className="max-h-screen relative no-scrollbar overflow-hidden">
      <div className="w-full flex">
        <div className="min-w-[20vw] max-w-[20vw]">
          <Board.Actions />
        </div>
        <div className="max-w-[58px] border-x border-border min-w-[58px] h-screen">
          <Board.Menu active={active} onActive={setActive} />
        </div>
        <div className="w-full">{renderingActiveSection(active)}</div>
        <div className="flex flex-col items-center justify-start border-l py-2 min-w-[70px] border-border overflow-y-scroll overflow-x-hidden no-scrollbar h-screen">
          <div className="flex flex-col gap-2 w-full items-center mx-auto">
            {players.map((character: ICharacter, index: any) => (
              <div
                key={index}
                className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]"
              >
                <DraggableItem
                  id={character.infos.id}
                  imgUrl={character.infos.characterUrl}
                  type="box"
                  player={index === 0}
                  character={character}
                />
              </div>
            ))}
          </div>
          <div className="w-[50px] mx-auto my-4 h-0 border-t border-border" />
          <div className="flex flex-col gap-2 w-full items-center mx-auto">
            {npcs.map((character: ICharacter, index: any) => (
              <div
                key={index}
                className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]"
              >
                <DraggableItem
                  id={character.infos.id}
                  imgUrl={character.infos.characterUrl}
                  type="box"
                  player={index === 0}
                  character={character}
                />
              </div>
            ))}
          </div>
          <div className="w-[50px] mx-auto my-4 h-0 border-t border-border" />
          <div className="flex flex-col gap-2 w-full items-center mx-auto">
            {enemies.map((character: ICharacter, index: any) => (
              <div
                key={index}
                className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]"
              >
                <DraggableItem
                  id={character.infos.id}
                  imgUrl={character.infos.characterUrl}
                  type="box"
                  player={index === 0}
                  character={character}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

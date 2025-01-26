"use client"

import { Board } from "./components"
import { useState } from "react"
import { characters } from "./components/Characters/mock-data"
import { renderingActiveSection } from "./utils/renderingActiveSection"
import { DraggableItem } from "./components/Map/components"

export function BoardModule() {
  const [active, setActive] = useState<MenuItem>("map")

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
        <div className="flex flex-col items-center justify-center border-l pb-2 min-w-[70px] border-border overflow-y-scroll overflow-x-hidden no-scrollbar h-screen">
          <div className="flex flex-col gap-2 w-full items-center mx-auto mt-4">
            {characters.map((character: any, index: any) => (
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
            <div className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]">
              <DraggableItem id="111" imgUrl="/characters/01.jpg" type="box" />
            </div>
            <div className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]">
              <DraggableItem id="222" imgUrl="/characters/02.jpg" type="box" />
            </div>
            <div className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]">
              <DraggableItem id="333" imgUrl="/characters/04.jpg" type="box" />
            </div>
          </div>
          <div className="w-[50px] mx-auto my-4 h-0 border-t border-border" />
          <div className="flex flex-col gap-2 w-full items-center mx-auto">
            <div className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]">
              <DraggableItem
                id="sassasd"
                imgUrl="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/907bcc38-88f0-4bd7-998d-7bf2117fa6de/di0pgvo-0cc24cb7-0771-420b-b994-75c872d1a24b.jpg/v1/fill/w_350,h_350,q_70,strp/the_nameless_beast_of_the_abyss_lake_v2_by_gekkou25_di0pgvo-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzkwN2JjYzM4LTg4ZjAtNGJkNy05OThkLTdiZjIxMTdmYTZkZVwvZGkwcGd2by0wY2MyNGNiNy0wNzcxLTQyMGItYjk5NC03NWM4NzJkMWEyNGIuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-AFdrmEJ6iXNCrYtPflkC6FDi9WlQIAGWBGRcGPuUpc"
                type="box"
              />
            </div>
            <div className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]">
              <DraggableItem
                id="asdsafs"
                imgUrl="https://images-ng.pixai.art/images/orig/04b02722-dcae-4701-ba9b-e31a21220776"
                type="box"
              />
            </div>
            <div className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-[9/13]">
              <DraggableItem
                id="adsadssd"
                imgUrl="https://d1vzi28wh99zvq.cloudfront.net/images/8135/_product_images/439376/DeanSpencer-spotcol-goblintankFP.jpg"
                type="box"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"

import { Board } from "./components"
import { useState } from "react"
import { DraggableItem } from "./components/Map/Map"
import { characters } from "./components/Characters/mock-data"
import { renderingActiveSection } from "./utils/renderingActiveSection"

export function BoardModule() {
  const [active, setActive] = useState<MenuItem>("map")

  return (
    <main className="max-h-screen relative overflow-hidden">
      <div className="w-full flex">
        <div className="min-w-[20vw] max-w-[20vw]">
          <Board.Actions />
        </div>
        <div className="max-w-[58px] border-x border-border min-w-[58px] h-screen">
          <Board.Menu active={active} onActive={setActive} />
        </div>
        <div className="w-full">
          {renderingActiveSection(active)}
        </div>
        
      </div>
    </main>
  )
}


{/* <div className="w-full pb-2 overflow-y-scroll no-scrollbar h-screen border-l border-border">
          <Board.Cam />
          <div>
            <span className="block text-xl p-2 border-white">Players</span>
            <div className="grid grid-cols-3 gap-[2px] w-full items-center justify-center">
              {characters.map((character: any, index: any) => (
                <div
                  key={index}
                  className="col-span-1 overflow-hidden aspect-[9/13] h-full w-full"
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
          <div>
            <span className="block text-xl p-2 border-white">NPCs</span>
            <div className="grid grid-cols-3 gap-[2px] w-full items-center justify-center">
              <div className="col-span-1 overflow-hidden aspect-square h-full w-full">
                <DraggableItem
                  id="111"
                  imgUrl="/characters/01.jpg"
                  type="box"
                />
              </div>
              <div className="col-span-1 overflow-hidden aspect-square h-full w-full">
                <DraggableItem
                  id="222"
                  imgUrl="/characters/02.jpg"
                  type="box"
                />
              </div>
              <div className="col-span-1 overflow-hidden aspect-square h-full w-full">
                <DraggableItem
                  id="333"
                  imgUrl="/characters/04.jpg"
                  type="box"
                />
              </div>
            </div>
          </div>
          <div>
            <span className="block text-xl p-2 border-white">Enemies</span>
            <div className="grid grid-cols-3 gap-[2px] w-full items-center justify-center">
              <div className="col-span-1 overflow-hidden aspect-square h-full w-full">
                <DraggableItem
                  id="sassasd"
                  imgUrl="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/907bcc38-88f0-4bd7-998d-7bf2117fa6de/di0pgvo-0cc24cb7-0771-420b-b994-75c872d1a24b.jpg/v1/fill/w_350,h_350,q_70,strp/the_nameless_beast_of_the_abyss_lake_v2_by_gekkou25_di0pgvo-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzkwN2JjYzM4LTg4ZjAtNGJkNy05OThkLTdiZjIxMTdmYTZkZVwvZGkwcGd2by0wY2MyNGNiNy0wNzcxLTQyMGItYjk5NC03NWM4NzJkMWEyNGIuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-AFdrmEJ6iXNCrYtPflkC6FDi9WlQIAGWBGRcGPuUpc"
                  type="box"
                />
              </div>
              <div className="col-span-1 overflow-hidden aspect-square h-full w-full">
                <DraggableItem
                  id="asdsafs"
                  imgUrl="https://images-ng.pixai.art/images/orig/04b02722-dcae-4701-ba9b-e31a21220776"
                  type="box"
                />
              </div>
              <div className="col-span-1 overflow-hidden aspect-square h-full w-full">
                <DraggableItem
                  id="adsadssd"
                  imgUrl="https://d1vzi28wh99zvq.cloudfront.net/images/8135/_product_images/439376/DeanSpencer-spotcol-goblintankFP.jpg"
                  type="box"
                />
              </div>
            </div>
          </div>
        </div> */}
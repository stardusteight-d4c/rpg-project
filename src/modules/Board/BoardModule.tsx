"use client"

import { Board } from "./components"
import { useState } from "react"
import { DraggableItem } from "./components/Map/Map"
import { Tooltip } from "@/shared/components"

export function BoardModule() {
  const [active, setActive] = useState<
    "map" | "dice" | "characters" | "handouts" | "notifications" | "notes"
  >("map")

  return (
    <main className="max-h-screen relative overflow-hidden">
      <div className="w-full flex">
        <Board.Chat />
        <div className="w-fit h-screen relative p-2 border-x border-border">
          <div className="flex flex-col items-center gap-y-4">
            <Tooltip text="Map" variant position="right">
              <span onClick={() => setActive("map")} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 256"
                  className={`${
                    active === "map" && " background-gradient "
                  } rounded-2xl p-1 fill-white`}
                >
                  <path d="M249.94,120.24l-27.05-6.76a95.86,95.86,0,0,0-80.37-80.37l-6.76-27a8,8,0,0,0-15.52,0l-6.76,27.05a95.86,95.86,0,0,0-80.37,80.37l-27,6.76a8,8,0,0,0,0,15.52l27.05,6.76a95.86,95.86,0,0,0,80.37,80.37l6.76,27.05a8,8,0,0,0,15.52,0l6.76-27.05a95.86,95.86,0,0,0,80.37-80.37l27.05-6.76a8,8,0,0,0,0-15.52Zm-95.49,22.9L139.31,128l15.14-15.14L215,128Zm-52.9,0L41,128l60.57-15.14L116.69,128ZM205.77,109.2,158.6,97.4,146.8,50.23A79.88,79.88,0,0,1,205.77,109.2Zm-62.63-7.65L128,116.69l-15.14-15.14L128,41ZM109.2,50.23,97.4,97.4,50.23,109.2A79.88,79.88,0,0,1,109.2,50.23Zm-59,96.57L97.4,158.6l11.8,47.17A79.88,79.88,0,0,1,50.23,146.8Zm62.63,7.65L128,139.31l15.14,15.14L128,215Zm33.94,51.32,11.8-47.17,47.17-11.8A79.88,79.88,0,0,1,146.8,205.77Z"></path>
                </svg>
              </span>
            </Tooltip>
            <Tooltip text="Characters & NPCs" variant position="right">
              <span
                onClick={() => {
                  setActive("characters")
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 256"
                  className={`${
                    active === "characters" && " background-gradient "
                  } rounded-2xl p-1 fill-white`}
                >
                  <path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path>
                </svg>
              </span>
            </Tooltip>
            <Tooltip text="Handouts" variant position="right">
              <span
                onClick={() => setActive("handouts")}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 256"
                  className={`${
                    active === "handouts" && " background-gradient "
                  } rounded-2xl p-1 fill-white`}
                >
                  <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path>
                </svg>
              </span>
            </Tooltip>
            <Tooltip text="Notes" variant position="right">
              <span
                onClick={() => setActive("notes")}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 256"
                  className={`${
                    active === "notes" && " background-gradient "
                  } rounded-2xl p-1 fill-white`}
                >
                  <path d="M168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16ZM216,40V200a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32V40a8,8,0,0,1,8-8H72V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h32V24a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,40Zm-16,8H184v8a8,8,0,0,1-16,0V48H136v8a8,8,0,0,1-16,0V48H88v8a8,8,0,0,1-16,0V48H56V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16Z"></path>
                </svg>
              </span>
            </Tooltip>
            <Tooltip text="Notifications" variant position="right">
              <span
                onClick={() => setActive("notifications")}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 256 256"
                  className={`${
                    active === "notifications" && " background-gradient "
                  } rounded-2xl p-1 fill-white`}
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                </svg>
              </span>
            </Tooltip>
          </div>
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocKZ6-8Y81xmgJICx4clB0lEyFaGLS2L4qVB1K6ETBP4k-3Ovlk=s258-c-no"
            alt=""
            referrerPolicy="no-referrer"
            className="w-[40px] absolute bottom-4 cursor-pointer object-cover left-1/2 -translate-x-1/2 h-[40px] rounded-full mt-auto"
          />
        </div>
        <div className="max-w-[50vw] w-full relative overflow-hidden h-screen">
          {active === "map" && <Board.Map />}
          {active === "characters" && <Board.Characters />}
          {active === "handouts" && <Board.Handouts />}
        </div>
        <div className="w-[26vw] 2xl:w-[30vw] pb-2 overflow-y-scroll no-scrollbar h-screen border-l border-border">
          <Board.Cam />
          <div className="">
            <span className="block text-xl p-2 border-white">Characters</span>
            <div className="grid grid-cols-3 w-full items-center justify-center">
              <div className="col-span-1 border border-border aspect-[9/13] h-full w-full">
                <DraggableItem
                  id="1"
                  imgUrl="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
                  type="box"
                />
              </div>
              <div className="col-span-1 border border-border aspect-[9/13] h-full w-full">
                <DraggableItem
                  id="2"
                  imgUrl="https://neural.love/cdn/thumbnails/1eed6701-3f10-66ae-a3ea-41b70a0743ac/eeb65884-de3b-5ffc-9982-79cfe16f394b.webp?Expires=1767225599&Signature=tnQgxe3HIRNHu4D532pE79A2nbqUhNwYrzKXOsl-ZX9uqsiDQY1orBDBv1pBmKVfHtCWwp9N31Q7wP4n2S~BKTJRHElZheN-DJU5Q3nHRIiXqvXdxKBYnD7ZH3Mcjl6n9RuxIy5YywbWqvTIs05HYX13SmDMOBx4sCaJvD4MBovknJ1OWL~1txwStM7fNnsyLKf8j857Kci1OLDKuDeJyRgKzQryixLSt-KB7lknK2tXGeAA~XW31yW9dbVhw0oeuXwhJAXYtezI9pcGaBHmm2sPtr3BMM7mJtkK-arna11zegqXaYVEeCsdRxQCwTHQUuApPYk0Kc6OHZ4eTnr42w__&Key-Pair-Id=K2RFTOXRBNSROX"
                  type="box"
                />
              </div>
              <div className="col-span-1 border border-border aspect-[9/13] h-full w-full">
                <DraggableItem
                  id="3"
                  imgUrl="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2664fbe-b0bd-454c-bfe6-6e930a07fc49/dh1yf6m-9a50d508-4a14-4f63-9a0b-b4339f5d284a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YyNjY0ZmJlLWIwYmQtNDU0Yy1iZmU2LTZlOTMwYTA3ZmM0OVwvZGgxeWY2bS05YTUwZDUwOC00YTE0LTRmNjMtOWEwYi1iNDMzOWY1ZDI4NGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VNORNfSflxfLfH0SH-r1mLEM8eyB8LsRfinCHZuP5Jc"
                  type="box"
                />
              </div>
            </div>
          </div>
          <div>
            <span className="block text-xl p-2 border-white">NPCs</span>
            <div className="grid grid-cols-4 w-full items-center justify-center">
              <div className="col-span-1 border border-border aspect-square h-full w-full">
                <DraggableItem
                  id="111"
                  imgUrl="/characters/01.jpg"
                  type="box"
                />
              </div>
              <div className="col-span-1 border border-border aspect-square h-full w-full">
                <DraggableItem
                  id="222"
                  imgUrl="/characters/02.jpg"
                  type="box"
                />
              </div>
              <div className="col-span-1 border border-border aspect-square h-full w-full">
                <DraggableItem
                  id="333"
                  imgUrl="/characters/04.jpg"
                  type="box"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

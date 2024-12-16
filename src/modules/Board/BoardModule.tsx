"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Board } from "./components"
import { useState } from "react"
import { DraggableItem } from "./components/Map/Map"

export function BoardModule() {
  const [active, setActive] = useState<
    | "map"
    | "dice"
    | "character_sheet"
    | "characters"
    | "diary"
    | "notifications"
  >("map")

  return (
    <main className="max-h-screen relative overflow-hidden">
      <div className="w-full flex">
        <Board.Chat />
        <div className="w-fit p-2 border-x border-border">
          <div className="bg-background  flex flex-col items-center gap-y-4">
            <span onClick={() => setActive("map")} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill=""
                viewBox="0 0 256 256"
                className={`${
                  active === "map"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M249.94,120.24l-27.05-6.76a95.86,95.86,0,0,0-80.37-80.37l-6.76-27a8,8,0,0,0-15.52,0l-6.76,27.05a95.86,95.86,0,0,0-80.37,80.37l-27,6.76a8,8,0,0,0,0,15.52l27.05,6.76a95.86,95.86,0,0,0,80.37,80.37l6.76,27.05a8,8,0,0,0,15.52,0l6.76-27.05a95.86,95.86,0,0,0,80.37-80.37l27.05-6.76a8,8,0,0,0,0-15.52Zm-95.49,22.9L139.31,128l15.14-15.14L215,128Zm-52.9,0L41,128l60.57-15.14L116.69,128ZM205.77,109.2,158.6,97.4,146.8,50.23A79.88,79.88,0,0,1,205.77,109.2Zm-62.63-7.65L128,116.69l-15.14-15.14L128,41ZM109.2,50.23,97.4,97.4,50.23,109.2A79.88,79.88,0,0,1,109.2,50.23Zm-59,96.57L97.4,158.6l11.8,47.17A79.88,79.88,0,0,1,50.23,146.8Zm62.63,7.65L128,139.31l15.14,15.14L128,215Zm33.94,51.32,11.8-47.17,47.17-11.8A79.88,79.88,0,0,1,146.8,205.77Z"></path>
              </svg>
            </span>
            <span onClick={() => setActive("dice")} className="cursor-pointer">
              <svg
                width="40"
                height="40"
                viewBox="0 0 448 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  active === "dice"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path
                  d="M431.88 116.13L239.88 4.30012C235.061 1.4847 229.581 0.000976562 224 0.000976562C218.419 0.000976562 212.939 1.4847 208.12 4.30012L16.12 116.14C6.15 121.94 0 132.75 0 144.46V367.55C0 379.26 6.15 390.06 16.12 395.87L208.12 507.7C212.939 510.516 218.419 511.999 224 511.999C229.581 511.999 235.061 510.516 239.88 507.7L431.88 395.87C441.85 390.06 448 379.25 448 367.55V144.46C448 132.75 441.85 121.94 431.88 116.13ZM224 57.6201L318.7 176H129.3L224 57.6201ZM124.62 208H323.37L224 369.47L124.62 208ZM192.9 379.99L55.92 362.87L100.35 229.59L192.9 379.99ZM347.65 229.58L392.08 362.86L255.1 379.99L347.65 229.58ZM354.82 169.89L262.67 54.7201L400.68 135.5L354.82 169.89ZM93.18 169.89L46.94 135.21L185.48 54.5101L93.18 169.89ZM77.17 197.87L32.04 333.27L32.21 164.15L77.17 197.87ZM208 414.12V470.55L85.4 398.8L208 414.12ZM363.6 398.67L240 470.84V414.12L363.6 398.67ZM370.83 197.87L415.98 164.01L415.81 332.8L370.83 197.87ZM224.14 480H224.31L224.22 480.05L224.14 480Z"
                  className={`${
                    active === "dice" ? " fill-background " : " fill-white "
                  }`}
                />
              </svg>

              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#fafafa"
                viewBox="0 0 256 256"
               
              >
                <path d="M192,32H64A32,32,0,0,0,32,64V192a32,32,0,0,0,32,32H192a32,32,0,0,0,32-32V64A32,32,0,0,0,192,32Zm16,160a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64A16,16,0,0,1,64,48H192a16,16,0,0,1,16,16ZM104,92A12,12,0,1,1,92,80,12,12,0,0,1,104,92Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,92Zm-72,72a12,12,0,1,1-12-12A12,12,0,0,1,104,164Zm36-36a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm36,36a12,12,0,1,1-12-12A12,12,0,0,1,176,164Z"></path>
              </svg> */}
            </span>
            <span
              onClick={() => setActive("character_sheet")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#000000"
                viewBox="0 0 256 256"
                className={`${
                  active === "character_sheet"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z"></path>
              </svg>
            </span>
            <span
              onClick={() => setActive("characters")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#000000"
                viewBox="0 0 256 256"
                className={`${
                  active === "characters"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
              </svg>
            </span>
            <span onClick={() => setActive("diary")} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#000000"
                viewBox="0 0 256 256"
                className={`${
                  active === "diary"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path>
              </svg>
            </span>
            <span
              onClick={() => setActive("notifications")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#000000"
                viewBox="0 0 256 256"
                className={`${
                  active === "notifications"
                    ? " background-gradient fill-background "
                    : " fill-white "
                } rounded p-1`}
              >
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div className="max-w-[50vw] w-full relative h-screen">
          {active === "map" && <Board.Map />}
          {active === "dice" && <Board.Dice />}
          {active === "character_sheet" && (
            <Board.CharactersSheets.CallOfCthulhu />
          )}
          {active === "characters" && <Board.Characters />}
        </div>
        <div className="w-[26vw] h-screen border-l border-border">
          <Board.Cam />
          <div>
            <span className="block text-xl p-2">Characters</span>
            <div className="flex items-center gap-x-2 flex-wrap px-2">
              <div className="w-[48px] h-[48px] rounded overflow-hidden">
                <DraggableItem
                  id="1"
                  imgUrl="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
                  type="box"
                />
              </div>
              <div className="w-[48px] h-[48px] rounded overflow-hidden">
                <DraggableItem
                  id="2"
                  imgUrl="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2664fbe-b0bd-454c-bfe6-6e930a07fc49/dh1yf6m-9a50d508-4a14-4f63-9a0b-b4339f5d284a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YyNjY0ZmJlLWIwYmQtNDU0Yy1iZmU2LTZlOTMwYTA3ZmM0OVwvZGgxeWY2bS05YTUwZDUwOC00YTE0LTRmNjMtOWEwYi1iNDMzOWY1ZDI4NGEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VNORNfSflxfLfH0SH-r1mLEM8eyB8LsRfinCHZuP5Jc"
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

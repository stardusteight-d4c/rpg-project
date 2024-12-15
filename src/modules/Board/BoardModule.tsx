"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Board } from "./components"

export function BoardModule() {
  const params = useParams()
  return (
    <main className="">
      <div className="w-full flex">
        <Board.Chat />
        <div className="w-[50vw] border-x border-border h-screen">
          <Image
            src="/Simple-house-1.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-fill select-none pointer-events-none"
          />
        </div>
      </div>
    </main>
  )
}

"use client"

import { useEffect, useState } from "react"
import { AudioPlayer } from "./components/AudioPlayer"

export const Sounds = () => {
  const [sounds, setSounds] = useState<Sound[]>([])

  useEffect(() => {
    ;(async () => {
      await fetch("/sounds.json")
        .then((res) => res.json())
        .then((data: Sound[]) => {
          setSounds(data)
        })
        .catch((error) => console.log(error))
    })()
  }, [])

  if (sounds.length === 0) return null

  return (
    <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
      {/* <div className="p-2">
        <AudioPlayer sound={sounds[0]} />
      </div> */}
      <div className="p-2 grid grid-cols-2 gap-2">
        {sounds.map((sound, index) => (
          <AudioPlayer sound={sound} key={index} />
        ))}
      </div>
    </section>
  )
}

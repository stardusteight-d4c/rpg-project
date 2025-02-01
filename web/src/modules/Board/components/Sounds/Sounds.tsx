"use client"

import { useEffect, useRef, useState } from "react"
import { ProgressBar } from "./components/ProgressBar"
import { Controls } from "./components/Controls"

export const Sounds = () => {
  const [sounds, setSounds] = useState<Sound[]>([])
  const [currentSound, setCurrentSound] = useState<CurrentSound>()
  const progressBarElementRef = useRef<any>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioElementRef: any =
    useRef<React.ClassAttributes<HTMLAudioElement>>(null)
  const [mute, setMute] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(50)

  useEffect(() => {
    ;(async () => {
      await fetch("/sounds.json")
        .then((res) => res.json())
        .then((data: Sound[]) => {
          setSounds(data)
          setCurrentSound(data[0])
        })
        .catch((error) => console.log(error))
    })()
  }, [])

  useEffect(() => {
    setProgress(currentSound?.progress!)
  }, [currentSound?.progress])

  // useEffect(() => {
  //   if (isPlaying) {
  //     audioElementRef.current?.play()
  //   } else {
  //     audioElementRef.current?.pause()
  //   }
  // }, [isPlaying])

  if (currentSound === null || currentSound === undefined) {
    return <></>
  }

  const onPlaying = () => {
    const duration = audioElementRef.current.duration
    const currentTime = audioElementRef.current.currentTime
    setCurrentSound({
      ...currentSound,
      progress: (currentTime / duration) * 100,
      currentTime,
      duration,
    })
  }

  const audioProps = {
    src: currentSound.url,
    ref: audioElementRef,
    onTimeUpdate: onPlaying,
    muted: mute,
  }

  const controlsProps: ControlsProps = {
    sounds,
    currentSound,
    setCurrentSound,
    setProgress,
    audioElementRef,
    setIsPlaying,
    isPlaying,
    volume,
    setVolume,
    mute,
    setMute,
  }

  const progressBarProps: ProgressBarProps = {
    currentSound,
    progressBarElementRef,
    audioElementRef,
    setProgress,
    progress,
  }

  return (
    <section className="relative w-full h-screen overflow-y-scroll no-scrollbar">
      <div className="p-2 grid grid-cols-2 gap-2">
        {sounds.map((sound, index) => (
          <div
            onClick={() => setCurrentSound(sound)}
            key={index}
            className="col-span-1 cursor-pointer relative border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
          >
            <audio {...audioProps} />
            <div className="flex">
              <div className="flex flex-row gap-x-4 w-full">
                <img
                  src={sound?.cover}
                  className="w-[110px] object-cover h-[110px] rounded-lg"
                />
                <div className="flex flex-col w-full">
                  <h2 className="text-white font-bold text-2xl">
                    {sound.music}
                  </h2>
                  <div className="w-full">
                    <ProgressBar {...progressBarProps} />
                    <Controls {...controlsProps} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

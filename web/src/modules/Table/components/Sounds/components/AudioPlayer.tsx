"use client"

import { useEffect, useRef, useState } from "react"
import { ProgressBar } from "./ProgressBar"
import { Controls } from "./Controls"

interface AudioPlayerProps {
  sound: Sound
}

export const AudioPlayer = ({ sound }: AudioPlayerProps) => {
  const [currentSound, setCurrentSound] = useState<CurrentSound>(sound)
  const progressBarElementRef = useRef<any>(null)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioElementRef: any =
    useRef<React.ClassAttributes<HTMLAudioElement>>(null)
  const [mute, setMute] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(50)
  const [onMoutedRef, setOnMountedRef] = useState<boolean>(false)

  useEffect(() => {
    setProgress(currentSound?.progress!)
  }, [currentSound?.progress])

  useEffect(() => {
    setOnMountedRef(true)
    if (!audioElementRef) return
    const duration = audioElementRef.current.duration
    const currentTime = audioElementRef.current.currentTime
    setCurrentSound({
      ...currentSound!,
      progress: (currentTime / duration) * 100,
      currentTime,
      duration,
    })
  }, [onMoutedRef, audioElementRef])

  const onPlaying = () => {
    const duration = audioElementRef.current.duration
    const currentTime = audioElementRef.current.currentTime
    setCurrentSound({
      ...currentSound!,
      progress: (currentTime / duration) * 100,
      currentTime,
      duration,
    })
  }

  return (
    <div className="col-span-1 relative border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl">
      <audio
        src={currentSound?.url}
        ref={audioElementRef}
        onTimeUpdate={onPlaying}
        muted={mute}
        className="hidden"
      />
      <div className="flex">
        <div className="flex flex-row gap-x-4 w-full">
          <img
            src={sound.cover}
            className="w-[110px] object-cover h-[110px] rounded-xl"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-transparent w-fit background-gradient bg-clip-text font-bold text-2xl ">
                {sound.music}
              </h2>
              <span className="font-medium flex items-center gap-x-2">
                <div className="">
                  <input
                    type="checkbox"
                    id={sound.id}
                    style={{ display: "none" }}
                    // checked={skill.checked}
                    className="cbx2"
                    // onChange={(event) =>
                    //   handleEdit(skill.name, "checked", event.target.checked)
                    // }
                  />
                  <label htmlFor={sound.id} className="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                      <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                      <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                  </label>
                </div>
              </span>
            </div>
            <div className="w-full">
              <ProgressBar
                setCurrentSound={setCurrentSound}
                currentSound={currentSound!}
                progressBarElementRef={progressBarElementRef}
                audioElementRef={audioElementRef}
                setProgress={setProgress}
                progress={progress}
              />
              <Controls
                currentSound={currentSound!}
                setProgress={setProgress}
                audioElementRef={audioElementRef}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                volume={volume}
                setVolume={setVolume}
                mute={mute}
                setMute={setMute}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

  useEffect(() => {
    setProgress(currentSound?.progress!)
  }, [currentSound?.progress])

  useEffect(() => {
    const duration = audioElementRef.current.duration
    const currentTime = audioElementRef.current.currentTime
    setCurrentSound({
      ...currentSound!,
      progress: (currentTime / duration) * 100,
      currentTime,
      duration,
    })
  }, [sound])

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

  const audioProps = {
    src: currentSound?.url,
    ref: audioElementRef,
    onTimeUpdate: onPlaying,
    muted: mute,
  }

  const controlsProps: ControlsProps = {
    currentSound: currentSound!,
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
    currentSound: currentSound!,
    progressBarElementRef,
    audioElementRef,
    setProgress,
    progress,
  }

  return (
    <div
      onClick={() => setCurrentSound(sound)}
      className="col-span-1 cursor-pointer relative border border-border hover:bg-border hover:brightness-105 p-2 rounded-xl"
    >
      <audio {...audioProps} />
      <div className="flex">
        <div className="flex flex-row gap-x-4 w-full">
          <img
            src={sound.cover}
            className="w-[110px] object-cover h-[110px] rounded-lg"
          />
          <div className="flex flex-col w-full">
            <h2 className="text-transparent w-fit background-gradient bg-clip-text font-bold text-2xl ">
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
  )
}

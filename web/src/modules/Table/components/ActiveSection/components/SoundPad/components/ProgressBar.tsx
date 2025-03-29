import React, { useEffect } from "react"

export const ProgressBar = ({
  currentSound,
  progressBarElementRef,
  audioElementRef,
  setProgress,
  progress,
  setCurrentSound,
}: ProgressBarProps) => {
  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60)
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60)

      return `${minutes}:${seconds}`
    }
    return "00:00"
  }

  const handleProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const width = progressBarElementRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    if (
      !audioElementRef.current ||
      !currentSound?.duration ||
      isNaN(currentSound.duration)
    )
      return

    const progress = (offset / width) * 100

    if (isNaN(progress) || !isFinite(progress)) return

    audioElementRef.current.currentTime =
      (progress / 100) * currentSound.duration
    audioElementRef.current.play()
    setProgress(progress)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <span>{formatTime(currentSound.currentTime!)}</span>
        <span>{formatTime(currentSound.duration!)}</span>
      </div>
      <div
        className="w-full bg-gray-600/10 cursor-pointer shadow-inner relative z-10 h-2 overflow-hidden rounded-full"
        onClick={(e) => handleProgress(e)}
        ref={progressBarElementRef}
      >
        <div
          style={{ width: `${progress ? progress + "%" : "0%"}` }}
          className="background-gradient z-50 relative h-2 rounded-full"
        />
      </div>
    </div>
  )
}

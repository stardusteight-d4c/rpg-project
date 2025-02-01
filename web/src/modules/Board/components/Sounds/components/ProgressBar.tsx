import React from "react"

export const ProgressBar = ({
  currentSound,
  progressBarElementRef,
  audioElementRef,
  setProgress,
  progress,
}: ProgressBarProps) => {
  const handleProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const width = progressBarElementRef.current.clientWidth
    const offset = e.nativeEvent.offsetX
    const progress = (offset / width) * 100
    audioElementRef.current.currentTime =
      (progress / 100) * currentSound.duration!
    setProgress(progress)
  }

  console.log(progress)

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

  return (
    <div className="w-full cursor-pointer">
      <div className="flex items-center justify-between">
        <span>{formatTime(currentSound.currentTime!)}</span>
        <span>{formatTime(currentSound.duration!)}</span>
      </div>
      <div
        className="w-full bg-ashes shadow-inner relative z-10 shadow-black/10 h-2 overflow-hidden rounded-full"
        onClick={(e) => handleProgress(e)}
        ref={progressBarElementRef}
      >
        <div
          style={{ width: `${progress ? progress + "%" : "0%"}` }}
          className="bg-white z-50 relative h-2 rounded-full"
        />
      </div>
    </div>
  )
}

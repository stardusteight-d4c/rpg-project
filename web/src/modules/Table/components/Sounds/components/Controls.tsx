import React from "react"

export const Controls = ({
  audioElementRef,
  setIsPlaying,
  isPlaying,
  volume,
  setVolume,
  mute,
  setMute,
}: ControlsProps) => {
  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      audioElementRef.current?.pause()
    } else {
      setIsPlaying(true)
      audioElementRef.current?.play()
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    if (audioElementRef) {
      audioElementRef.current.volume = volume / 100
    }
  }

  const rendersVolumeIcon = () => {
    return mute ? (
      <span className="cursor-pointer bg-gray-600/10 border border-border shadow-black/50 shadow-sm rounded-full p-1 flex items-center justify-center w-[32px] h-[32px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 256 256"
        >
          <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V175.09l42.08,46.29a8,8,0,1,0,11.84-10.76ZM32,96H72v64H32ZM144,207.64,88,164.09V95.89l56,61.6Zm42-63.77a24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.57,40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.59Zm-80.16-76a8,8,0,0,1,1.4-11.23l39.85-31A8,8,0,0,1,160,32v74.83a8,8,0,0,1-16,0V48.36l-26.94,21A8,8,0,0,1,105.84,67.91ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"></path>
        </svg>
      </span>
    ) : volume <= 50 ? (
      <span className="cursor-pointer bg-gray-600/10 border border-border shadow-black/50 shadow-sm rounded-full p-1 flex items-center justify-center w-[32px] h-[32px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 256 256"
        >
          <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55ZM208,128a39.93,39.93,0,0,1-10,26.46,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.58A40,40,0,0,1,208,128Z"></path>
        </svg>
      </span>
    ) : (
      <span className="cursor-pointer bg-gray-600/10 border border-border shadow-black/50 shadow-sm rounded-full p-1 flex items-center justify-center w-[32px] h-[32px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 256 256"
        >
          <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"></path>
        </svg>
      </span>
    )
  }

  const rangeSliderInputProps = {
    type: "range",
    min: "0",
    max: "100",
    value: volume,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleVolume(e),
    className: " rangeSlider cursor-pointer ",
  }

  return (
    <div className="flex flex-row items-center justify-between w-full mt-2">
      <div className="flex items-center justify-center -ml-1">
        {isPlaying ? (
          <span onClick={handlePlay} className="bg-gray-600/10 cursor-pointer border border-border shadow-black/50 shadow-sm rounded-full p-1 flex items-center justify-center w-[32px] h-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="white"
              viewBox="0 0 256 256"
            >
              <path d="M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z"></path>
            </svg>
          </span>
        ) : (
          <span onClick={handlePlay} className="bg-gray-600/10 cursor-pointer border border-border shadow-black/50 shadow-sm rounded-full p-1 flex items-center justify-center w-[32px] h-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="white"
              viewBox="0 0 256 256"
            >
              <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
            </svg>
          </span>
        )}
      </div>
      <div className="min-w-[100px] max-w-[100px] mt-0">
        <div className="w-full text-2xl flex items-center justify-center gap-x-2">
          <div onClick={() => setMute(!mute)}>{rendersVolumeIcon()}</div>
          <input {...rangeSliderInputProps} />
        </div>
      </div>
    </div>
  )
}

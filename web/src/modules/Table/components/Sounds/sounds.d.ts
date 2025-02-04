interface Sound {
  id: string
  artist: string
  music: string
  url: string
  cover: string
}

interface CurrentSound extends Sound {
  progress?: number
  currentTime?: number
  duration?: number
}

interface ProgressBarProps {
  currentSound: CurrentSound
  setCurrentSound: React.Dispatch<React.SetStateAction<CurrentSound>>
  progressBarElementRef: any
  audioElementRef: any
  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

interface ControlsProps {
  currentSound: CurrentSound
  setProgress: React.Dispatch<React.SetStateAction<number>>
  audioElementRef: any
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  isPlaying: boolean
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
  mute: boolean
  setMute: React.Dispatch<React.SetStateAction<boolean>>
}
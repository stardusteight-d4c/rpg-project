interface Sound {
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

interface PlayerProps {
  sounds: Sound[]
  setSounds: React.Dispatch<React.SetStateAction<Music[]>>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  currentSound: CurrentSound
  setCurrentSound: React.Dispatch<React.SetStateAction<CurrentSound | undefined>>
  audioElementRef: any
  mute: boolean
  setMute: React.Dispatch<React.SetStateAction<boolean>>
}

interface ProgressBarProps {
  currentSound: CurrentSound
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
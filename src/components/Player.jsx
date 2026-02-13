import { useState, useCallback } from 'react'
import leftIcon from '../assets/left.svg'
import rightIcon from '../assets/right.svg'
import playIcon from '../assets/play.svg'
import stopIcon from '../assets/stop.svg'

export default function Player() {
  const [playing, setPlaying] = useState(false)

  const togglePlay = useCallback(() => {
    setPlaying((prev) => !prev)
  }, [])

  return (
    <div className="player">
      <div className="player-left">
        <img src={leftIcon} alt="Left" className="player-icon" />
        <img
          src={playing ? stopIcon : playIcon}
          alt={playing ? 'Stop' : 'Play'}
          className="play-btn"
          onClick={togglePlay}
        />
      </div>
      <div className="player-right">
        <img src={rightIcon} alt="Right" className="player-icon" />
      </div>
    </div>
  )
}

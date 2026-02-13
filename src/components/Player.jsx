import { useState, useCallback, useRef } from 'react'
import leftIcon from '../assets/left.svg'
import rightBg from '../assets/right.svg'
import playIcon from '../assets/play.svg'
import stopIcon from '../assets/stop.svg'

import track1 from '../music/1.mp3'
import track2 from '../music/2.mp3'
import track3 from '../music/3.mp3'

const tracks = [
  { id: 1, title: 'ПОХУЙ', src: track1 },
  { id: 2, title: 'АССОРТИ', src: track2 },
  { id: 3, title: 'ТЫ И Я', src: track3 },
  { id: 4, title: 'КАЙФУЛИ', src: null },
  { id: 5, title: 'ЛЕТО', src: null },
  { id: 6, title: 'ГРУСТЬ', src: null },
  { id: 7, title: 'ВЕЧЕР', src: null },
  { id: 8, title: 'ФИНАЛ', src: null },
]

export default function Player() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const playTrack = useCallback((track) => {
    if (!track.src) return

    if (audioRef.current) {
      audioRef.current.pause()
    }

    if (currentTrack === track.id && playing) {
      setPlaying(false)
      setCurrentTrack(null)
      return
    }

    const audio = new Audio(track.src)
    audioRef.current = audio
    audio.play()
    audio.onended = () => {
      setPlaying(false)
      setCurrentTrack(null)
    }
    setCurrentTrack(track.id)
    setPlaying(true)
  }, [currentTrack, playing])

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }, [playing, currentTrack])

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
      <div
        className="player-right"
        style={{ backgroundImage: `url(${rightBg})` }}
      >
        <ul className="track-list">
          {tracks.map((track) => (
            <li
              key={track.id}
              className={`track-item ${currentTrack === track.id ? 'active' : ''} ${!track.src ? 'disabled' : ''}`}
              onClick={() => playTrack(track)}
            >
              <span className="track-number">{track.id}.</span>
              <span className="track-title">{track.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

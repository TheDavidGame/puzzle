import { useState, useCallback } from 'react'
import Puzzle from './components/Puzzle'
import Player from './components/Player'
import puzzleImage from './assets/ishod.png'
import backgroundVideo from './video/backgroundvideo.mp4'
import './App.css'

function App() {
  const [won, setWon] = useState(false)

  const handleWin = useCallback(() => {
    setWon(true)
  }, [])

  return (
    <div className="app">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {!won ? (
        <>
        <p className="subtitle">Собери обложку из кусочков</p>
        <Puzzle imageUrl={puzzleImage} gridSize={4} onWin={handleWin} />
        </>
      ) : (
         <>
        <p className="subtitle">Нажми на трек</p>
        <Player />
        </>
      )}
    </div>
  )
}

export default App
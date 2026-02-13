import { useState, useCallback } from 'react'
import Puzzle from './components/Puzzle'
import Player from './components/Player'
import puzzleImage from './assets/ishod.png'
import './App.css'

function App() {
  const [won, setWon] = useState(false)

  const handleWin = useCallback(() => {
    setWon(true)
  }, [])

  return (
    <div className="app">
      <p className="subtitle">Собери картинку из кусочков</p>
      {!won ? (
        <Puzzle imageUrl={puzzleImage} gridSize={4} onWin={handleWin} />
      ) : (
        <Player />
      )}
    </div>
  )
}

export default App

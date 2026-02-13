import Puzzle from './components/Puzzle'
import puzzleImage from './assets/ishod.png'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Puzzle Game</h1>
      <p className="subtitle">Собери картинку из кусочков</p>
      <Puzzle imageUrl={puzzleImage} gridSize={4} />
    </div>
  )
}

export default App

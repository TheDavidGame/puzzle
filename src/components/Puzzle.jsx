import { useState, useEffect, useCallback } from 'react'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function isSolvable(tiles, gridSize) {
  let inversions = 0
  const filtered = tiles.filter((t) => t !== null)
  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      if (filtered[i] > filtered[j]) inversions++
    }
  }
  const emptyRow = Math.floor(tiles.indexOf(null) / gridSize)
  const emptyFromBottom = gridSize - emptyRow
  if (gridSize % 2 === 1) {
    return inversions % 2 === 0
  }
  return (inversions + emptyFromBottom) % 2 === 0
}

function isWon(tiles) {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i) return false
  }
  return tiles[tiles.length - 1] === null
}

function createSolvablePuzzle(gridSize) {
  const total = gridSize * gridSize
  let tiles
  do {
    const nums = Array.from({ length: total - 1 }, (_, i) => i)
    tiles = [...shuffleArray(nums), null]
  } while (!isSolvable(tiles, gridSize) || isWon(tiles))
  return tiles
}

export default function Puzzle({ imageUrl, gridSize, onWin }) {
  const [tiles, setTiles] = useState(() => createSolvablePuzzle(gridSize))
  const [imageSize, setImageSize] = useState(480)

  useEffect(() => {
    const updateSize = () => {
      const maxSize = Math.min(window.innerWidth - 40, 560)
      setImageSize(Math.max(300, maxSize))
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const tileSize = imageSize / gridSize

  const getNeighbors = useCallback(
    (index) => {
      const row = Math.floor(index / gridSize)
      const col = index % gridSize
      const neighbors = []
      if (row > 0) neighbors.push(index - gridSize)
      if (row < gridSize - 1) neighbors.push(index + gridSize)
      if (col > 0) neighbors.push(index - 1)
      if (col < gridSize - 1) neighbors.push(index + 1)
      return neighbors
    },
    [gridSize]
  )

  const handleTileClick = useCallback(
    (index) => {
      if (tiles[index] === null) return

      const emptyIndex = tiles.indexOf(null)
      const neighbors = getNeighbors(index)
      if (!neighbors.includes(emptyIndex)) return

      const newTiles = [...tiles]
      ;[newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]]
      setTiles(newTiles)

      if (isWon(newTiles)) {
        onWin()
      }
    },
    [tiles, getNeighbors, onWin]
  )

  const handleShuffle = useCallback(() => {
    setTiles(createSolvablePuzzle(gridSize))
  }, [gridSize])

  const handleSolve = useCallback(() => {
    onWin()
  }, [onWin])

  return (
    <div className="puzzle-container">
      <div className="puzzle-controls">
        <button onClick={handleShuffle}>Перемешать</button>
      </div>

      <div
        className="puzzle-board"
        style={{
          width: imageSize,
          height: imageSize,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {tiles.map((tile, index) => {
          if (tile === null) {
            return <div key="empty" className="puzzle-tile empty" style={{ width: tileSize, height: tileSize }} />
          }
          const origRow = Math.floor(tile / gridSize)
          const origCol = tile % gridSize
          return (
            <div
              key={tile}
              className="puzzle-tile"
              onClick={() => handleTileClick(index)}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: `${imageSize}px ${imageSize}px`,
                backgroundPosition: `-${origCol * tileSize}px -${origRow * tileSize}px`,
                width: tileSize,
                height: tileSize,
              }}
            />
          )
        })}
      </div>

      <div className="puzzle-controls">
        <button className="solve-btn" onClick={handleSolve}>
          Решить
        </button>
      </div>
    </div>
  )
}

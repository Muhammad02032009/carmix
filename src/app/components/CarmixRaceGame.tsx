'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export function CarmixRaceGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [carPosition, setCarPosition] = useState({ top: 55, left: 40 })
  const [obstaclePosition, setObstaclePosition] = useState({ top: 50, right: 0 })
  const [score, setScore] = useState(0)

  const gameRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLImageElement>(null)
  const obstacleRef = useRef<HTMLImageElement>(null)

  const roadSpeed = useRef(3)
  const obstacleSpeed = useRef(3)

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const gameLoop = setInterval(() => {
        moveRoad()
        moveObstacle()
        checkCollision()
        setScore(prevScore => prevScore + 1)
      }, 50)

      return () => clearInterval(gameLoop)
    }
  }, [gameStarted, gameOver])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStarted && !gameOver) {
        switch (e.key) {
          case 'ArrowUp':
            moveCar('up')
            break
          case 'ArrowDown':
            moveCar('down')
            break
          case ' ':
            moveCar('boost')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameStarted, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    roadSpeed.current = 3
    obstacleSpeed.current = 3
    setCarPosition({ top: 55, left: 40 })
    setObstaclePosition({ top: 50, right: 0 })
  }

  const moveRoad = () => {
    if (gameRef.current) {
      const currentPosition = parseInt(gameRef.current.style.backgroundPositionX || '0')
      gameRef.current.style.backgroundPositionX = `${currentPosition - roadSpeed.current}px`
    }
  }

  const moveObstacle = () => {
    setObstaclePosition(prev => {
      if (prev.right > window.innerWidth) {
        return { top: Math.random() * 250, right: 0 }
      }
      return { ...prev, right: prev.right + obstacleSpeed.current }
    })
  }

  const moveCar = (direction: 'up' | 'down' | 'boost') => {
    setCarPosition(prev => {
      let newTop = prev.top
      switch (direction) {
        case 'up':
          newTop = Math.max(0, prev.top - 50)
          break
        case 'down':
          newTop = Math.min(250, prev.top + 50)
          break
        case 'boost':
          newTop = Math.max(0, prev.top - 100)
          break
      }
      return { ...prev, top: newTop }
    })
  }

  const checkCollision = () => {
    if (carRef.current && obstacleRef.current) {
      const carRect = carRef.current.getBoundingClientRect()
      const obstacleRect = obstacleRef.current.getBoundingClientRect()

      if (
        carRect.right > obstacleRect.left &&
        carRect.left < obstacleRect.right &&
        carRect.bottom > obstacleRect.top &&
        carRect.top < obstacleRect.bottom
      ) {
        setGameOver(true)
      }
    }
  }

  return (
    <div className="relative w-full h-[600px] bg-gray-800 overflow-hidden">
      <div
        ref={gameRef}
        className="absolute inset-0 bg-repeat-x"
        style={{
          backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAJCAYAAACE6PNcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyM0FFRkFEQjE4MjExMUVBQjA4Q0ZEMkVEREM1QTAzMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyM0FFRkFEQzE4MjExMUVBQjA4Q0ZEMkVEREM1QTAzMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIzQUVGQUQ5MTgyMTExRUFCMDhDRkQyRUREQzVBMDMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIzQUVGQURBMTgyMTExRUFCMDhDRkQyRUREQzVBMDMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0NW9TAAAADZJREFUeNrs00ENADAIALEx/54BEXwIrYRLLrI9rggJdvsSgGEBw4JhAcMChgXDAoYFRpUAAwDIdAQP9XbGwQAAAABJRU5ErkJggg==')",
          backgroundPositionY: 'bottom',
        }}
      >
        <motion.img
          ref={carRef}
          src="/placeholder.svg?height=70&width=140&text=Car"
          alt="Car"
          className="absolute w-[140px] h-[70px]"
          style={{ top: carPosition.top, left: carPosition.left }}
          animatestyle={{ top: carPosition.top, left: carPosition.left }}
          animate={{ top: carPosition.top }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.img
          ref={obstacleRef}
          src="/placeholder.svg?height=50&width=50&text=Obstacle"
          alt="Obstacle"
          className="absolute w-[50px] h-[50px]"
          style={{ top: obstaclePosition.top, right: obstaclePosition.right }}
        />
      </div>
      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Button onClick={startGame} className="text-2xl px-8 py-4">
            Start Game
          </Button>
        </div>
      )}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h2 className="text-4xl font-bold text-white mb-4">Game Over</h2>
          <p className="text-2xl text-white mb-8">Your score: {score}</p>
          <Button onClick={startGame} className="text-2xl px-8 py-4">
            Play Again
          </Button>
        </div>
      )}
      <div className="absolute top-4 left-4 text-white text-2xl font-bold">
        Score: {score}
      </div>
      <div className="absolute bottom-4 left-4 text-white text-lg">
        Controls: ↑ (Up), ↓ (Down), Space (Boost)
      </div>
    </div>
  )
}


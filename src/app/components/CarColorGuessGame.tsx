'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export function CarColorGuessGame() {
  const [carColor, setCarColor] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [guess, setGuess] = useState('')

  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Silver', 'Orange']

  useEffect(() => {
    newRound()
  }, [])

  const newRound = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setCarColor(randomColor)
    setIsRevealed(false)
    setGuess('')
  }

  const handleGuess = (color: string) => {
    setGuess(color)
    setIsRevealed(true)
    if (color.toLowerCase() === carColor.toLowerCase()) {
      setScore(score + 1)
    }
  }

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Guess the Car Color!</h3>
        <p className="text-xl">Score: {score}</p>
      </div>
      <div className="mb-8">
        <div 
          className={`w-full h-64 rounded-lg transition-all duration-500 flex items-center justify-center ${isRevealed ? `bg-${carColor.toLowerCase()}-500` : 'bg-gray-300'}`}
        >
          {isRevealed ? (
            <p className="text-4xl font-bold text-white">{carColor}</p>
          ) : (
            <p className="text-4xl font-bold">?</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {colors.map((color) => (
          <Button
            key={color}
            onClick={() => handleGuess(color)}
            disabled={isRevealed}
            className={`bg-${color.toLowerCase()}-500 hover:bg-${color.toLowerCase()}-600 text-white`}
          >
            {color}
          </Button>
        ))}
      </div>
      {isRevealed && (
        <div className="mt-8 text-center">
          <p className="text-2xl mb-4">
            {guess.toLowerCase() === carColor.toLowerCase() ? 'Correct!' : 'Wrong!'}
          </p>
          <Button onClick={newRound} className="bg-purple-600 hover:bg-purple-700 text-white">
            Next Round
          </Button>
        </div>
      )}
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const quizQuestions = [
  {
    question: "Which car manufacturer produces the 911 model?",
    options: ["Ferrari", "Porsche", "Lamborghini", "Aston Martin"],
    correctAnswer: "Porsche"
  },
  {
    question: "What does 'BMW' stand for?",
    options: ["British Motor Works", "Bavarian Motor Works", "Berlin Motor Works", "Belgian Motor Works"],
    correctAnswer: "Bavarian Motor Works"
  },
  {
    question: "Which country is the Volvo car brand from?",
    options: ["Germany", "Italy", "Sweden", "France"],
    correctAnswer: "Sweden"
  },
  {
    question: "What is the best-selling car model of all time?",
    options: ["Ford F-Series", "Volkswagen Golf", "Toyota Corolla", "Honda Civic"],
    correctAnswer: "Toyota Corolla"
  },
  {
    question: "Which car company uses the slogan 'The Ultimate Driving Machine'?",
    options: ["Mercedes-Benz", "Audi", "BMW", "Lexus"],
    correctAnswer: "BMW"
  }
]

export function CarQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (selectedAnswer: string) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
  }

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-2xl mb-8">You scored {score} out of {quizQuestions.length}</p>
          <Button onClick={restartQuiz} className="bg-blue-600 hover:bg-blue-700 text-white">
            Restart Quiz
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}/{quizQuestions.length}</h2>
          <p className="text-xl mb-6">{quizQuestions[currentQuestion].question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg text-lg"
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}


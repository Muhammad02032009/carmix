"use client"
import { useState } from 'react';
import { Car, CheckCircle, XCircle } from 'lucide-react';
import { quizQuestions } from '@/shared/contents/carQuestions/carQuestions';


export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === question.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) return;

    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFinishQuiz = () => {
    alert(`Your final score is: ${score}/${quizQuestions.length}`);
    // Resetting quiz state
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center py-8">
      <div className="max-w-3xl w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 flex items-center justify-center space-x-2">
            <Car size={36} /> 
            <span>Car Quiz</span>
          </h1>
          <p className="text-lg text-gray-300 mt-2">Test your knowledge about cars!</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="text-2xl mb-4">{question.question}</div>

          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                className={`w-full py-3 px-6 text-lg font-medium rounded-lg focus:outline-none transition duration-300 
                  ${isAnswered 
                    ? option === question.answer
                      ? "bg-green-500 text-white"
                      : selectedOption === option
                      ? "bg-red-500 text-white"
                      : "bg-gray-700"
                    : "bg-gray-700 hover:bg-gray-600"} 
                `}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            {isAnswered ? (
              <>
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircle size={20} />
                  <span>Correct Answer!</span>
                </div>
                <div className="flex items-center space-x-2 text-red-500">
                  <XCircle size={20} />
                  <span>Wrong Answer!</span>
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full"
              onClick={isLastQuestion ? handleFinishQuiz : handleNextQuestion}
              disabled={!isAnswered}
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-300">
          <p className="text-lg">Your Score: {score}/{quizQuestions.length}</p>
        </div>
      </div>
    </div>
  );
}

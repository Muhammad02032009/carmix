"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Film,
  History,
  Lightbulb,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { carHistories } from "@/shared/contents/carHistories/carHistories";
import { carJokes } from "@/shared/contents/carJokes/carJokes";
import { carMovies } from "@/shared/contents/carMovies/carMovies";
import { quizQuestions } from "@/shared/contents/carQuestions/carQuestions";
import { engineSounds } from "@/shared/contents/engineSounds/engineSounds";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CarJokesSection />
      <CarHistoriesSection />
      <CarQuizSection />
      <EngineSoundSection />
      <CarMoviesSection />
      <VoicesSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Image
        src="/bgImage.webp"
        alt="Luxury car on a scenic road"
        layout="fill"
        objectFit="cover"
        className="absolute z-0 opacity-[90%]"
        priority
      />
      <div className="relative z-10 text-center text-white text-shadow-lg">
        <motion.h1
          className="text-7xl font-extrabold mb-4 text-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Carmix
        </motion.h1>
        <motion.p
          className="text-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Where Automotive Dreams Meet Reality
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/cars"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center text-xl"
          >
            All cars <ArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="text-white w-12 h-12" />
      </motion.div>
    </section>
  );
}

function CarJokesSection() {
  const [currentJoke, setCurrentJoke] = useState(0);

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-50">
          Car Humor Pit Stop
        </h2>
        <motion.div
          className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-2xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-50 italic">
            &ldquo;{carJokes[currentJoke]}&rdquo;
          </p>
          <button
            onClick={() => setCurrentJoke((currentJoke + 1) % carJokes.length)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out inline-flex items-center"
          >
            <Lightbulb className="mr-2" /> Next Joke
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function CarHistoriesSection() {
  return (
    <section className="py-20">
      <div className="container  mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-12">
          Automotive Time Machine
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>
          {carHistories.slice(0, 3).map((history, index) => (
            <motion.div
              key={index}
              className={`relative mb-8 ${
                index % 2 === 0
                  ? "text-left pr-8 md:ml-auto md:pl-8 md:pr-0"
                  : "pl-8 md:mr-auto md:pr-8 md:pl-0"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-blue-700 p-6 rounded-lg shadow-xl inline-block">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {history.company}
                </h3>
                <p className="text-white">{history.fact}</p>
              </div>
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                  index % 2 === 0 ? "left-0 md:-left-4" : "right-0 md:-right-4"
                } w-8 h-8 bg-blue-500 rounded-full `}
              ></div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/history"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg"
          >
            <History className="mr-2" /> Dive Deeper into Car History
          </Link>
        </div>
      </div>
    </section>
  );
}
function CarQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedAnswer: string) => {
    if (selectedAnswer === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < 5) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center dark:text-gray-50 mb-12">
          Rev Up Your Knowledge
        </h2>
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 dark:text-gray-50">Car Enthusiast Quiz</h3>
          <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-50 p-8 rounded-lg shadow-2xl">
            {showScore ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-2xl mb-8">
                  You scored {score} out of {quizQuestions.slice(0, 5).length}
                </p>
                <Button
                  onClick={restartQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Restart Quiz
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Question {currentQuestion + 1}/5
                </h2>
                <p className="text-xl mb-6">
                  {quizQuestions[currentQuestion].question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-950 dark:text-gray-50 py-3 px-6 rounded-lg text-lg"
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/quiz"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">🚗</span>More Questions About Cars
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


function EngineSoundSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSound, setCurrentSound] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeSound = (index: number) => {
    setCurrentSound(index);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  return (
    <section className=" text-gray-800 p-8 rounded-lg shadow-2xl">
      <h3 className="text-3xl font-bold mb-6 text-center dark:text-gray-50">
        Experience the Roar
      </h3>
      <audio ref={audioRef} src={engineSounds[currentSound].src} loop />
      <div className="flex justify-center mb-8 ">
        <Button
          onClick={togglePlay}
          className="text-2xl px-8 py-4 flex items-center dark:text-gray-50 dark:bg-gray-900"
        >
          {isPlaying ? (
            <VolumeX className="mr-2" />
          ) : (
            <Volume2 className="mr-2" />
          )}
          {isPlaying ? "Stop" : "Play"} {engineSounds[currentSound].name}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {engineSounds.map((sound, index) => (
          <Button
            key={index}
            onClick={() => changeSound(index)}
            className={`py-3 px-6 rounded-lg text-lg hover:text-white dark:text-gray-50 dark:bg-gray-900 ${
              currentSound === index
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {sound.name}
          </Button>
        ))}
      </div>
    </section>
  );
}

function CarMoviesSection() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-50">
          Cinematic Pit Stop
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-50" >
          Fuel your passion with these car-centric cinematic masterpieces
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {carMovies.slice(0,3).map((movie, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 rounded-lg shadow-xl overflow-hidden dark:text-gray-50 dark:bg-gray-900"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                width={200}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-gray-50">{movie.title}</h3>
                <p className="text-gray-600 mb-4 dark:text-gray-50">{movie.year}</p>
                <p className="text-gray-700 dark:text-gray-50">{movie.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/car-movies"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg"
          >
            <Film className="mr-2" /> Explore More Car Flicks
          </Link>
        </div>
      </div>
    </section>
  );
}

function VoicesSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-12">
          Voices from the Fast Lane
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="flex items-center mb-6">
                <Image
                  src={`/about.webp`}
                  alt={`Speed Enthusiast ${i}`}
                  width={80}
                  height={80}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-xl">Speed Demon {i}</h3>
                  <p className="text-yellow-300">Carmix Adrenaline Junkie</p>
                </div>
              </div>
              <p className="text-lg italic">
                "Carmix doesn't just sell cars; they sell tickets to another
                dimension of driving. My life has been divided into two eras: BC
                (Before Carmix) and AD (Absolutely Delightful)!"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

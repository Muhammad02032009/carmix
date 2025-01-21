'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Film, History, Lightbulb, Car, PenToolIcon as Tool, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { CarColorGuessGame } from "./components/CarColorGuessGame";
import { CarmixRaceGame } from "./components/CarmixRaceGame";
import { CarQuiz } from "./components/CarQuiz";
import { EngineSound } from "./components/EngineSound";

export default function Home() {
  const [currentJoke, setCurrentJoke] = useState(0);
  const carJokes = [
    "Why did the car get a job? It wanted to make some *exhausting* money!",
    "Why don't cars ever get lost? They always follow the *GPS of life*!",
    "What do you call a car that can sing? A *Cartist*!",
    "Why do race cars make terrible comedians? Because they always *speed through the punchline*!",
    "What kind of cars do sheep drive? *Lamb-orghinis*.",
    "Why did the mechanic break up with their car? It was too *high-maintenance*!",
    "How do electric cars show affection? They give each other a *spark*!",
    "Why do Teslas never laugh at jokes? They don’t have a *sense of humor… only sensors*.",
    "What’s a car’s favorite genre of music? *Car-tunes*.",
    "Why did the car start meditating? To find its *inner drive*!",
    "What do you call a car that’s always lying? A *Jeep-skate*!",
    "Why did the minivan refuse to fight? It didn’t want to start a *van-detta*!",
    "What’s a car’s favorite social media platform? *Insta-gramps*, for those older models!",
    "Why did the car stop in the middle of the road? It had a *brake-down*!",
    "What’s a convertible’s favorite movie? *Top Gun*!",
    "Why did the car join a band? It wanted to *drum up* some attention!",
    "What’s a tow truck’s favorite meal? *Pull pork*!",
    "Why was the car embarrassed? It couldn’t stop *rear-ending* into trouble!",
    "Why don’t cars like playing hide and seek? Because they’re always *spotted* in the parking lot!",
    "What do cars do at a party? They *rev* up the dance floor!"
  ];
  
  const carHistories = [
    {
      company: "Ferrari",
      fact: "Founded in 1939 by Enzo Ferrari, the company built its first car in 1940. However, it wasn't until 1947 that Ferrari began producing vehicles for public sale. Known for their luxury and speed, Ferraris are synonymous with Italian craftsmanship and racing heritage.",
    },
    {
      company: "Toyota",
      fact: "Toyota started as a loom manufacturing company under the name Toyoda Automatic Loom Works. In 1936, they shifted gears to automobiles, introducing the Model AA, their first passenger car. Today, Toyota is a global leader in innovation and hybrid technology.",
    },
    {
      company: "Tesla",
      fact: "Tesla, named after inventor Nikola Tesla, was founded in 2003 by Martin Eberhard and Marc Tarpenning. The company revolutionized the electric vehicle market with its focus on high-performance EVs, sustainable energy solutions, and cutting-edge technology. Elon Musk joined shortly after and played a pivotal role in scaling the brand.",
    },
    {
      company: "Ford",
      fact: "Founded in 1903 by Henry Ford, this company introduced the Model T in 1908, which was the first mass-produced car affordable to the middle class. Ford's assembly line innovation transformed global manufacturing and popularized the automobile worldwide.",
    },
    {
      company: "BMW",
      fact: "Bayerische Motoren Werke (BMW) was founded in 1916 in Germany. Initially, the company manufactured aircraft engines, then motorcycles, and eventually cars. Known for their performance and engineering excellence, BMWs are a benchmark of German automotive luxury.",
    },
    {
      company: "Mercedes-Benz",
      fact: "Mercedes-Benz traces its roots back to Karl Benz's invention of the first gasoline-powered car, the Benz Patent-Motorwagen, in 1886. Officially founded in 1926, Mercedes-Benz is a pioneer in luxury, safety, and performance vehicles.",
    },
    {
      company: "Volkswagen",
      fact: "Volkswagen, meaning 'People's Car' in German, was established in 1937. The iconic Volkswagen Beetle became one of the best-selling cars of all time and symbolized affordable and reliable mobility worldwide.",
    },
    {
      company: "Porsche",
      fact: "Founded in 1931 by Ferdinand Porsche, this German brand initially offered engineering services. Porsche's first car, the 356, was introduced in 1948. Known for their precision engineering, Porsches are revered in both racing and luxury markets.",
    },
    {
      company: "Honda",
      fact: "Honda began as a motorcycle manufacturer in 1948, with its first car, the T360 mini truck, debuting in 1963. The company is celebrated for its fuel-efficient vehicles and technological advancements in both cars and motorcycles.",
    },
    {
      company: "Chevrolet",
      fact: "Founded in 1911 by Louis Chevrolet and William C. Durant, Chevrolet became a cornerstone of General Motors. Known for producing iconic vehicles like the Corvette and Camaro, Chevrolet combines innovation with American tradition.",
    },
    {
      company: "Lamborghini",
      fact: "Founded by Ferruccio Lamborghini in 1963, Lamborghini was born out of a rivalry with Enzo Ferrari. Specializing in high-performance, exotic sports cars, the brand is synonymous with power and cutting-edge design.",
    },
    {
      company: "Audi",
      fact: "Audi’s history dates back to 1909 when August Horch founded the company. Known for its slogan 'Vorsprung durch Technik' (Advancement through Technology), Audi produces luxurious and technologically advanced vehicles.",
    },
    {
      company: "Nissan",
      fact: "Nissan, founded in 1933, is a Japanese automaker known for its diverse range of vehicles. It introduced the Datsun brand and revolutionized the electric vehicle market with the Nissan Leaf, one of the world’s best-selling EVs.",
    },
    {
      company: "Rolls-Royce",
      fact: "Rolls-Royce was established in 1906 by Charles Rolls and Henry Royce. Renowned for their opulent designs and unmatched attention to detail, Rolls-Royce vehicles represent the pinnacle of automotive luxury.",
    },
    {
      company: "Bugatti",
      fact: "Founded in 1909 by Ettore Bugatti, the brand became known for its elegance, speed, and exclusivity. Bugatti's modern legacy includes hypercars like the Veyron and Chiron, which redefine automotive performance.",
    },
    {
      company: "Hyundai",
      fact: "Hyundai, founded in 1967, is a South Korean automaker known for its reliable and affordable vehicles. With a focus on innovation, Hyundai has expanded into electric and hydrogen-powered vehicles.",
    },
    {
      company: "Kia",
      fact: "Kia, established in 1944 as a bicycle parts manufacturer, produced its first car in 1974. Today, Kia is a global brand recognized for its design-driven, affordable, and reliable vehicles.",
    },
  ];
  

  const carMovies = [
    { 
      title: "Ford v Ferrari", 
      year: 2019, 
      image: "/placeholder.svg?height=300&width=200&text=Ford+v+Ferrari", 
      description: "The story of the battle between Ford and Ferrari to win Le Mans in 1966, showcasing innovation, speed, and determination." 
    },
    { 
      title: "Mad Max: Fury Road", 
      year: 2015, 
      image: "/placeholder.svg?height=300&width=200&text=Mad+Max", 
      description: "A high-octane, post-apocalyptic chase through the desert featuring custom cars, chaos, and incredible stunts." 
    },
    { 
      title: "The Fast and the Furious", 
      year: 2001, 
      image: "/placeholder.svg?height=300&width=200&text=Fast+and+Furious", 
      description: "The start of the epic franchise that blends illegal street racing, heists, and family bonds." 
    },
    { 
      title: "Gone in 60 Seconds", 
      year: 2000, 
      image: "/placeholder.svg?height=300&width=200&text=Gone+in+60+Seconds", 
      description: "A retired car thief must steal 50 cars in one night to save his brother, featuring the iconic 'Eleanor' Mustang." 
    },
    { 
      title: "Baby Driver", 
      year: 2017, 
      image: "/placeholder.svg?height=300&width=200&text=Baby+Driver", 
      description: "A getaway driver with a love for music gets caught in a heist gone wrong, featuring thrilling car chases." 
    },
    { 
      title: "Drive", 
      year: 2011, 
      image: "/placeholder.svg?height=300&width=200&text=Drive", 
      description: "A mysterious driver, moonlighting as a stuntman and getaway driver, navigates a dangerous criminal underworld." 
    },
    { 
      title: "Death Race", 
      year: 2008, 
      image: "/placeholder.svg?height=300&width=200&text=Death+Race", 
      description: "Prisoners compete in a deadly car race for their freedom in this action-packed thriller." 
    },
    { 
      title: "Rush", 
      year: 2013, 
      image: "/placeholder.svg?height=300&width=200&text=Rush", 
      description: "A biographical drama chronicling the fierce rivalry between Formula 1 drivers James Hunt and Niki Lauda in the 1970s." 
    },
    { 
      title: "Need for Speed", 
      year: 2014, 
      image: "/placeholder.svg?height=300&width=200&text=Need+for+Speed", 
      description: "Based on the popular video game, this film follows a street racer seeking revenge in a high-stakes cross-country race." 
    },
    { 
      title: "Cars", 
      year: 2006, 
      image: "/placeholder.svg?height=300&width=200&text=Cars", 
      description: "A Pixar animated film about Lightning McQueen, a race car who learns life lessons in a small town." 
    },
    { 
      title: "Le Mans", 
      year: 1971, 
      image: "/placeholder.svg?height=300&width=200&text=Le+Mans", 
      description: "Steve McQueen stars in this classic that captures the essence of the iconic 24-hour race at Le Mans." 
    },
    { 
      title: "The Italian Job", 
      year: 1969, 
      image: "/placeholder.svg?height=300&width=200&text=Italian+Job", 
      description: "A classic heist movie featuring Mini Coopers in a thrilling escape through the streets of Turin." 
    },
    { 
      title: "The Cannonball Run", 
      year: 1981, 
      image: "/placeholder.svg?height=300&width=200&text=Cannonball+Run", 
      description: "A star-studded comedy about an illegal cross-country race, featuring outrageous cars and zany drivers." 
    },
    { 
      title: "Christine", 
      year: 1983, 
      image: "/placeholder.svg?height=300&width=200&text=Christine", 
      description: "A supernatural thriller about a 1958 Plymouth Fury with a deadly mind of its own." 
    },
    { 
      title: "Two-Lane Blacktop", 
      year: 1971, 
      image: "/placeholder.svg?height=300&width=200&text=Two+Lane+Blacktop", 
      description: "An existential road movie following two drag racers and their journey across America in a 1955 Chevy." 
    },
  ];
  
  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
            <Link href="#explore" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center text-xl">
              Rev Your Engines <ArrowRight className="ml-2" />
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

  

      {/* Car Joke Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Car Humor Pit Stop</h2>
          <motion.div 
            className="bg-gray-100 p-8 rounded-lg shadow-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-6 text-gray-700 italic">&ldquo;{carJokes[currentJoke]}&rdquo;</p>
            <button 
              onClick={() => setCurrentJoke((currentJoke + 1) % carJokes.length)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out inline-flex items-center"
            >
              <Lightbulb className="mr-2" /> Next Joke
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 px-4 md:px-0 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-800">Our Stellar Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=Stellar+Car${i}`}
                  alt={`Featured Car ${i}`}
                  width={600}
                  height={400}
                  className="w-full rounded-t-lg"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Galactic Cruiser {i}</h3>
                  <p className="text-gray-600 mb-6">Embark on an interstellar journey with our cutting-edge vehicle, designed for both earthly roads and cosmic adventures.</p>
                  <Link href={`/cars/${i}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition ease-in-out duration-200 text-lg">
                    Explore This Wonder
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car History Timeline */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-12">Automotive Time Machine</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>
            {carHistories.map((history, index) => (
              <motion.div 
                key={index}
                className={`relative mb-8 ${index % 2 === 0 ? 'text-right pr-8 md:ml-auto md:pl-8 md:pr-0' : 'pl-8 md:mr-auto md:pr-8 md:pl-0'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl inline-block">
                  <h3 className="text-2xl font-bold mb-2">{history.company}</h3>
                  <p className="text-gray-300">{history.fact}</p>
                </div>
                <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'left-0 md:-left-4' : 'right-0 md:-right-4'} w-8 h-8 bg-blue-500 rounded-full border-4 border-gray-900`}></div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/history" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg">
              <History className="mr-2" /> Dive Deeper into Car History
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Games Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-12">Rev Up Your Knowledge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-6">Chromatic Car Challenge</h3>
              <CarColorGuessGame />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Carmix Grand Prix</h3>
              <CarmixRaceGame />
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-3xl font-bold mb-6">Car Enthusiast Quiz</h3>
            <CarQuiz />
          </div>
        </div>
      </section>

      {/* Engine Sound Experience */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-800">Experience the Roar</h2>
          <EngineSound />
        </div>
      </section>

      {/* Car Movie Recommendations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-12 text-gray-800">Cinematic Pit Stop</h2>
          <p className="text-xl text-center mb-12 text-gray-600">Fuel your passion with these car-centric cinematic masterpieces</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {carMovies.map((movie, index) => (
              <motion.div 
                key={index}
                className="bg-gray-100 rounded-lg shadow-xl overflow-hidden"
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
                  <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-4">{movie.year}</p>
                  <p className="text-gray-700">{movie.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/car-movies" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg">
              <Film className="mr-2" /> Explore More Car Flicks
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-12">Voices from the Fast Lane</h2>
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
                    src={`/placeholder.svg?height=80&width=80&text=Speed+Enthusiast${i}`}
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
                <p className="text-lg italic">"Carmix doesn't just sell cars; they sell tickets to another dimension of driving. My life has been divided into two eras: BC (Before Carmix) and AD (Absolutely Delightful)!"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold mb-8">Ready to Rewrite Your Car Story?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Join the Carmix revolution and turn every drive into an epic saga. Your perfect car is not just a dream—it's our next chapter.</p>
          <Link href="/start-journey" className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out inline-block text-xl">
            Begin Your Carmix Adventure
          </Link>
        </div>
      </section>
    </div>
  );
}


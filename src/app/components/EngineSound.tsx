'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from 'lucide-react'

const engineSounds =[
  { name: "V8 Muscle Car", src: "/sounds/v8-muscle.mp3" },
  { name: "Turbo 4-Cylinder", src: "/sounds/turbo-4cyl.mp3" },
  { name: "Electric Supercar", src: "/sounds/electric-supercar.mp3" },
  { name: "Classic Vintage", src: "/sounds/classic-vintage.mp3" },
  { name: "F1 Race Car", src: "/sounds/f1-racecar.mp3" },
  { name: "Diesel Truck", src: "/sounds/diesel-truck.mp3" },
  { name: "Hybrid Sedan", src: "/sounds/hybrid-sedan.mp3" },
  { name: "Rotary Engine", src: "/sounds/rotary-engine.mp3" },
  { name: "V12 Hypercar", src: "/sounds/v12-hypercar.mp3" },
  { name: "Off-Road 4x4", src: "/sounds/offroad-4x4.mp3" },
  { name: "Rally Car", src: "/sounds/rally-car.mp3" },
  { name: "Dragster", src: "/sounds/dragster.mp3" },
  { name: "Jet-Powered Car", src: "/sounds/jet-powered.mp3" },
  { name: "Motorbike Engine", src: "/sounds/motorbike.mp3" },
  { name: "Luxury Sedan", src: "/sounds/luxury-sedan.mp3" }
]


export function EngineSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeSound = (index: number) => {
    setCurrentSound(index)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.load()
    }
  }

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl">
      <h3 className="text-3xl font-bold mb-6 text-center">Experience the Roar</h3>
      <audio ref={audioRef} src={engineSounds[currentSound].src} loop />
      <div className="flex justify-center mb-8">
        <Button onClick={togglePlay} className="text-2xl px-8 py-4 flex items-center">
          {isPlaying ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />}
          {isPlaying ? "Stop" : "Play"} {engineSounds[currentSound].name}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {engineSounds.map((sound, index) => (
          <Button
            key={index}
            onClick={() => changeSound(index)}
            className={`py-3 px-6 rounded-lg text-lg ${
              currentSound === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {sound.name}
          </Button>
        ))}
      </div>
    </div>
  )
}


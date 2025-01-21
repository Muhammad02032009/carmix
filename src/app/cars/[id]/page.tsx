'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Gauge, Zap, Fuel, Scale, Wind, Menu } from 'lucide-react'
import Link from 'next/link'

interface Car {
  id: number
  brand: string
  model: string
  year: number
  type: string
  price: number
  enginePower: number
  fuelEfficiency: number
  image: string
  maxSpeed: number
  acceleration: number
  weight: number
}

export default function CarPage({ params }: { params: { id: string } }) {
  const [car, setCar] = useState<Car | null>(null)

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        const foundCar = data.cars.find((c: Car) => c.id === parseInt(params.id))
        setCar(foundCar)
      })
  }, [params.id])

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  const carFeatures = [
    { icon: Gauge, label: 'Engine Power', value: `${car.enginePower} HP`, description: 'Unleash the power under the hood' },
    { icon: Fuel, label: 'Fuel Efficiency', value: `${car.fuelEfficiency} km/L`, description: 'Eco-friendly performance' },
    { icon: Wind, label: 'Max Speed', value: `${car.maxSpeed} km/h`, description: 'Push the limits of speed' },
    { icon: Zap, label: 'Acceleration', value: `${car.acceleration} s (0-100 km/h)`, description: 'Feel the thrill of quick acceleration' },
    { icon: Scale, label: 'Weight', value: `${car.weight} kg`, description: 'Perfectly balanced for optimal performance' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link href="/cars" className="inline-flex items-center text-red-600 hover:text-red-800 mb-6 transition-colors duration-200">
          <ArrowLeft className="mr-2" /> Back to all cars
        </Link>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <motion.div
              className="lg:flex-shrink-0 w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={car.image || "/placeholder.svg"}
                alt={`${car.brand} ${car.model}`}
                width={600}
                height={400}
                className="w-full h-[300px] lg:h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              className="p-6 lg:p-8 w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="uppercase tracking-wide text-sm text-red-600 font-semibold">{car.brand}</div>
              <h1 className="mt-1 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{car.model}</h1>
              <p className="mt-2 text-gray-600">{car.year} {car.type}</p>
              <p className="mt-4 text-2xl lg:text-3xl font-bold text-red-600">${car.price.toLocaleString()}</p>
              <p className="mt-2 text-gray-600">Experience luxury and performance in one package</p>
              
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {carFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <feature.icon className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{feature.label}</p>
                      <p className="text-lg font-semibold text-gray-700">{feature.value}</p>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Test Drive
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}


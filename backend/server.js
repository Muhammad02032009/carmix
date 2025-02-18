import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const PORT = 7000

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

import dataJson from './data.json' assert { type: 'json' }
let data = dataJson

const saveData = () => {
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf8')
}

// 🔹 Получить всех пользователей
app.get('/users', (req, res) => {
  if (!data.users) {
    return res.status(404).json({ error: 'Users not found' })
  }
  res.json(data.users)
})

// 🔹 Добавить пользователя
app.post('/users', (req, res) => {
  const newUser = req.body
  if (!newUser || !newUser.id || !newUser.name || !newUser.email) {
    return res.status(400).json({ error: 'Invalid user data' })
  }
  data.users.push(newUser)
  saveData()
  res.status(201).json(newUser)
})

// // 🔹 Редактировать пользователя
// app.put('/users/:id', (req, res) => {
//   const userId = req.params.id
//   const updatedUser = req.body
  
//   const userIndex = data.users.findIndex(user => user.id == userId)
//   if (userIndex === -1) {
//     return res.status(404).json({ error: 'User not found' })
//   }
  
//   data.users[userIndex] = { ...data.users[userIndex], ...updatedUser }
//   saveData()
//   res.json(data.users[userIndex])
// })

// // 🔹 Удалить пользователя
// app.delete('/users/:id', (req, res) => {
//   const userId = req.params.id
//   const userIndex = data.users.findIndex(user => user.id == userId)
//   if (userIndex === -1) {
//     return res.status(404).json({ error: 'User not found' })
//   }
  
//   const deletedUser = data.users.splice(userIndex, 1)
//   saveData()
//   res.json(deletedUser)
// })

// 🔹 Получить все машины
app.get('/cars', (req, res) => {
  if (!data.cars) {
    return res.status(404).json({ error: 'Cars not found' })
  }
  res.json(data.cars)
})

// 🔹 Добавить машину
app.post('/cars', (req, res) => {
  const newCar = req.body
  if (!newCar || !newCar.id || !newCar.brand || !newCar.model) {
    return res.status(400).json({ error: 'Invalid car data' })
  }
  data.cars.push(newCar)
  saveData()
  res.status(201).json(newCar)
})

// 🔹 Редактировать машину
app.put('/cars/:id', (req, res) => {
  const carId = req.params.id
  const updatedCar = req.body
  
  const carIndex = data.cars.findIndex(car => car.id == carId)
  if (carIndex === -1) {
    return res.status(404).json({ error: 'Car not found' })
  }
  
  data.cars[carIndex] = { ...data.cars[carIndex], ...updatedCar }
  saveData()
  res.json(data.cars[carIndex])
})

// 🔹 Удалить машину
app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id
  const carIndex = data.cars.findIndex(car => car.id == carId)
  if (carIndex === -1) {
    return res.status(404).json({ error: 'Car not found' })
  }
  
  const deletedCar = data.cars.splice(carIndex, 1)
  saveData()
  res.json(deletedCar)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

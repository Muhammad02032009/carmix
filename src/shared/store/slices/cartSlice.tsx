import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface CarQ {
    id: number
    quantity: number
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
interface CartState {
  cartArray: CarQ[]
}

const initialState: CartState = {
  cartArray: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CarQ>) => {
      const existingCar = state.cartArray.find((car) => car.id === action.payload.id)
      if (existingCar) {
        existingCar.quantity = (existingCar.quantity || 1) + 1
      } else {
        state.cartArray.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartArray = state.cartArray.filter((car) => car.id !== action.payload)
    },
    setCartArray: (state, action: PayloadAction<CarQ[]>) => {
      state.cartArray = action.payload.map((car) => ({
        ...car,
        quantity: car.quantity || 1,
      }))
    },
    clearCart: (state) => {
      state.cartArray = []
    },
  },
})

export const { addToCart, removeFromCart, setCartArray, clearCart } = cartSlice.actions
export default cartSlice.reducer


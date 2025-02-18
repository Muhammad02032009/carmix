import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Car {
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
interface AdminState {
  loggedUser: boolean | null;
  cars: Car[];
  search: string;
  typeFilter?: string;
  sortBy?: string;
  open: boolean;
  editingCar: Partial<Car> | null
}

const initialState: AdminState = {
  loggedUser: false,
  cars: [],
  search: "",
  typeFilter: undefined,
  sortBy: undefined,
  open: false,
  editingCar: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<boolean>) => {
      state.loggedUser = action.payload;
    },
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<string | undefined>) => {
      state.typeFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string | undefined>) => {
      state.sortBy = action.payload;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setEditingCar: (state, action: PayloadAction<Partial<Car> | null>) => {
      state.editingCar = action.payload;
    },
  },
});

export const { setLoggedUser, setCars, setSearch, setTypeFilter, setSortBy, setOpen, setEditingCar } = adminSlice.actions;
export default adminSlice.reducer;

export const selectAdminState = (state: RootState) => state.admin;
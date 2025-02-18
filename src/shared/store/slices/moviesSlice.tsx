
import { carMovies } from "@/shared/contents/carMovies/carMovies";
import { createSlice } from "@reduxjs/toolkit";

export const carMoviesSlice = createSlice({
  name: "movies",
  initialState: {
    searchQuery: "",
    filteredMovies: carMovies,
    loading: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default carMoviesSlice.reducer;
export const { setFilteredMovies, setLoading, setSearchQuery } = carMoviesSlice.actions;

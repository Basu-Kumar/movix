import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    query: "",
  },
  reducers: {
    getApiConfiguration: (state, actions) => {
      state.url = actions.payload;
    },
    getGenres: (state, actions) => {
      state.genres = actions.payload;
    },
    getQuery: (state, actions) => {
      state.query = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres, getQuery } = homeSlice.actions;

export default homeSlice.reducer;

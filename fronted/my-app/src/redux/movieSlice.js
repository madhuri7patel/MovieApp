import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching movies
// export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
//   const response = await axios.get('/api/movies');
//   return response.data;
// });

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/movies');
      return response.data;  // Assuming the server responds with the array of movies
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Movie slice
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',  // Changed from null to 'idle' to represent the initial state more clearly
    error: null,
  },
  reducers: {
    addMovie: (state, action) => {
      state.list.push(action.payload);
    },
    editMovie: (state, action) => {
      const index = state.list.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteMovie: (state, action) => {
      state.list = state.list.filter(movie => movie.id !== action.payload);
    },
    toggleWatchStatus: (state, action) => {
      const index = state.list.findIndex(movie => movie.id === action.payload);
      if (index !== -1) {
        state.list[index].watched = !state.list[index].watched;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Assuming error info is returned
      });
  }
});
  

export const { addMovie, editMovie, deleteMovie, toggleWatchStatus } = movieSlice.actions;

export default movieSlice.reducer;

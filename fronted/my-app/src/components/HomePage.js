import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.list);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <h1>Movie Watchlist</h1>
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          {/* Add buttons for edit, delete, and toggle watch status */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;

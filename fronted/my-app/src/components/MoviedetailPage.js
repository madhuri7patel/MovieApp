import React from 'react';
import { useSelector } from 'react-redux';

const MovieDetailsPage = ({ match }) => {
  const movieId = match.params.id;
  const movie = useSelector(state => state.movies.list.find(m => m.id === movieId));

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      {/* Display other details and options */}
    </div>
  );
};

export default MovieDetailsPage;

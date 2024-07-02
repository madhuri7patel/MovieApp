import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, editMovie } from '../redux/movieSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const AddEditMoviePage = ({ history, match }) => {
  const [movie, setMovie] = useState({ title: '', description: '', releaseYear: '', genre: '' });
  const dispatch = useDispatch();
  const Navigate =useNavigate();
  const isEdit = match && match.params.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(editMovie(movie));
    } else {
      dispatch(addMovie(movie));
    }
    Navigate.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for title, description, etc. */}
      <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default AddEditMoviePage;

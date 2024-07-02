const Movie = require('../models/movie');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
};

exports.addMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.status(201).json(newMovie);
};

exports.updateMovie = async (req, res) => {
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedMovie);
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

import {useState } from 'react';
import './App.css'
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from "../../types/movie";
import { fetchMovies } from '../../services/movieService';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";



function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSearchSubmit = async (newQuery: string) => {
    setIsLoading(true);
    setHasError(false);
    setSelected(null);
  
    try {
      const results = await fetchMovies(newQuery);
      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(results);
    } catch (error) {
      console.error(error);
      setHasError(true);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelected(movie);
  };
  return (
    <div>
     <SearchBar onSubmit={handleSearchSubmit} />
      {hasError ? (
      <ErrorMessage />
       ) : isLoading ? (
      <Loader />
       ) : (
     <MovieGrid movies={movies} onSelect={handleMovieSelect} />
     )}

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
      <Toaster />
    </div>
  )
}

export default App

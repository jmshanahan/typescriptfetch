import "reflect-metadata";
import React, { useEffect, ReactNode, useState, useCallback } from "react";
import { FetchedMovie } from "./components/transformer/swapi.model";
import { plainToInstance } from "class-transformer";
import { IMovie } from "./components/Movie";
import AddMovie from "./components/AddMovie";
import { IOmitIdIAddMovie } from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const addMovieHandler = (movie: IOmitIdIAddMovie) => {
    console.log(movie);
  };

  const fetchMoviHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = "https://swapi.dev/api/films/";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const { results } = await response.json();
      const movies = plainToInstance(FetchedMovie, results);
      setMovies(movies);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviHandler();
  }, [fetchMoviHandler]);

  let content: ReactNode;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Is Loading ...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;

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
  const addMovieHandler = async (movie: IOmitIdIAddMovie) => {
    console.log(movie);
    const url =
      "https://react-docs-361db-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchMoviHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url =
        "https://react-docs-361db-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedMovies: Array<IMovie> = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      loadedMovies.forEach((profile, index, arr) => {
        console.log(
          `Index: ${index}, id: ${profile.id}, Title: ${profile.title}`
        );
      });
      for (const key in loadedMovies) {
        console.log(loadedMovies[key].title);
      }

      console.log(data);
      // Use this method if you are using the SWAPI
      // It didnt work for firebase.

      // NOTE: firbase returns an object with embedded objects
      // SWAPI returns an array of objects. Hence different methods were required.

      // const { results } = await response.json();
      // const movies = plainToInstance(FetchedMovie, results);

      setMovies(loadedMovies);
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
  // if (error) {
  //   content = <p>{error}</p>;
  // }
  // if (isLoading) {
  //   content = <p>Is Loading ...</p>;
  // }
  console.log(`The content is ${content}`);

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

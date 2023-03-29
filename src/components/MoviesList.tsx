import React, { FC } from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

import { IMovie } from "./Movie";
interface IMovieListProps {
  movies: IMovie[];
}

const MovieList: FC<IMovieListProps> = ({ movies }) => {
  return (
    <ul className={classes["movies-list"]}>
      {movies.map((movie: IMovie) => (
        <Movie
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;

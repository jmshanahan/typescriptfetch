import React, { FC } from "react";

import classes from "./Movie.module.css";
export interface IMovie {
  id: string;
  title: string;
  releaseDate: String;
  openingText: string;
}

const Movie: FC<IMovie> = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;

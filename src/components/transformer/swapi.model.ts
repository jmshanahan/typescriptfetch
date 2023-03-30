import React from "react";
import { Expose } from "class-transformer";
import { IMovie } from "../Movie";

export class FetchedMovie implements IMovie {
  @Expose({ name: "episode_id" })
  id: string;

  title: string;
  @Expose({ name: "opening_crawl" })
  openingText: string;
  @Expose({ name: "release_date" })
  releaseDate: string;
  constructor(
    episode_id: string,
    title: string,
    opening_crawl: string,
    release_date: string
  ) {
    this.id = episode_id;
    this.title = title;
    this.openingText = opening_crawl;
    this.releaseDate = release_date;
  }
}

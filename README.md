# Introduction

A simple app fetching data with typscript and using class transformer.

The class transformer has been taken out when we started to get data from firebase.

Firebase returns an object of objects with keys.
SWAPI returns an array of objects

You need to note the difference.
If you get objects with keys you will need to transform that into an array of objects as that is the
most convient way to manage things within react.

```
      const loadedMovies: Array<IMovie> = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
```

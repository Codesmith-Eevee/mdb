/*
SAMPLE URLS
        
1. To get the config data like image base urls
https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
        
2. To fetch a list of movies based on a keyword
https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
        
3. To fetch more details about a movie
https://api.themoviedb.org/3/movie/<movie-id>?api_key=<APIKEY>

4. To securely grab the image
https://image.tmdb.org/t/p/w500/
      
*/
const fetch = require('node-fetch');


// move APIKEY .env
const APIKEY = '5db3cbc3a174a2a137e08dcfe8d7cb0b';

movieAPIController = {};

movieAPIController.updateMovies = (req, res, next) => {
  console.log('movieapi running!');
  // fetch(`
  // https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=release_date.desc&include_video=false&page=1`)
  // fetch(`
  // https://api.themoviedb.org/3/discover/movie?api_key=5db3cbc3a174a2a137e08dcfe8d7cb0b&language=en-US&sort_by=release_date.desc&include_adult=true&include_video=false&page=1&`)
  fetch(`
  https://api.themoviedb.org/3/discover/movie?api_key=5db3cbc3a174a2a137e08dcfe8d7cb0b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate://api.themoviedb.org/3/discover/movie?api_key=5db3cbc3a174a2a137e08dcfe8d7cb0b&language=en-US&sort_by=release_date.desc&include_adult=true&include_video=false&page=1&`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // res.locals.movie = data.results;
      res.locals.movie = destructuring(data.results);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

// iterate over queried object and destructure for information, returns object
function destructuring(data) {
  console.log('In movie info destructure!');
  // console.log('id', data[0].id);
  const movieInfoArr = [];

  // iterate over array
  for (let i = 0; i < data.length; i += 1) {
    // console.log('iterating!');
    // console.log(typeof data.movie_id);
    let thumbnail_url = '';
    let genre = 0;

    const {
      id: movie_id,
      title: movie_name,
      genre_ids: genreRaw,
      vote_average: ratings,
      poster_path: thumbnail_urlRaw,
      overview: more_info,
    } = data[i];

    thumbnail_url = `https://image.tmdb.org/t/p/w500/${thumbnail_urlRaw}`;
    genre = genreRaw[0];

    // console.log(movie_id, movie_name, genre, ratings, more_info);
    movieInfoArr.push({
      movie_id,
      movie_name,
      genre,
      ratings,
      thumbnail_url,
      more_info,
    });
  }
  // console.log(movieInfoArr);
  return movieInfoArr;
}

module.exports = movieAPIController;

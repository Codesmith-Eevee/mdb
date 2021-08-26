import React, { useState, useMemo } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";

/* sessionStorage = object of objects
0: {movie_name: "Muppet Family Christmas, A", thumbnail_url: "http://dummyimage.com/219x100.png/cc0000/ffffff", ratings: 5.7}
1: {movie_name: "Schmatta: Rags to Riches to Rags", thumbnail_url: "http://dummyimage.com/240x100.png/5fa2dd/ffffff", ratings: 1.8}
2: {movie_name: "Leviathan", thumbnail_url: "http://dummyimage.com/174x100.png/cc0000/ffffff", ratings: 5.2}
3: {movie_name: "Dancing Masters, The", thumbnail_url: "http://dummyimage.com/234x100.
*/

//sessionStorage.clear();
const db = [];

console.log("length: ", Object.keys(sessionStorage).length);
let storageLength = Object.keys(sessionStorage).length;
let counter = 0;

while (counter < storageLength) {
  db.push(JSON.parse(sessionStorage[counter]));
  counter += 1;
}
console.log("moreinfo before pop: ", db);
const username = db.pop();
console.log(username);
console.log("moreinfo after pop: ", db);
/*
const db = [
  {
    movie_name: "Coco",
    thumbnail_url: "https://m.media-amazon.com/images/I/A1tyD0nKdhL._AC_SY679_.jpg",
    // url: './assets/coco.png'
  },
  {
    movie_name: "Joker",
    thumbnail_url: "https://m.media-amazon.com/images/I/91F6aF4UJ0L._AC_SY741_.jpg",
    // url: './assets/joker.png'
  },
  {
    movie_name: "Midsomar",
    thumbnail_url: "https://i5.walmartimages.com/asr/fa39f6fc-fab1-4f04-a9cd-ca9262f28ade_1.417fffda726ccae9a94e8396a2ba7be3.jpeg",
    // url: './assets/midsomar.png'
  },
  {
    movie_name: "Nomadland",
    thumbnail_url: "https://www.themoviedb.org/t/p/original/fmHBjfiMb7cP0cikF17LoA8E1bp.jpg",
    // url: './assets/nomadland.png'
  },
  {
    movie_name: "Promising Young Woman",
    thumbnail_url: "https://m.media-amazon.com/images/M/MV5BOTgzMzE4MGItZDgxYS00ZGEwLWE3YTctZWY3ZDAyMTk0ZGU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    // url: './assets/promising_young_woman.png'
  },
];
*/
const alreadyRemoved = [];
// let moviesState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function MoreInfo(props) {
  const [movies, setMovies] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete, movie_id) => {
    let likeStatus = false; //dislike
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    
    if (direction == "left") 
      likeStatus = true; //like
    //// fetch start to /addmovie // fetch userid, movie_id, like_status (true: like, false: dislike)
    fetch("/api/addmovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, movie_id: movie_id, likeStatus: likeStatus }), //username and password
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data: ", data);
        console.log("data in swipedFetch: ", data.rows);
      })
      .catch((error) => {
        console.log("error", error); // returns if error occurs
      });
    //// fetch done
    
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    moviesState = moviesState.filter((movie) => movie.movie_name !== name);
    setMovies(moviesState);
  };


  const swipe = (dir) => {

    const cardsLeft = movies.filter(
      (movie) => !alreadyRemoved.includes(movie.movie_name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].movie_name; // Find the card object to be removed
      const index = db.map((movie) => movie.movie_name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Movie Tinder Card - MoreInfo</h1>

      <div className="cardContainer_moreinfo">
        {movies.map((movie, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={movie.movie_name}
            onSwipe={(dir) => swiped(dir, movie.movie_name, movie.movie_id)}
            onCardLeftScreen={() => outOfFrame(movie.movie_name)}
          >
            <div
              style={{
                backgroundImage: "url(" + movie.thumbnail_url + ")",
              }}
              className="card"
            >
              <h3>{/*movie.movie_name*/}</h3>
            </div>
            <div className="rating">
              <h4>placeholder for rating</h4>
            </div>
            <div className="more_information">
              <p>placeholder for synopsis</p>
            </div>
          </TinderCard>
        ))}
      </div>
      
      <div className="buttons">
        <button onClick={() => swipe("left")}>Like!</button>
        <button onClick={() => swipe("right")}>Dislike!!</button>
        <button className="likeHistory">Like History</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You {lastDirection == "left" ? "liked" : "disliked"}{" "}
        </h2>
      ) : (
        <h2 className="infoText">
          More Info - Swipe a card or press a button to get started!
        </h2>
      )}
      


    </div>
  );
}

export default MoreInfo;

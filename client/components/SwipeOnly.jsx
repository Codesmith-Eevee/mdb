
import React, { useState, useMemo } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
// const path = require('path');
// path.join(__dirname, '../index.html'))
const db = [
  {
    name: 'Coco',
    url: 'https://m.media-amazon.com/images/I/A1tyD0nKdhL._AC_SY679_.jpg'
    // url: './assets/coco.png'
  },
  {
    name: 'Joker',
    url: 'https://m.media-amazon.com/images/I/91F6aF4UJ0L._AC_SY741_.jpg'
    // url: './assets/joker.png'
  },
  {
    name: 'Midsomar',
    url: 'https://i5.walmartimages.com/asr/fa39f6fc-fab1-4f04-a9cd-ca9262f28ade_1.417fffda726ccae9a94e8396a2ba7be3.jpeg'
    // url: './assets/midsomar.png'
  },
  {
    name: 'Nomadland',
    url: 'https://www.themoviedb.org/t/p/original/fmHBjfiMb7cP0cikF17LoA8E1bp.jpg'
    // url: './assets/nomadland.png'
  },
  {
    name: 'Promising Young Woman',
    url: 'https://m.media-amazon.com/images/M/MV5BOTgzMzE4MGItZDgxYS00ZGEwLWE3YTctZWY3ZDAyMTk0ZGU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg'
    // url: './assets/promising_young_woman.png'
  }
]

const alreadyRemoved = []
let moviesState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function SwipeOnly () {
  const [movies, setMovies] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  } 

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    moviesState = moviesState.filter(character => movie.name !== name)
    setMovies(moviesState)
  }

  const swipe = (dir) => {
    const cardsLeft = movies.filter(movie => !alreadyRemoved.includes(movie.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(movie => movie.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Movie Tinder Card - SwipeOnly</h1>
      <div className='cardContainer'>
        {movies.map((movie, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={movie.name} onSwipe={(dir) => swiped(dir, movie.name)} onCardLeftScreen={() => outOfFrame(movie.name)}>
            <div style={{ backgroundImage: 'url(' + movie.url + ')' }} className='card'>
              <h3>{movie.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe Only - Swipe a card or press a button to get started!</h2>}
    </div>
  )
}

export default SwipeOnly
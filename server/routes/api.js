const express = require('express');

const movieController = require('../controllers/movieController');
const movieAPIController = require('../controllers/movieAPIController');

const router = express.Router();

// login

// update movie database (set interval to every night) add to database
router.post(
  '/movieapi',
  movieAPIController.updateMovies,
  movieController.appendMovie,
  (req, res) => {
    res.status(200).json(console.log('its working!'));
  }
);

// get user id
router.get('/getuserid', movieController.getUserID, (req, res) => {
  res.status(200).json(res.locals.userID);
});

// get more info
router.get('/getmoreinfo', movieController.getmoreInfo, (req, res) => {
  res.status(200).json(res.locals.moreInfo);
});

// add movie
router.post('/addmovie', movieController.postMovie, (req, res) => {
  res.status(200).json(res.locals.addMovie);
});

module.exports = router;

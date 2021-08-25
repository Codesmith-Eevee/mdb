const express = require('express');

const movieController = require('../controllers/movieController');

const router = express.Router();

// login

// querying movie api

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
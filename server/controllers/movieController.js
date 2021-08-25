const db = require ('../model/movieModel');
const movieController = {};

// get user id controller
movieController.getUserID = (req, res, next) => {
    console.log('getUserID controller running');
    // const { user_id } = 1;

    const textStr = `SELECT 
                        movie_name, thumbnail_url, ratings
                        FROM movie_db a
                        LEFT JOIN user_history b 
                            ON a.movie_id = b.movie_id
                            AND b.user_id = $1
                        WHERE b.movie_id IS NULL`
    const sqlPar = [4];

    db.query(textStr, sqlPar)
        .then((data) => {
            res.locals.userID = data;
            return next();
        })
        .catch((err) => {
            return next(err);
        });
};


// get more info controller
movieController.getmoreInfo = (req, res, next) => {
    const textStr = '';

    db.query(textStr)
        .then((data) => {
            res.locals.moreInfo = data;
            return next();
        })
        .catch((err) => {
            return next(err);
        });
};


// add movie controller
movieController.postMovie = (req, res, next) => {
    console.log('postMovie controller is running');
    const textStr = `INSERT INTO user_history(user_id, movie_id, like_status)
                     VALUES ($1, $2, $3)`;

    const sqlPar = ['4', '6863930528', 'FALSE'];

    db.query(textStr, sqlPar)
        .then((data) => {
            res.locals.addMovie = data;
            return next();
        })
        .catch((err) => {
            return next(err);
        });
};

module.exports = movieController;
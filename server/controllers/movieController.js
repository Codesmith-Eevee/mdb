const db = require("../model/movieModel");
const movieController = {};

// get user id controller
movieController.getUserID = (req, res, next) => {
  console.log("getUserID controller running");
  const { username } = req.body;
  // const { user_id } = 1;
  const arr = [username];
  /*
  const textStr = `SELECT 
                        movie_name, thumbnail_url, ratings, a.movie_id, more_info
                        FROM movie_db a
                        LEFT JOIN user_history b 
                            ON a.movie_id = b.movie_id
                            AND b.user_id = $1
                        WHERE b.movie_id IS NULL
                        LIMIT 20`;
*/
  const textStr = `SELECT
                        user_neg_history.movie_id, user_neg_history.movie_name, user_neg_history.thumbnail_url, user_neg_history.genre, LN(GREATEST(coalesce(user_profile.like, 1), 5)+random()*5) AS score
                        FROM (
                        SELECT
                          a1.movie_name, a1.thumbnail_url, a1.genre, a1.movie_id
                        FROM movie_db a1
                        LEFT JOIN user_history b1
                          ON a1.movie_id = b1.movie_id
                          AND b1.user_id = $1
                        WHERE b1.movie_id IS NULL
                        ) user_neg_history
                        LEFT JOIN 
                        (
                        SELECT
                        temp.genre, sum((temp.like_status)::int) AS like
                        FROM (
                          SELECT
                              a2.user_id , a2.like_status, a2.movie_id, b2.genre
                          FROM user_history a2
                          LEFT JOIN movie_db b2
                              ON a2.movie_id = b2.movie_id
                              AND a2.user_id = $1
                          ) temp
                        GROUP BY genre
                        ) user_profile
                        ON user_neg_history.genre = user_profile.genre
                        ORDER BY score DESC
                        LIMIT 20;`;

  // const sqlPar = [4];

  db.query(textStr, arr /*sqlPar*/)
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
  const textStr = "";

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
  console.log("postMovie controller is running");
  const { username } = req.body;
  const { movie_id } = req.body;
  const { likeStatus } = req.body;
  const textStr = `INSERT INTO user_history(user_id, movie_id, like_status)
                     VALUES ($1, $2, $3)`;

  // const sqlPar = ["4", "6863930528", "FALSE"];
  const parameters = [ username, movie_id, likeStatus ];
  db.query(textStr, parameters)
    .then((data) => {
      res.locals.addMovie = data;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = movieController;

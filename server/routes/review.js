var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//UserReview model
const UserReview = require('../models/UserReview');

router.get('/:movieId', function (req, res) {
    var movieId = req.params.movieId;
    console.log("testing movieId ="+movieId);
    UserReview.find({"movieId":parseInt(movieId)},function(err,docs){
        if(err){
            res.json(err);
        } else {
            console.log(docs);
            //res.send({reviews:docs});
            res.send(docs);
        }
        // if(err) res.json(err);
        // else res.send({reviews:docs});
    });
})

router.post('/', function (req, res) {
    const { movieRating } = req.body;
    const { userName, movieId, rating, review, date } = movieRating;
    userReview = new UserReview({
        userName,
        movieId,
        rating,
        review,
        date
    })
    userReview.save();
    res.send('user review successfull...!')
})

module.exports = router;



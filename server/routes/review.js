var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//UserReview model
const UserReview = require('../models/UserReview');

router.post('/', function (req, res) {

    const { movieRating } = req.body;
    const { userName, movieId, rating, review } = movieRating;
    console.log("movieRating object = " + JSON.stringify(movieRating));
    userReview = new UserReview({
        userName,
        movieId,
        rating,
        review
    })
    userReview.save();
    res.send('user review successfull...!')
})

module.exports = router;



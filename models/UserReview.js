const mongoose = require('mongoose');
const userReview = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    movieId:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('review',userReview);


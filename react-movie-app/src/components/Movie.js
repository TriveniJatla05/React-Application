import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/elements/Header';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
//components
import Actor from './elements/Actor';
import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Navigation from './elements/Navigation';
import Grid from './elements/Grid';
import Spinner from './elements/Spinner';
import useMovieFetch from './hooks/useMovieFetch';
import RateThisMovieBtn from './elements/RateThisMovieBtn';
import StarRating from './elements/StarRating';
import './movieReviewStyles.css';

const Movie = ({ match }) => {
    const starChildRef = useRef();
    const [movieInfo, loading, error] = useMovieFetch(match.params.movieId);
    //console.log((movieInfo));
    const [userName, setUserName] = useState('');
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        setUserName(user.userName);
    });
    //console.log("userName in movie page = " + userName);

    const [rating, setRating] = useState(null);
    const ratingFunction = (ratingValue) => {
        setRating(ratingValue);
    }
    //console.log("rating for a movie in Movie Component ="+rating);

    const [review, setReview] = useState('');
    const reviewChangeHandler = (event) => {
        setReview(event.target.value);
        // event.preventdefault();
    }

    // console.log("userName = "+userName);
    // console.log("rating = "+rating);
    // console.log("review = "+review);
    //console.log("review = "+JSON.stringify(review));
   
    const postHandler = (e) => {
        // console.log("review testing = " + review);
        // console.log("rating testing =" + rating);
        let postData = {};
        const movieRating = {
            userName: userName,
            movieId: match.params.movieId,
            rating: rating,
            review: review
        }
        postData['movieRating'] = movieRating;
        console.log("movieRating object = " + JSON.stringify(movieRating));
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/review', postData, config)
            .then((response) => {
                setReview('');
                starChildRef.current.resetRating(null);
            }, (error) => {
                console.log(error);
            });
        e.preventDefault();
    }

    if (error) {
        return <div>Something went wrong...!</div>
    }
    if (loading || !movieInfo.original_title) {
        return <Spinner />
    }
    return (
        <>
            <Navigation title={movieInfo.title} />
            <MovieInfo movieInfo={movieInfo} />
            <MovieInfoBar time={movieInfo.runtime} budget={movieInfo.budget} revenue={movieInfo.revenue} />
            <Grid header="Actors">
                {
                    movieInfo.actors.map(actor => (
                        <Actor key={actor.credit_id} actor={actor} />
                    ))
                }
            </Grid>

            <hr className="hr" />
            
            <h4><b>ADD YOUR REVIEW HERE!</b></h4>
            <div class="container">
                <div class="jumbotron">
                    <form onSubmit={postHandler} id="movie-rating-form">
                        <div class="row">
                            <div class="col-md-4"></div>

                            <div class="col-md-2">
                                <div className="userIcon">
                                    <FaUserCircle />
                                </div>
                                <div>
                                    <h6><b>{userName}</b></h6>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h6 class="rate"><b>Score</b></h6>
                                <StarRating  ref={starChildRef}  ratingFunction={ratingFunction}/>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-7">
                                <textarea
                                    className="textarea"
                                    rows="3"
                                    cols="60"
                                    placeholder="Type your review here...!"
                                    value={review}
                                    onChange={reviewChangeHandler}
                                >
                                </textarea>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-5">
                                <button type="submit" class="btn btn-primary black-background white"><b>Post</b></button>
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Movie;





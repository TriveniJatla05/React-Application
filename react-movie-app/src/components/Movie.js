import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/elements/Header';
import { FaUserCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
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

    const [reviewsArray, setReviewsArray] = useState([]);
    console.log("reviewsArray =" + JSON.stringify(reviewsArray));
    useEffect(() => {
        console.log(match.params.movieId);
        const movieId = match.params.movieId;
        axios.get(`/review/${movieId}`)
            .then((response) => {
                console.log("reviews get data in movie component = " + JSON.stringify(response.data));
                setReviewsArray(response.data);
                //let reviewsArray = response.data;
            })
    }, [])

    const [rating, setRating] = useState(null);
    const ratingFunction = (ratingValue) => {
        setRating(ratingValue);
    }

    const [review, setReview] = useState('');
    const reviewChangeHandler = (event) => {
        setReview(event.target.value);
        // event.preventdefault();
    }

    const postHandler = (e) => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date();
        var dateFormatting = months[date.getMonth()] + ' ' + date.getDate() + ',' + ' ' + date.getFullYear()
        console.log("date = " + dateFormatting);
        let postData = {};
        const movieRating = {
            userName: userName,
            movieId: match.params.movieId,
            rating: rating,
            review: review,
            date: dateFormatting
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
                axios.get(`/review/${match.params.movieId}`)
                    .then((response) => {
                        //console.log("reviews get data in movie component = " + JSON.stringify(response.data));
                        setReviewsArray(response.data);
                        //let reviewsArray = response.data;
                    })
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
            <br />
            <br />
            {/* <hr className="hr" /> */}

            <h4><b>ADD YOUR REVIEW HERE!</b></h4>
            <div class="container">
                {/* <div class="jumbotron"> */}
                <div>
                    <form onSubmit={postHandler} id="movie-rating-form">
                        <div class="textWrap">
                            <div class="row">
                                <div class="col-md-2"></div>

                                <div class="col-md-4">
                                    <div className="userIcon">
                                        <FaUserCircle />
                                    </div>
                                    <div>
                                        <p><b>{userName}</b></p>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div className="rate">
                                        <p><b>Score</b></p>
                                    </div>
                                    <div>
                                        <StarRating ref={starChildRef} ratingFunction={ratingFunction} />
                                    </div>
                                </div>
                                <div class="col-md-2"></div>
                            </div>

                            <div class="row">
                                <div class="col-md-2"></div>

                                <div class="col-md-8">
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
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <button type="submit" class="btn btn-primary black-background white" id="button"><b>Post</b></button>
                                </div>

                                <div class="col-md-3"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {reviewsArray.length > 0 &&
                (
                    <>
                        <hr className="hr" />
                        <h4><b>REVIEWS</b></h4>
                        <div>
                            {
                                reviewsArray.map((review) => {
                                    let reviewNumber = review.rating;
                                    let movieStar = [];
                                    for (let i = 0; i < reviewNumber; i++) {
                                        movieStar.push(<FaStar size={35} />)
                                    }
                                    return (<div class="row" key={review.id}>
                                        <div class="col-md-2"></div>
                                        <div class="col-md-2">
                                            <div className="userIcon">
                                                <FaUserCircle />
                                            </div>
                                            <div>
                                                <p><b>{review.userName}</b></p>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div className="star reviewStar">
                                                {movieStar}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div className="date reviewComment"><h6><b>{review.date}</b></h6></div>
                                            <div className="reviewComment"><p><b>{review.review}</b></p></div>
                                        </div>
                                        {/* <div class="col-md-3"></div> */}
                                    </div>)

                                })
                            }
                        </div>
                    </>
                )}
        </>
    )
}
export default Movie;





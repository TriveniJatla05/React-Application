import React, { useState, useEffect } from 'react';
import Header from '../components/elements/Header';

//components
import Actor from './elements/Actor';
import MovieInfo from './elements/MovieInfo';
import MovieInfoBar from './elements/MovieInfoBar';
import Navigation from './elements/Navigation';
import Grid from './elements/Grid';
import Spinner from './elements/Spinner';
import useMovieFetch from './hooks/useMovieFetch';
import RateThisMovieBtn from './elements/RateThisMovieBtn';

const Movie = ({ match}) => {
    
    const[movieInfo,loading,error] = useMovieFetch(match.params.movieId);
    console.log((movieInfo));
    if(error){
        return <div>Something went wrong...!</div>
    }
    if(loading || !movieInfo.original_title){
        return <Spinner />
    }
    return (
        <>  
            <Navigation title={movieInfo.title} />
            <MovieInfo movieInfo={movieInfo}/>
            <MovieInfoBar time={movieInfo.runtime} budget={movieInfo.budget} revenue={movieInfo.revenue}/>
            <Grid header="Actors">
                {
                    movieInfo.actors.map(actor => (
                        <Actor key={actor.credit_id} actor={actor}/>
                    ))
                }
            </Grid>
            <RateThisMovieBtn text="Rate this Movie"/>
        </>
    )
}

export default Movie

import React from 'react';
import PropTypes from 'prop-types';
import { StyledMovieInfo } from '../styles/StyledMovieInfo';
import NoImage from '../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import MovieThumb from './MovieThumb';
import { element } from 'prop-types';

const MovieInfo = ({ movieInfo }) => {
    const directors = movieInfo.directors.map(director => director.name).join(', ')
    const producers = movieInfo.producers.map(producer => producer.name).join(', ')
    //console.log("producers = " +producers);

    return (
        <StyledMovieInfo backdrop={movieInfo.backdrop_path}>
            <div className="movieinfo-content">
                <div className="movieinfo-thumb">
                    <MovieThumb
                        image={
                            movieInfo.poster_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movieInfo.poster_path}`
                                : NoImage
                        }
                        clickable={false}
                    />
                </div>
                <div className="movieinfo-text">
                    <h1>{movieInfo.title}</h1>
                    <h3>OVERVIEW</h3>
                    <br />
                    <p>{movieInfo.overview}</p>


                    <div className="rating-director">
                        <div>
                            <h3>IMDB RATING</h3>
                            <br />
                            <div className="score">
                                {movieInfo.vote_average}
                            </div>
                        </div>
                        <div className="director">
                            <h3>DIRECTOR{movieInfo.directors.length > 1 ? 'S' : ''}</h3>
                            <br />
                            {directors}
                        </div>
                        <div className="director">
                            <h3>PRODUCER{movieInfo.producers.length > 1 ? 'S' : ''}</h3>
                            <br />
                            {producers}
                        </div>
                    </div>
                </div>
            </div>
        </StyledMovieInfo>
    )
}

MovieInfo.propTypes = {
    movieInfo: PropTypes.object
}

export default MovieInfo
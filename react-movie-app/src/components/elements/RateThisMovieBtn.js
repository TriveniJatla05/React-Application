import React from 'react';
import PropTypes from 'prop-types'; 
import {Link} from 'react-router-dom';
import { StyledLoadMoreBtn } from '../styles/StyledLoadMoreBtn';


const RateThisMovieBtn = ({text}) => {
    return(
        <StyledLoadMoreBtn>
            <Link to='/ratethismovie'>{text}</Link>
        </StyledLoadMoreBtn>
    )
}

RateThisMovieBtn.prototype = {
    text: PropTypes.string
}

export default RateThisMovieBtn
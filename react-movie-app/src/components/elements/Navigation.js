import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledNavigation } from '../styles/StyledNavigation';

const Navigation = ({ title }) => {

    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to="/home"><p>Home</p></Link>
                <p>|</p>
                <p>{title}</p>
            </div>
        </StyledNavigation>
    )
}

Navigation.propTypes = {
    title: PropTypes.string
}

export default Navigation
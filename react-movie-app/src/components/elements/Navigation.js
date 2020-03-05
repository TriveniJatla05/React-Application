import React from 'react';
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

export default Navigation
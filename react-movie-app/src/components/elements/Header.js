import React from 'react';
import { StyledHeader, StyledRMDBLogo, StyledTMDBLogo } from '../styles/StyledHeader';
import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';
import { Link } from 'react-router-dom';

const Header = () => (
    <div>
        <StyledHeader className="header-content">
            <Link to="/home">
                <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo" />
            </Link>
            <StyledTMDBLogo src={TMDBLogo} alt="tmdb-logo" />
            
        </StyledHeader>
    </div>
)

// const Header = () => {
//     return(
//         <div>
//             <div className="header-content">
//                 <img src={} alt=""/>
//             </div>
//         </div>
//     )
// }

export default Header;
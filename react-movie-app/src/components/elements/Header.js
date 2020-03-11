import React from 'react';
import { StyledHeader, StyledRMDBLogo, StyledTMDBLogo, h2Tag } from '../styles/StyledHeader';
import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ userName }) => (
    <div>
        <StyledHeader className="header-content">
            <Link to="/home">
                <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo" />
            </Link>

            <StyledTMDBLogo>
                <div className="userIcon">
                    <FaUserCircle />
                </div>
                <div>
                    <h2>{userName}</h2>
                </div>
            </StyledTMDBLogo>
        </StyledHeader>
    </div>
)
export default Header;

{/* <StyledTMDBLogo src="" alt={userName} /> */ }
//src={TMDBLogo}
// const Header = () => {
//     return(
//         <div>
//             <div className="header-content">
//                 <img src={} alt=""/>
//             </div>
//         </div>
//     )
// }


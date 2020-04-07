import React,{useContext} from 'react';
import { StyledHeader, StyledRMDBLogo, StyledTMDBLogo, h2Tag } from '../styles/StyledHeader';
import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import AuthContext from '../context/authContext/AuthContext';

const Header = (props) => {
    const { signOut } = useContext(AuthContext);
    const clickHandler = () => {
       signOut();
       props.history.push("/")
    }
    return (
        <div>
            <StyledHeader className="header-content">
                <Link to="/home">
                    <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo" />
                </Link>
                <div className="dropdown">
                    <button role="button" type="button" class="btn" data-toggle="dropdown"><FaUserCircle size={30} />{props.userName}</button>
                    <ul className="dropdown-menu">
                        <li>
                            <a onClick={clickHandler}>SignOut</a>
                            {/* <button>SignOut</button> */}
                        </li>
                    </ul>
                </div>
            </StyledHeader>
        </div>
    )
}

export default Header;




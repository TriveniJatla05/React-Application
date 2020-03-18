import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledNavigation } from '../styles/StyledNavigation';
import { StyledTMDBLogo } from '../styles/StyledHeader';
import { FaUserCircle } from 'react-icons/fa';

const Navigation = ({ title }) => {
    const[userName,setUserName] = useState('');
    useEffect(() =>{
        let user = JSON.parse(localStorage.getItem("user"));
        setUserName(user.userName);
    },[])
    //console.log("userName in navigation page = "+userName);
    return (
        <StyledNavigation>
            <div className="navigation-content">
                <Link to="/home"><p>Home</p></Link>
                <p>|</p>
                <p>{title}</p>
            </div>
            <StyledTMDBLogo>
                <div className="userIcon">
                    <FaUserCircle />
                </div>
                <div>
                    <h2>{userName}</h2>
                </div>
            </StyledTMDBLogo>
        </StyledNavigation>

    )
}

Navigation.propTypes = {
    title: PropTypes.string
}

export default Navigation
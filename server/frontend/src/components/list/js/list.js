import React from 'react';
import { bool } from 'prop-types';
import '../scss/list.scss';
import { Link } from 'react-router-dom';
import HomeIcon from "../../../assets/images/icons/home.png";
import LoginIcon from "../../../assets/images/icons/key.png";

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';

const List = (props) => {

    // this component is called twice, from header and from menu each of them has different style
    let ListType = props.forMenu ? 'MenuList' : 'HeaderList';
   


    const handleLogout = (e) => {
        // e.preventDefault();
        props.onLogout();
    }

    return (
        <ul id={ListType}>
            <li>
                <Link to="/">
                    <span role="img" aria-label="Home page"><img className="imageIcon" src={HomeIcon} tag="home icon" ></img></span>
        Home page
      </Link>
            </li>
            {props.isAuthenticated &&
                <li>
                    <Link to="/upload">
                        <span role="img" aria-label="Upload"><img className="imageIcon" src={HomeIcon} tag="upload icon" ></img></span>
        Upload
      </Link>
                </li>}
            <li>
                {props.isAuthenticated ?

                    <Link to="/" onClick={(e) => handleLogout(e)}>
                        <span role="img" aria-label="Logout"><img className="imageIcon" src={LoginIcon} tag="logout icon" ></img></span>
        Logout
        </Link> :

                    <Link to="/login">
                        <span role="img" aria-label="Login"><img className="imageIcon" src={LoginIcon} tag="login icon" ></img></span>
        Login
        </Link>
                }

            </li>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}


List.propTypes = {
    forMenu: bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
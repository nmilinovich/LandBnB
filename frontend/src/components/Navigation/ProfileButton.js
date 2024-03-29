import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import PostSpot from '../Spots/PostSpot'
import './Navigation.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-container">
      <button onClick={openMenu} className="profile-btn">
        <i className="fas fa-user-circle" id="nav-profile-btn"/>
      </button>
      <div className='pfList' hidden={!showMenu} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown">
            <div className="name">Hello {user.firstName}</div>
            <div className="email">{user.email}</div>
            <div className="manageDiv">
              <Link className="manage" to='/spots/current'>Manage Spots</Link>
            </div>
            <div className='logoutDiv' onClick={logout}>
              <Link className="logoutBtn" to='/spots'>Log Out</Link>
            </div>
          </div>
        ) : (
          <div className="login-dropdown">
            <OpenModalMenuItem
              id='loginDiv'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              id='signinDiv'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navUl'>
      <div className='nav'>
        <div className='leftHandNav'>
          <i className="fa-brands fa-airbnb">
          <NavLink className='homeBtn' exact to="/">LandBnB</NavLink>
          </i>
        </div>
        <div>
          {isLoaded && (
          <div className='createAndButton'>
            <NavLink hidden={!sessionUser} className='spotForm' exact to='/spots/new'>Create a New Spot!</NavLink>
            <ProfileButton className='pfBtn' user={sessionUser} />
          </div>
          )}
        </div>
      </div>
    </ul>
  );
}

export default Navigation;

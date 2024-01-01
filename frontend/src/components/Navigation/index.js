import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav'>
      <i className="fa-brands fa-airbnb">
      <NavLink exact to="/">Home</NavLink>
      </i>
      {isLoaded && (
        <div className='createAndButton'>
          <NavLink className='spotForm' exact to='/spots/new'>Create a New Spot!</NavLink>
          <ProfileButton className='button' user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;

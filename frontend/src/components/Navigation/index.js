import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav'>
      <button className='home'>
        <NavLink exact to="/">Home</NavLink>
      </button>
      {isLoaded && (
        <div>
          <NavLink className='spotForm' exact to='/spots/new'>Create a New Spot!</NavLink>
          <ProfileButton className='button' user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;

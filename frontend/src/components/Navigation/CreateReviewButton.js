import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateReviewFormModal from '../Reviews/CreateReviewFormModal'
import PostSpot from '../Spots/PostSpot'
import './Navigation.css'
import { useParams } from "react-router-dom";

function  CreateReviewButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let { spotId } = useParams();
  const ulRef = useRef();

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
          <>
            <OpenModalMenuItem
              itemText="Create Your Review"
              onItemClick={closeMenu}
              modalComponent={<CreateReviewFormModal spotId={spotId} />}
              customClass={'createNewRvwBtn'}
            />
          </>

  );
}

export default CreateReviewButton;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import DeleteReviewFormModal from "../Reviews/DeleteReviewFormModal";
import PostSpot from '../Spots/PostSpot'
import './Navigation.css'

function DeleteSpotButton({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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



  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
          <>
            <OpenModalMenuItem
              itemText="Delete"
              onItemClick={closeMenu}
              modalComponent={<DeleteReviewFormModal reviewId={reviewId} spotId={spotId} />}
              customClass={'deleteRvwBtn'}
            />
          </>
  );
}

export default DeleteSpotButton;

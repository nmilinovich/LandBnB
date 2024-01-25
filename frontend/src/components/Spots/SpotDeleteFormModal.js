import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { getSpotDetails, getSpots } from "../../store/spots";
import { removeSpot } from "../../store/spots";
import './SpotDeleteFormModal.css';

function SpotDeleteFormModal({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user?.id);
  console.log(window.location.href);
  spotId = parseInt(spotId);
  console.log(spotId);
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    console.log(spotId);
    // if (password === confirmPassword) {
      return dispatch(removeSpot(spotId))
        // .then(() => dispatch(getSpots()))
        .then(closeModal)

  };

  return (
    <>
        <h1 id="confirm">Confirm Delete?</h1>
        <p className="deleteSpotP">
            Are you sure you want to remove this spot from the listings?
        </p>
        <div id="YDeleteSpotDiv">
          <button id='YDeleteSpotBtn' onClick={handleDelete}>
              Yes (Delete Spot)
          </button>
        </div>
        <div id="NDeleteSpotDiv">
          <button id='NDeleteSpotBtn' onClick={closeModal}>
              No (Keep Spot)
          </button>
        </div>
    </>
  );
}

export default SpotDeleteFormModal;

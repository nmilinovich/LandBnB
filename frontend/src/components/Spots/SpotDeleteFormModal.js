import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { getSpotDetails } from "../../store/spots";
import { removeSpot } from "../../store/spots";

function SpotDeleteFormModal({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user?.id);
  console.log(window.location.href);
  spotId = parseInt(spotId);
  console.log(spotId);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    console.log(spotId);
    // if (password === confirmPassword) {
      return dispatch(removeSpot(spotId))
        .then(() => dispatch(getSpotDetails(spotId)))
        .then(closeModal)

  };

  return (
    <>
        <h1>Confirm Delete?</h1>
        <p>
            Are you sure you want to remove this spot from the listings?
        </p>
        <div onClick={handleDelete}>
            Yes (Delete Spot)
        </div>
        <div onClick={closeModal}>
            No (Keep Spot)
        </div>
    </>
  );
}

export default SpotDeleteFormModal;

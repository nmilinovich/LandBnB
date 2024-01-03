import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { getSpotDetails, getSpots } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import { removeReview } from "../../store/reviews";

function DeleteReviewFormModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user?.id);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    // if (password === confirmPassword) {
      return dispatch(removeReview(reviewId, spotId))
        .then(() => dispatch(getSpotDetails(spotId)))
        .then(closeModal)

  };

  return (
    <>
        <h1>Confirm Delete?</h1>
        <p>
            Are you sure you want to remove this review?
        </p>
        <div onClick={handleDelete}>
            Yes (Delete Review)
        </div>
        <button onClick={closeModal}>
        <div >
            No (Keep Review)
        </div>
        </button>

    </>
  );
}

export default DeleteReviewFormModal;

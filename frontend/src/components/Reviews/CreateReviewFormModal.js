import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";
import { postNewReview } from "../../store/reviews";

function CreateReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user.id);
  console.log(window.location.href);
  spotId = parseInt(spotId);
  console.log(spotId);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    console.log(spotId);
    e.preventDefault();
    // if (password === confirmPassword) {
      setErrors({});
      return dispatch(postNewReview(review, stars, user, spotId))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });

    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Create Your Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Review:
          <input
            placeholder=""
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        {errors.review && <p>{errors.review}</p>}
        <label>
          Stars:
          <input
            placeholder=""
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        {errors.stars && <p>{errors.stars}</p>}
        <button type="submit">Create Review</button>
      </form>
    </>
  );
}

export default CreateReviewFormModal;

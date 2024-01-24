import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";
import { getSpotReviews, postNewReview } from "../../store/reviews";
import { getSpotDetails } from "../../store/spots";
import "./CreateReviewFormModal.css";

function CreateReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user?.id);
  console.log(window.location.href);
  spotId = parseInt(spotId);
  console.log(spotId);
  const [review, setReview] = useState("");
  const [currVal, setCurrVal] = useState(0);
  const [hoverVal, setHoverVal] = useState(undefined)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const stars = Array(5).fill(0);

  const handleSubmit = (e) => {
    console.log(stars);
    console.log(currVal)
    e.preventDefault();
    // if (password === confirmPassword) {
      setErrors({});
      return dispatch(postNewReview(review, currVal, user, spotId))
        .then(closeModal)
        .then(() => dispatch(getSpotDetails(spotId)))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
  };

  const handleClick = value => {
    setCurrVal(value)
  }

  const handleMouseHover = value => {
    setHoverVal(value)
  }

  const handleMouseLeave = () => {
    setHoverVal(undefined)
  }

  return (
    <>
      <h1>How was Your Stay?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            placeholder="Leave your review here..."
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          >
          </textarea>
        </label>
        {errors.review && <p className="error">{errors.review}</p>}
        <label>
          Stars:
          <div>
            {stars.map((_, i) => {
              return (
                <i class={`fa-solid fa-star ${(hoverVal || currVal) > i ? 'filled' : 'unfilled'}`}
                key={i} onClick={() => handleClick(i + 1)} onMouseOver={() => handleMouseHover(i + 1)}
                onMouseLeave={handleMouseLeave} color={(hoverVal || currVal) > i ? 'orange' : 'grey'}>
                </i>
              )
            })}
          </div>
        </label>
        {errors.stars && <p className="error">{errors.stars}</p>}
        <button type="submit" disabled={review.length < 10 || !stars}>Submit Your Review</button>
      </form>
    </>
  );
}

export default CreateReviewFormModal;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import './Navigation.css'
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

function UpdateSpotButton({ user, spotId }) {
  console.log(spotId)
  let history = useHistory();

  return (
        <button onClick={() => history.push(`/spots/${spotId}/edit`)}>
            Update
        </button>
  );
}

export default UpdateSpotButton;

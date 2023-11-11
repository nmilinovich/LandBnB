import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSpotDetails } from '../../store/spots';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    console.log(spotId)
    const [isLoaded, setIsLoaded] = useState(true);
    const spot = useSelector((state) => state.spots.parseInt(spotId))
    console.log(spot);
    // useEffect(() => {
    //     dispatch(getSpotDetails(spotId));
    //     setIsLoaded(false);
    //     if(!isLoaded) console.log(spot);
    // }, [dispatch, spotId])

    return (
        <li>
            <div className="card">
            {/* <Link to={`/${spotId}`}> */}
                {/* {spot.name}
                {spot.address}
                {spot.country}
                {spot.state}
                {spot.city}
                {spot.avgRating}
                {spot.description}
                {spot.lat}
                {spot.lng}
                {spot.price} */}
                {/* {spot.previewImage.url} */}
            {/* </Link> */}
            </div>
      </li>
    );
}

export default SpotDetails;

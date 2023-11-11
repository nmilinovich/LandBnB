import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSpotDetails } from '../../store/spots';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const id = parseInt(spotId);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dispatch(getSpotDetails(id))
        .then(() => setIsLoading(false));
    }, [dispatch, id]);
    let spot = useSelector((state) => state.spots[id]);
    if(!isLoading) {
        console.log(spot);
    }

    return (
        <li>
            {!isLoading ?
            <div className="card">
                {spot.SpotImages.forEach(img => {
                    return <img src={`${img['url']}`} />
                })
                }
                {spot.address}
                {spot.country}
                {spot.state}
                {spot.city}
                {spot.avgStarRating}
                {spot.description}
                {spot.lat}
                {spot.lng}
                {spot.price}

                {spot.Owner.firstName}
                </div>
            : <div>Loading</div>}

      </li>
    );
}

export default SpotDetails;

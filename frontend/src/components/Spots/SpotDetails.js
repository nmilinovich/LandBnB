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
        <section>
            {!isLoading ?
                <div className="card">
                    <h2>{spot.name}</h2>
                    Location: {spot.city}, {spot.state}, {spot.country}

                    {spot.SpotImages.map(img => {
                        return <img className={img['previewImage'] ? 'previewImg' : 'img'} src={`${img['url']}`} alt='image'/>
                    })
                    }
                    <div>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    {spot.avgStarRating}
                    <p>{spot.description}</p>
                </div>
            : <div>Loading</div>}
      </section>
    );
}

export default SpotDetails;

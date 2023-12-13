import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSpotDetails } from '../../store/spots';
import './SpotDetails.css';
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
                    <h1>{spot.name}</h1>
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>

                    {spot.SpotImages.map(image => {
                        return <img className={image['preview'] ? 'previewImg' : 'otherImg'} src={`${image['url']}`} alt='image'/>
                    })
                    }
                    <div>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    {spot.avgStarRating}
                    <p>{spot.description}</p>

                    <div className='infoBox'>
                        <div className='info'>{'$'+spot.price+'night'} <i class="fa-solid fa-star"> {spot.avgStarRating?.toFixed(1) ?? 'new'} {spot.numReviews}</i></div>
                        <button onClick={() => alert('Feature coming soon.')}>Reserve</button>
                    </div>
                </div>
            : <div>Loading</div>}
      </section>
    );
}

export default SpotDetails;

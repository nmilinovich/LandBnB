import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import SpotDetails from './SpotDetails';

const Spots = () => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const spots = useSelector((state) => state.spots.spots)
    useEffect(() => {
        dispatch(getSpots())
        .then(() => setIsLoading(false));

    }, [dispatch])
    return (
        <section>
            <ul>
                {spots?.map((spot) =>
                    <div className='tile'>
                        <Link to={`/spots/${spot.id}`}>

                            {<img src={spot.previewImage['url']} alt='preview'/>}
                            {spot.avgRating ? spot.avgRating.toFixed(1)+' ' : 'new '}
                            {spot.address + ' '}
                            {spot.city + ', '}
                            {spot.state + ' '}
                            {spot.country + ' '}
                            <div>
                                {spot.price + ' '}
                                <label>night</label>
                            </div>
                        </Link>
                    </div>
                )}
            </ul>
        </section>
    );
}
export default Spots

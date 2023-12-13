import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import SpotDetails from './SpotDetails';
import './Spots.css'

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
                    <div >
                        <Link className='tile' to={`/spots/${spot.id}`}>

                            {<img src={spot.previewImage['url']} alt='preview'/>}
                            {/* {spot.name} */}
                            <div className='location'>
                                {spot.city + ', '}
                                {spot.state + ' '}
                                <i class="fa-solid fa-star"> {spot.avgRating?.toFixed(1) ?? 'new'}</i>
                            </div>
                            {spot.country + ' '}
                            <div className='price'>
                                {spot.price.toFixed(2) + ' '}
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

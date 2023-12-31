import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import SpotDetails from './SpotDetails';
import './Spots.css'

const Spots = () => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({});
    const spots = useSelector((state) => Object.values(state.spots))
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])
    if (!spots.length) {
        return <div>Loading...</div>
    }
    return (
        <section>
            <ul>
                <div className='spots-grid-container'>
                    {spots?.filter(spot => typeof spot === 'object').map((spot) =>
                        <div key={spot.id}>
                            <Link className='tile' to={`/spots/${spot.id}`}>

                                {spot.previewImage && <img src={spot.previewImage['url']} alt='preview'/>}
                                <div className='location'>
                                    <div>{spot.city + ', '}
                                        {spot.state + ' '}
                                    </div>
                                    <i className="fa-solid fa-star"> {spot.avgRating?.toFixed(1) ?? 'new'}</i>
                                </div>
                                {spot.country + ' '}
                                <div className='price'>
                                    <div>
                                    {spot.price?.toFixed(2) + ' '}
                                    <label>night</label>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </ul>
        </section>
    );
}
export default Spots

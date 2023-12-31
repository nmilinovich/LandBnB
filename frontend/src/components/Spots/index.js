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
        console.log(spots)
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
                                    {spot.city + ', '}
                                    {spot.state + ' '}
                                    <i className="fa-solid fa-star"> {spot.avgRating?.toFixed(1) ?? 'new'}</i>
                                </div>
                                {spot.country + ' '}
                                <div className='price'>
                                    {spot.price?.toFixed(2) + ' '}
                                    <label>night</label>
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

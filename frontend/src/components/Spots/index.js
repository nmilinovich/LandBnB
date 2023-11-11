import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import SpotDetails from './SpotDetails';
const Spots = () => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const spots = useSelector((state) => state.spots)
    Object.values(spots).map(spot => console.log(spot))
    useEffect(() => {
        dispatch(getSpots())
        .then(() => setIsLoading(false));

    }, [dispatch])
    return (
        <section>
            <ul>
                {Object.values(spots).map((spot) => (
                    <div>
                        <Link to={`/spots/${spot.id}`}>
                            {spot.address}
                            {spot.city}
                            {spot.country}
                            {spot.price}
                            {spot.name}
                            {spot.state}
                            {spot.lng}
                            {spot.lat}
                        </Link>
                    </div>
                ))}
            </ul>
        </section>
    );
}
export default Spots

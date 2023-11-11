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
                {spots?.map((spot) => {
                    console.log(spots)
                    return <div>
                        <Link to={`/spots/${spot.id}`}>
                            {spot.previewImage['url']}
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
                })}
            </ul>
        </section>
    );
}
export default Spots

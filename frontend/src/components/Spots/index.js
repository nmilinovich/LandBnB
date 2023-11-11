import { useEffect, useState } from 'react';
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import SpotDetails from './SpotDetails';
const Spots = () => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const spots = useSelector((state) => state.spots)
    useEffect(() => {
        dispatch(getSpots())
        .then(() => setIsLoading(false));
    }, [dispatch])
    return (
        <section>
            <ul>
                {Object.values(spots).map((spot) => (
                    // let {name, city, address, state, country, lng, lat, price} = spot;
                    <h2>{spot.city}</h2>

                ))}
            </ul>
        </section>
    );
}
export default Spots

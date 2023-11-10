import { useEffect, useState } from 'react';
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import SpotDetails from './SpotDetails';
const Spots = () => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const spots = useSelector((state) => state.spots)
    console.log(spots)
    useEffect(() => {
        dispatch(getSpots()).then(() => setIsLoading(false))
    }, [dispatch])
    return (
        <section>
            <ul>
                {Object.values(spots).map((spot) => (
                <SpotDetails
                    spot={spot}
                    key={spot.id}
                />
                ))}
            </ul>
        </section>
    );
}
export default Spots

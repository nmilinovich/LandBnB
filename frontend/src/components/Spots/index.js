import React, { useEffect, useState } from 'react';
import { getSpots } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";

const Spots = () => {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState({});
    const spots = useSelector
    useEffect(() => {
        const spots = dispatch(getSpots())
    }, [dispatch])
    return (
        <div>
            {spots}
        </div>
    );
}

export default Spots

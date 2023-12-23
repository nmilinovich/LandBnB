import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import DeleteSpotButton from '../Navigation/UpdateSpotButton';
const UserSpots = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])
    let user = useSelector((state) => state.session.user?.id)
    let spots = useSelector((state) => state.spots);
    console.log(spots)
    let userSpots = Object.values(spots).filter((spot) => spot.ownerId === user);
    console.log(userSpots)
    return (
        userSpots.length ? userSpots.map((spot) =>
            <ul>
                <div >
                    <Link className='tile' to={`/spots/${spot.id}`}>
                        {spot.previewImage && <img src={spot.previewImage['url']} alt='preview'/>}
                        <div className='location'>
                            {spot.city + ', '}
                            {spot.state + ' '}
                            <i class="fa-solid fa-star"> {spot.avgRating?.toFixed(1) ?? 'new'}</i>
                        </div>
                            <DeleteSpotButton spotId={spot.id}/>
                        <div>
                        </div>
                        {spot.country + ' '}
                        <div className='price'>
                            {spot.price.toFixed(2) + ' '}
                            <label>night</label>
                        </div>
                    </Link>
                </div>
            </ul>
        )
            : <NavLink to='/spots/new'>Create a New Spot</NavLink>
    )
}

export default UserSpots;

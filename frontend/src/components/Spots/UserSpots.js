import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import DeleteSpotButton from '../Navigation/DeleteSpotButton';
import UpdateSpotButton from '../Navigation/UpdateSpotButton';
import './Spots.css'
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
        <ul>
            <div className='spots-grid-container'>
                {userSpots.length ? userSpots.map((spot) =>
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
                                    {spot.price.toFixed(2) + ' '}
                                    <label>night</label>
                                </div>
                            </Link>
                            <UpdateSpotButton spotId={spot.id}/>
                            <button>
                            <DeleteSpotButton spotId={spot.id}/>
                            </button>
                        </div>
                )
                    : <NavLink to='/spots/new'>Create a New Spot</NavLink>
                }
            </div>
        </ul>


    )
}

export default UserSpots;

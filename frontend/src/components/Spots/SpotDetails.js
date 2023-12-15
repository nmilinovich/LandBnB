import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSpotDetails } from '../../store/spots';
import './SpotDetails.css';
import { getSpotReviews } from '../../store/reviews';
const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const id = parseInt(spotId);
    useEffect(() => {
        dispatch(getSpotDetails(id))
        dispatch(getSpotReviews(id))
    }, [dispatch, id]);
    let spot = useSelector((state) => state.spots[id]);
    let reviews = useSelector((state) => Object.values(state.reviews));
    let spotsReviews = reviews.filter(review => review.spotId === id);
    if(!spot) {
        return <div>Loading...</div>;
    }
    if (spot) {
        return (
            <section>
                <div className="card">
                    <h1>{spot.name}</h1>
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>

                    {spot.SpotImages?.map(image => {
                        return <img className={image['preview'] ? 'previewImg' : 'otherImg'} src={`${image['url']}`} alt='image'/>
                    })
                    }

                    <div>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
                    {spot.avgStarRating}
                    <p>{spot.description}</p>
                    <div className='infoBox'>
                        <div className='info'>
                            <span>
                                {'$'+spot.price.toFixed(2)+' night'}
                            </span>
                            {' '}
                            <i class="fa-solid fa-star" />
                            {' '}
                            <span>
                                {spot.avgStarRating?.toFixed(1) ?? 'new' + ' '}
                            </span>
                            { spot.numReviews ?
                                <span>
                                    {spot.numReviews + ' review'}{spot.numReviews !== 1 ? 's' : 's'}
                                </span>
                                : null
                            }
                        </div>
                        <button onClick={() => alert('Feature coming soon.')}>Reserve</button>
                    </div>
                </div>
                <div className='reviewSection'>
                    <header>
                        <i class="fa-solid fa-star"/>
                        {' '}
                        <span>
                            {spot.avgStarRating?.toFixed(1) ?? 'new' + ' '}
                        </span>
                        {spot.numReviews ?
                            <span> ˙ {spot.numReviews + ' review'}{spot.numReviews !== 1 ? 's' : 's'}</span>
                            : null
                        }
                    </header>
                    <section>
                        {spotsReviews?.map(review => {
                            return (
                                <div className='reviewCard'>
                                    <div className='reviewOwner'>{review.User.firstName}</div>
                                    <div className='reviewDate'>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                                    <div className='review'>{review.review}</div>
                                </div>
                            )
                        })}
                    </section>

                </div>
          </section>
        );
    }

}

export default SpotDetails;

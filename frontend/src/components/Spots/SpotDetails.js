import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSpotDetails } from '../../store/spots';
import './SpotDetails.css';
import { getSpotReviews } from '../../store/reviews';
import CreateReviewButton from '../Navigation/CreateReviewButton';
import DeleteReviewButton from '../Navigation/DeleteReviewButton';
const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const id = parseInt(spotId);
    let user = useSelector((state) => state.session.user?.['id']);
    let spot = useSelector((state) => state.spots[id]);
    let reviews = useSelector((state) => Object.values(state.reviews));
    let spotsReviews = reviews.filter(review => review.spotId === id);
    console.log(spotsReviews)
    let userHasReview = Object.values(spotsReviews.filter(review => review.userId === user)).length > 0;
    useEffect(async () => {
        dispatch(getSpotDetails(id))
        dispatch(getSpotReviews(id))
    }, [dispatch, id]);

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
                        return <img key={image.url} className={image['preview'] ? 'previewImg' : 'otherImg'} src={`${image['url']}`} alt='image'/>
                    })
                    }
                    <div>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
                    <p>{spot.description}</p>
                    <div className='infoBox'>
                        <div className='info'>
                            <span>
                                {'$'+spot.price.toFixed(2)+' night'}
                            </span>
                            {' '}
                            <i className="fa-solid fa-star" />
                            {' '}
                            <span>
                                {spot.avgStarRating?.toFixed(1) ?? 'new' + ' '}
                            </span>
                            {' ˙ '}
                            {spot.numReviews ?
                                <span>
                                    {spot.numReviews + ' review'}{spot.numReviews !== 1 ? 's' : ''}
                                </span>
                                : null
                            }
                        </div>
                        <button onClick={() => alert('Feature coming soon.')}>Reserve</button>
                    </div>
                </div>
                <div className='reviewSection'>
                    <header>
                        <i className="fa-solid fa-star"/>
                        {' '}
                        <span>
                            {spot.avgStarRating?.toFixed(1) ?? 'new' + ' '}
                        </span>
                        {spot.numReviews ?
                            <span> ˙ {spot.numReviews + ' review'}{spot.numReviews !== 1 ? 's' : ''}</span>
                            : null
                        }
                    </header>
                    <section>

                        {(user && !userHasReview && user !== spot.Owner?.id) ?
                        <CreateReviewButton />
                        : null
                        }
                        {spotsReviews?.length ?
                            spotsReviews.map(review => {
                                return (
                                    <div className='reviewCard' key={review.id}>
                                        <div className='reviewOwner'>{review.User?.firstName}</div>
                                        <div className='reviewDate'>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                                        <div className='review'>{review.review}</div>

                                            {user === review.userId ? <DeleteReviewButton reviewId={review.id} /> : null}
                                    </div>
                                )
                            })
                            :
                            user && <div>Be the first to Post a review</div>
                        }
                    </section>
                </div>

            </section>
        );
    }
}

export default SpotDetails;

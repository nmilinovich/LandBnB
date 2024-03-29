import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSpotDetails } from '../../store/spots';
import { getSpots } from '../../store/spots';
import './SpotDetails.css';
import { getSpotReviews } from '../../store/reviews';
import CreateReviewButton from '../Navigation/CreateReviewButton';
import DeleteReviewButton from '../Navigation/DeleteReviewButton';
const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const id = parseInt(spotId);
    useEffect(async () => {
        await dispatch(getSpotDetails(id));
        await dispatch(getSpotReviews(id));
        // dispatch(getSpots());
    }, [dispatch, id]);
    let user = useSelector((state) => state.session.user?.['id']);
    let spot = useSelector((state) => state.spots[id]);
    let reviews = useSelector((state) => Object.values(state.reviews));
    let spotsReviews = reviews.filter(review => review.spotId === id);
    let userHasReview = Object.values(spotsReviews.filter(review => review.userId === user)).length > 0;

    if(!spot) {
        return <div>Loading...</div>;
    }
    if (spot) {
        return (
            <section>
                <div className="card">
                    <h1>{spot.name}</h1>
                    <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                    <ul className='img-container'>
                        {spot.SpotImages?.map((image, i = 0) => {
                            i += 1
                            return <img id={image.preview === true ? 'previewImg' : `image${i}`} key={i} className={image.preview === true ? 'previewImg' : 'otherImg' || (image['preview'] ? `previewImg ${i}` : `otherImg ${i}`)} src={`${image['url']}`} alt='image'/>
                        })
                        }
                    </ul>
                        <div className='hostName'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>

                    <div className='descriptionDiv'>
                        <span className='description'>{spot.description}</span>
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

                                {spot.numReviews > 0 ?
                                    <span>
                                        {' · ' + spot.numReviews + ' review'}{spot.numReviews == 1 ? '' : 's'}
                                    </span>
                                    : null
                                }
                            </div>
                            <button className='reserveBtn' onClick={() => alert('Feature coming soon.')}>Reserve</button>
                        </div>
                    </div>

                </div>
                <div className='reviewSection'>
                    <header>
                        <i className="fa-solid fa-star"/>
                        {' '}
                        <span>
                            {spot.avgStarRating?.toFixed(1) ?? 'new' + ' '}
                        </span>
                        {spot.numReviews > 0 ?
                            <span> · {spot.numReviews + ' review'}{spot.numReviews == 1 ? '' : 's'}</span>
                            : null
                        }
                    </header>
                    <section>
                        {(user && !userHasReview && user !== spot.Owner?.id) ?
                            <CreateReviewButton />
                        : null
                        }
                    <div className='review-container'>
                        {spotsReviews?.length ?
                            spotsReviews.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(review => {
                                return (
                                    <div>
                                        <div className='reviewCard' key={review.id}>
                                            <div className='reviewOwner'>{review.User?.firstName}</div>
                                            <div className='reviewDate'>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                                            <div className='border'>
                                            </div>
                                            <div className='review'>{review.review}</div>
                                                {user === review.userId ? <button className='delRvwBtnCont'><DeleteReviewButton reviewId={review.id} spotId={id} /></button> : null}
                                        </div>
                                        <p></p>
                                    </div>

                                )
                            })
                            :
                            user && user !== spot.Owner?.id && <div>Be the first to Post a review</div>
                        }
                    </div>
                    </section>
                </div>
            </section>
        );
    }
}

export default SpotDetails;

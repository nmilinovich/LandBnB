import { useState } from 'react';
import { postNewSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import './PostSpot.css';
import { useHistory } from 'react-router-dom';
function PostSpotForm() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [errors, setErrors] = useState({});
    const [urlImages, setUrlImages] = useState([...Array(5)].map(_ => ''));
    let history = useHistory()
    // const [previewImage, setPreviewImage] = useState('')
    // const [spotImages, setSpotImages] = useState([])
    // const ownerId = state.session.id;
    const onSubmit = e => {
        setErrors({});
        e.preventDefault();
        const Spot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };
        let errHits = {}
        if (!country) {
            errHits.country = "Country is required."
        }
        if (!urlImages[0]) {
            errHits.urlImages = "You must provide a preview image for your spot.";
        }
        if (!address) {
            errHits.address = "Address is required.";
        }
        if (!city) {
            errHits.city = "City is required.";
        }
        if (!state) {
            errHits.state = "State is required.";
        }
        if (lat > 90 || lat < -90 || !lat) {
            errHits.lat = "Latitude is not valid.";
        }
        if (lng < -180 || lng > 180 || !lng) {
            errHits.lng = "Longitude is not valid.";
        }
        if (description.length < 30) {
            errHits.description = "Description must be more than 30 characters.";
        }
        if (!name || name.length > 50) {
            errHits.name = "Name must be less than 50 characters.";
        }
        if (typeof price !== 'number' || price < 0.01) {
            errHits.price = "Price per day is required.";
        }
        setErrors(errHits);
        if (!Object.values(errHits).length) {
            return dispatch(postNewSpot(Spot, urlImages.filter((url) => url)))
            .then((newSpot) => history.push(`/spots/${newSpot.id}`))
            .catch(async (res) => {
                const data = await res.json();
                console.log(errors);
                console.log(errHits)
                return setErrors(errors)
            });
        }
    };

    return (
        <section className='page'>
            <h2 className='createSpotH2'>Create a new Spot</h2>
            <h2 className='where'>Where's your place located?</h2>
            <div className='guestsDiv'>
                <p className='guestsP'>
                    Guests will only get your exact address once they booked a reservation.
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <div>Country: {errors.country && <p className='error'>{errors.country}</p>}
                </div>
                    <label htmlFor='country'>
                        <input
                            placeholder='Country'
                            id='country'
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        />
                    </label>
                <div>Street Address: {errors.address && <p className='error'>{errors.address}</p>}
                </div>
                    <label className="address" htmlFor='address'>
                        <input
                            placeholder='Address'
                            id='address'
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                        />
                    </label>
                <div className='cityStateDiv'>
                    <div>City: {errors.city && <p className='error'>{errors.city}</p>}</div>
                    <div>State: {errors.state && <p className='error'>{errors.state}</p>}</div>
                </div>
                <span className='cityStateDiv'>
                    <label htmlFor='city' className='cityLabel'>
                        <input
                        placeholder='City'
                        id='city'
                        type='text'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                    />
                    </label>
                    {','}
                    <label htmlFor='state' className='stateLabel'>
                        <input
                        placeholder='State'
                        id='state'
                        type='text'
                        onChange={e => setState(e.target.value)}
                        value={state}
                    />
                    </label>
                </span>
                <div className='latLngDiv'>
                    <div>Latitude: {errors.lat && <p className='error'>{errors.lat}</p>}</div>
                    <div>Longitude: {errors.lng && <p className='error'>{errors.lng}</p>}</div>
                </div>
                <span className='latLngSpan'>
                    <label htmlFor='lat' className='latLabel'>
                        <input
                        placeholder='latitude'
                        id='lat'
                        type='text'
                        onChange={e => setLat(e.target.value)}
                        value={lat}
                    />
                    </label>
                    <span className='latLngCom'>,</span>
                    <label htmlFor='lng' className='LngLabel'>
                        <input
                        placeholder='longitude'
                        id='lng'
                        type='text'
                        onChange={e => setLng(e.target.value)}
                        value={lng}
                    />
                    </label>
                </span>
                <hr className='hr'/>
                <h2 className='describe'>Describe your place to guests</h2>
                <p>
                    Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
                </p>
                <div className='describeDiv'>
                <label htmlFor='description'>
                    <textarea
                        placeholder='Please write at least 30 characters'
                        id='description'
                        type='text'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    >
                    </textarea>
                </label>
                {errors.description && <p className='error'>{errors.description}</p>}
                </div>
                <hr className='hr'/>
                <h2 className='createH2'>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div>
                <label htmlFor='name' >
                    <input
                        className='nameInput'
                        placeholder='Name of your spot'
                        id='name'
                        type='text'
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </label>
                {errors.name && <p className='error'>{errors.name}</p>}
                </div>
                <hr className='hr'/>
                <h2 className='setPriceH2'>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div>
                <label htmlFor='price' className='$'>
                    ${' '}
                    <input
                        placeholder="Price per night (USD)"
                        id='price'
                        type='text'
                        onChange={e => setPrice(parseFloat(e.target.value))}
                        value={price}
                    />
                </label>
                {errors.price && <p className='error'>{errors.price}</p>}
                </div>
                <hr className='hr'/>
                <h2 className='livenH2'>Liven up your spot with photos</h2>
                <div>Submit a link to at least one photo to publish your spot.</div>
                <div className='imageTextAreas'>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className='imageUrl'>
                            <label htmlFor={`image-${i}`}>
                                <input
                                    placeholder={i === 0 ? 'Preview Image URL:' : 'Image URL'}
                                    id={`image-${i}`}
                                    type='text'
                                    onChange={e => setUrlImages(urlImages => {
                                        urlImages[i] = e.target.value;
                                        return [...urlImages];
                                    })}
                                    value={urlImages[i]}
                                />
                            </label>
                        </div>
                    ))}
                    {errors.urlImages && <p className='error'>{errors.urlImages}</p>}
                </div>
                <hr className='hr'/>
                <div className='createDiv'>
                    <button id='spotCreateBtn'>Create Spot</button>
                </div>
            </form>
        </section>
  );
}

export default PostSpotForm;

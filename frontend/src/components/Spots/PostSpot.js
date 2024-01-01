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

        // if (errors.keys) {
        //     null;
        // } else {
            return dispatch(postNewSpot(Spot, urlImages.filter((url) => url)))
            .then((newSpot) => history.push(`/spots/${newSpot.id}`))
            .catch(async (res) => {
                const data = await res.json();
                if (!country) {
                    errors.country = "Country is required.";
                }
                if (!address) {
                    errors.address = "Address is required.";
                }
                if (!city) {
                    errors.city = "City is required.";
                }
                if (!state) {
                    errors.state = "State is required.";
                }
                if (lat > 90 || lat < -90 || !lat) {
                    errors.lat = "Latitude is not valid.";
                } else {
                    errors.lat = null;
                }
                if (lng < -180 || lng > 180 || !lng) {
                    errors.lng = "Longitude is not valid.";
                } else {
                    errors.lng = null;
                }
                if (description.length < 30) {
                    errors.description = "Description must be more than 30 characters.";
                }
                if (!name || name.length > 50) {
                    errors.name = "Name must be less than 50 characters.";
                }
                if (typeof price !== 'number' || price < 0.01) {
                    errors.price = "Price per day is required.";
                }
                if (!urlImages[0]) {
                    errors.urlImages = "You must provide a preview image for your spot."
                }
                console.log(errors)
                return setErrors(errors)
            });

            setCountry('');
            setAddress('');
            setCity('');
            setState('');
            setLat(0);
            setLng(0);
            setDescription('');
            setName('');
            setPrice(null);
            setUrlImages([]);
        // }
    };

    return (
        <section>
        <h2>Create a new Spot</h2>
        <h3>Where's your place located?</h3>
        <p>
            Guests will only get your exact address once they booked a reservation.
        </p>
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
                <label htmlFor='address'>

                    <input
                        placeholder='Address'
                        id='address'
                        type='text'
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                    />
                </label>
            <div>City: {errors.city && <p className='error'>{errors.city}</p>}
                State: {errors.state && <p className='error'>{errors.state}</p>}
            </div>
            <label htmlFor='city'>
                <input
                placeholder='City'
                id='city'
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
            />
            </label>
            {','}
            <label htmlFor='state'>
                <input
                placeholder='State'
                id='state'
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
            />
            </label>
            <div>Latitude: {errors.lat && <p className='error'>{errors.lat}</p>}
                Longitude: {errors.lng && <p className='error'>{errors.lng}</p>}
            </div>
            <label htmlFor='lat'>
                <input
                placeholder='latitude'
                id='lat'
                type='text'
                onChange={e => setLat(e.target.value)}
                value={lat}
            />
            </label>
            <label htmlFor='lng'>
                <input
                placeholder='longitude'
                id='lng'
                type='text'
                onChange={e => setLng(e.target.value)}
                value={lng}
            />
            </label>
            <h2>Describe your place to guests:</h2>
            <p>
                Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
            </p>
            <div>
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
            <h2>Create a title for your spot:</h2>
            <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
            <div>
            <label htmlFor='name'>
                <input
                placeholder='Name of your spot'
                    id='name'
                    type='text'
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
            </label>
            {errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <h2>Set a base price for your spot:</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <div>
            <label htmlFor='price' className='$'>
                $
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
            <h2>Liven up your spot with photos</h2>
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

            <button>Create Spot</button>
        </form>
        </section>
  );
}

export default PostSpotForm;

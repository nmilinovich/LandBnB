import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PostSpot.css';
import { useHistory } from 'react-router-dom';
import { editSpot } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
function EditSpotForm() {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId);

    const spots = useSelector((state) => Object.values(state.spots));
    const oldSpot = spots.find(spot => spot.id === spotId)
    // const getImgs = async () => {
    //     await csrfFetch(`/api/spots/${editedSpot.id}/images`);
    //     console.log(getImgs())
    // }
    const [country, setCountry] = useState(oldSpot?.country);
    const [address, setAddress] = useState(oldSpot?.address);
    const [city, setCity] = useState(oldSpot?.city);
    const [state, setState] = useState(oldSpot?.state);
    const [lat, setLat] = useState(oldSpot?.lat);
    const [lng, setLng] = useState(oldSpot?.lng);
    const [description, setDescription] = useState(oldSpot?.description);
    const [name, setName] = useState(oldSpot?.name);
    const [price, setPrice] = useState(oldSpot?.price);
    const [errors, setErrors] = useState({});
    const [urlImages, setUrlImages] = useState( [...Array(5)].map(_ => ''));
    let history = useHistory()
    // const [previewImage, setPreviewImage] = useState('')
    // const [spotImages, setSpotImages] = useState([])
    // const ownerId = state.session.id;
    const onSubmit = e => {
        setErrors({});
        e.preventDefault();
        const editedSpot = {
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
        return dispatch(editSpot(editedSpot, urlImages.filter((url) => url)))
        .then((editedSpot) => history.push(`/spots/${editedSpot.id}`))
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
            setPrice(0);
            setUrlImages([]);
    };

    return (
        <section>
        <h2>Create a new Spot</h2>
        <h3>Where's your place located?</h3>
        <p>
            Guests will only get your exact address once they booked a reservation.
        </p>
        <form onSubmit={onSubmit}>
            <div>
            <label htmlFor='country'>
                Country:
                <input
                    id='country'
                    type='text'
                    onChange={e => setCountry(e.target.value)}
                    value={country ? country : ''}
                />
            </label>
            {errors.country && <p className='error'>{errors.country}</p>}
            </div>
            <div>
            <label htmlFor='address'>
                Street Address:
                <input
                id='address'
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address ? address : ''}
            />
            </label>
            {errors.address && <p className='error'>{errors.address}</p>}
            </div>
            <div>
            <label htmlFor='city'>
                City:
                <input
                id='city'
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city ? city : ''}
            />
            </label>
            {errors.city && <p className='error'>{errors.city}</p>}
            </div>
            <div>
            <label htmlFor='state'>
                State:
                <input
                id='state'
                type='text'
                onChange={e => setState(e.target.value)}
                value={state ? state : ''}
            />
            </label>
            {errors.state && <p className='error'>{errors.state}</p>}
            </div>
            <div>
            <label htmlFor='lat'>
                Latitude:
                <input
                id='lat'
                type='text'
                onChange={e => setLat(e.target.value)}
                value={lat ? lat : 0}
            />
            </label>
            {errors.lat && <p className='error'>{errors.lat}</p>}
            </div>
            <div>
            <label htmlFor='lng'>
                Longitude:
                <input
                id='lng'
                type='text'
                onChange={e => setLng(e.target.value)}
                value={lat ? lat : 0}
            />
            </label>
            {errors.lng && <p className='error'>{errors.lng}</p>}
            </div>
            <h2>Describe your place to guests:</h2>
            <p>
                Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
            </p>
            <div>
            <label htmlFor='description'>
            <input
                placeholder='Please write at least 30 characters'
                id='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description ? description : ''}
            />
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
                    value={name ? name : ''}
                />
            </label>
            {errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <h2>Set a base price for your spot:</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <div>
            <label htmlFor='price'>
                <input
                    placeholder="Price per night (USD)"
                    id='price'
                    type='text'
                    onChange={e => setPrice(e.target.value)}
                    value={price ? price : 0}
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

export default EditSpotForm;

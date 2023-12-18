import { useState } from 'react';
import { postNewSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
function PostSpotForm() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [urlImages, setUrlImages] = useState([...Array(5)].map(_ => ''));
    // const [previewImage, setPreviewImage] = useState('')
    // const [spotImages, setSpotImages] = useState([])
    // const ownerId = state.session.id;
  const onSubmit = e => {
    e.preventDefault();
    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    //   previewImage,
    // spotImages,
    // ownerId
    };

    dispatch(postNewSpot(newSpot, urlImages.filter((url) => url)));
    setName('');
  };

  return (
    <section>
      <h2>Create a new Spot</h2>
      <h3>Where's your place located?</h3>
      <caption>Guests will only get your exact address once they booked a reservation.
      </caption>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='country'>Country:</label>
          <input
            id='country'
            type='text'
            onChange={e => setCountry(e.target.value)}
            value={country}
          />
        </div>
        <div>
          <label htmlFor='address'>Street Address:</label>
          <input
            id='address'
            type='text'
            onChange={e => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            id='city'
            type='text'
            onChange={e => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            id='state'
            type='text'
            onChange={e => setState(e.target.value)}
            value={state}
          />
        </div>
        <div>
          <label htmlFor='lat'>Latitude:</label>
          <input
            id='lat'
            type='text'
            onChange={e => setLat(e.target.value)}
            value={lat}
          />
        </div>
        <div>
          <label htmlFor='lng'>Longitude:</label>
          <input
            id='lng'
            type='text'
            onChange={e => setLng(e.target.value)}
            value={lng}
          />
        </div>
        <h2>Describe your place to guests:</h2>
        <caption>
            "Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.
        </caption>
        <div>
          <label htmlFor='description'></label>
          <input
            placeholder='Please write at least 30 characters'
            id='description'
            type='text'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <h2>Create a title for your spot:</h2>
        <caption>Catch guests' attention with a spot title that highlights what makes your place special.</caption>
        <div>
          <label htmlFor='name'></label>
          <input
          placeholder='Name of your spot'
            id='name'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <h2>Set a base price for your spot:</h2>
        <caption>Competitive pricing can help your listing stand out and rank higher in search results.</caption>
        <div>
          <label htmlFor='price'></label>
          <input
            placeholder="Price per night (USD)"
            id='price'
            type='text'
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <h2>Liven up your spot with photos</h2>
        <caption>Submit a link to at least one photo to publish your spot.</caption>
        {[...Array(5)].map((_, i) => (
            <div key={i}>
                <label htmlFor={`image-${i}`}></label>
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
            </div>
        ))}
        <button>Create Spot</button>
      </form>
    </section>
  );
}

export default PostSpotForm;

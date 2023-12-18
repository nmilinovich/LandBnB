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
      <p>Guests will only get your exact address once they booked a reservation.
      </p>
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
        <div>
          <label htmlFor='description'>Describe your place to guests:</label>
          <input
            id='description'
            type='text'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <label htmlFor='name'>Create a title for your spot:</label>
          <input
            id='name'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor='price'>Set a base price for your spot:</label>
          <input
            id='price'
            type='text'
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        {[...Array(5)].map((_, i) => (
            <div key={i}>
                <label htmlFor={`image-${i}`}>{i === 0 ? 'Preview Image URL:' : 'Image URL'}</label>
                <input
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
        <button>Submit</button>
      </form>
    </section>
  );
}

export default PostSpotForm;

import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

const SpotDetails = ({ spot }) => {
    const dispatch = useDispatch();
    return (
        <li>
            <div className="card">
            <Link to={`/spots/${spot.id}`}>
                {spot.name}
                {spot.address}
                {spot.country}
                {spot.state}
                {spot.city}
                {spot.avgRating}
                {spot.description}
                {spot.lat}
                {spot.lng}
                {spot.price}
                {/* {spot.previewImage.url} */}
            </Link>
            </div>
      </li>
    );
}

export default SpotDetails;

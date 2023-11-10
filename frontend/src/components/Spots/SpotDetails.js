import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

const SpotDetails = ({ spot }) => {
    const dispatch = useDispatch();
    // return (
    //     <li>
    //     <div className="li-contents-flex">
    //       <Link to={`/reports/${spot.id}`}>Report #{report.id}</Link>
    //       <div className="buttons-container">
    //         <Link
    //           className="edit-link"
    //           to={`/reports/${report.id}/edit`}
    //         >
    //           Edit
    //         </Link>
    //         <button onClick={handleDelete}>Delete</button>
    //       </div>
    //     </div>
    //   </li>
    // );
}

export default SpotDetails;

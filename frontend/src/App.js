import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotDetails from "./components/Spots/SpotDetails";
import PostSpotForm from "./components/Spots/PostSpot";
import UserSpots from "./components/Spots/UserSpots"
import EditSpotForm from "./components/Spots/EditUserSpot";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path = '/spots/new' component={PostSpotForm} />
          <Route exact path = '/spots/current' component={UserSpots} />
          <Route exact path = '/spots/:spotId/edit' component={EditSpotForm} />
          <Route path = '/spots/:spotId' component={SpotDetails} />
          <Route path = {'/' || '/spots'}component={Spots}/>
        </Switch>}
    </>
  );
}

export default App;

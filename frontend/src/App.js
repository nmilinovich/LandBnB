import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotDetails from "./components/Spots/SpotDetails";
import PostSpotForm from "./components/Spots/PostSpot";
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
          <Route exact path = '/spots/current' component={PostSpotForm} />
          <Route path = '/spots/:spotId' component={SpotDetails} />
          <Route path = {'/' || '/spots'}component={Spots}/>
        </Switch>}
    </>
  );
}

export default App;

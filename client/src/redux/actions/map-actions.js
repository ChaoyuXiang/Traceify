import axios from 'axios/index';
import * as actions from '../constants/action-types';

export const toggleHeatLayer = () => ({
  type: actions.SHOW_HEAT_LAYER,
});

export const toggleMarkers = () => ({
  type: actions.SHOW_MARKERS,
});

export const toggleOutbreakMarkers = () => ({
  type: actions.SHOW_OUTBREAK_MARKERS,
});

export const fetchLocationsSuccess = (locations, outbreaks) => ({
  type: actions.FETCH_LOCATIONS_SUCCESS,
  payload: {
    data: locations,
    outbreaks: outbreaks,
  },
});

export const fetchLocationsFailure = (error) => ({
  type: actions.FETCH_LOCATIONS_FAILURE,
  payload: {
    error,
  },
});

export const fetchLocations = () => (dispatch) => {
  const getAllData = axios.get('/api/location-trace');
  const getOutbreakData = axios.get('/api/location-outbreak');
  axios
    .all([getAllData, getOutbreakData])
    .then(
      axios.spread((...responses) => {
        const locations = responses[0].data;
        const outbreaks = responses[1].data;
        return { locations, outbreaks };
      })
    )
    .then((res) => {
      let locationsWithType = [];
      let outbreaksWithType = [];
      for (let i = 0; i < res.locations.length; i++) {
        const newObj = { ...res.locations[i], type: 'location' };
        locationsWithType.push(newObj);
      }
      for (let i = 0; i < res.outbreaks.length; i++) {
        const newObj = { ...res.outbreaks[i], type: 'outbreak' };
        outbreaksWithType.push(newObj);
      }
      return { locationsWithType, outbreaksWithType };
    })
    .then((res) => {
      dispatch(
        fetchLocationsSuccess(res.locationsWithType, res.outbreaksWithType)
      );
    })
    .catch((err) => {
      dispatch(fetchLocationsFailure(err));
      console.log(err);
    });
};

export const setGlobalMap = (map) => ({
  type: actions.SET_MAP,
  payload: map,
});

export const setVisibleMarkers = (markers) => ({
  type: actions.SET_VISIBLE_MARKERS,
  payload: markers,
});

export const setActiveMarker = (markerId) => ({
  type: actions.SET_ACTIVE_MARKER,
  payload: markerId,
});

export const setPanToLocation = (latLng) => ({
  type: actions.SET_PAN_TO_LOCATION,
  payload: latLng,
});

import {createContext, useEffect, useState} from "react";
import SpaceXAPI from "../services/spacex";

const itemsPerPage = 9;

export const AppContext = createContext({
  appData: [],
  favourites: [],
  setFavourites: (fav) => {},
  filteredData: [],
  setFilteredData: (data) => {},
  page: 1,
  setPage: (page) => {},
  itemsPerPage
})

const AppProvider = ({children}) => {
  const [rockets, setRockets] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRocketData = async () => {
      const spaceXApi = new SpaceXAPI();
      const response = await spaceXApi.getRockets();
      setRockets(response.data);
    }
    const fetchLaunchesData = async () => {
      const spaceXApi = new SpaceXAPI();
      const response = await spaceXApi.getLaunches();
      setLaunches(response.data);
    }
    fetchRocketData()
    fetchLaunchesData();
    const storedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (storedFavourites) {
      setFavourites(storedFavourites);
    }
  }, [])

  useEffect(() => {
    if (favourites.length) {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [favourites])

  const launchRocket = (searchRocket, rockets) => {
    const rocketFound = rockets.find(rocket => searchRocket.rocket_id === rocket.rocket_id);
    return {
      rocketId: searchRocket.rocket_id,
      description: rocketFound.description,
      rocketName: searchRocket.rocket_name,
      active: rocketFound.active,
      costPerLaunch: rocketFound.cost_per_launch,
      company: rocketFound.company,
      image: rocketFound.flickr_images.shift(),
    }
  }

  useEffect(() => {
    const mergeRocketsAndLaunches = (rockets, launches) => {
      return launches.map(launch => ({
        flightNumber: launch.flight_number,
        missionName: launch.mission_name,
        launchDateUnix: launch.launch_date_unix,
        details: launch.details,
        missionPatch: launch.links.mission_patch,
        rocket: launchRocket(launch.rocket, rockets)
      }))
    }
    if (rockets.length && launches.length) {
      const appData = mergeRocketsAndLaunches(rockets, launches);
      setMergedData(appData);
      setFilteredData(appData);
    }
  }, [rockets, launches]);

  return (
    <AppContext.Provider value={{
      appData: mergedData,
      favourites,
      setFavourites,
      filteredData,
      setFilteredData,
      page,
      setPage,
      itemsPerPage,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;

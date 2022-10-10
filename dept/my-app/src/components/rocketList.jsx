import {useEffect, useState} from "react";
import SpaceXAPI from "../services/spacex";
import StarFilled from "../assets/starFilled";
import StarEmpty from "../assets/starEmpty";

const parseDate = (unixDate) => {
  const parsedDate = new Date(unixDate * 1000);
  return `${parsedDate.toLocaleString('default', { month: 'long' })} ${parsedDate.getDay()}, ${parsedDate.getFullYear()}`
}

const RocketItem = ({launch, favourites, setFavourites}) => {
  const [isFavourite, setIsFavourite] = useState({
    flightNumber: launch.flightNumber,
    isFavourite: favourites.find(fav => fav.flightNumber === launch.flightNumber)?.isFavourite || false
  });

  useEffect(() => {
    let newFavourites = [...favourites];
    const favouriteIndex = newFavourites.findIndex(favourite => favourite.flightNumber === isFavourite.flightNumber);
    if (favouriteIndex !== -1) {
      newFavourites[favouriteIndex] = {
        ...newFavourites[favouriteIndex],
        isFavourite: isFavourite.isFavourite
      }
    } else {
      newFavourites.push({
        flightNumber: isFavourite.flightNumber,
        isFavourite: isFavourite.isFavourite,
      })
    }
    setFavourites(newFavourites);
  }, [isFavourite]);

  return (
    <div className="rocketItem">
      <div className="imageLaunch"><img src={launch.missionPatch} alt=""/></div>
      <div className="title">{launch.rocket.rocketName}</div>
      <div className="rocketDescription">{launch.rocket.description}</div>
      <div className="launchDate">{parseDate(launch.launchDateUnix)}</div>
      <div onClick={() => setIsFavourite({
        ...isFavourite,
        isFavourite: !isFavourite.isFavourite
      })} className="isFavourite">
        {isFavourite.isFavourite ? <StarFilled /> : <StarEmpty />}
      </div>
    </div>
  )
}

const RocketList = () => {
  const [rockets, setRockets] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [favourites, setFavourites] = useState([]);
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
    console.log(storedFavourites);
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
      company: rocketFound.company
    }
  }

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

  useEffect(() => {
    if (rockets.length && launches.length) {
      setMergedData(mergeRocketsAndLaunches(rockets, launches));
    }
  }, [rockets, launches])


  return (
    <div>
      {
        mergedData.map(launch => (<RocketItem launch={launch} favourites={favourites} setFavourites={setFavourites} />))
      }
    </div>
  )
}

export default RocketList;

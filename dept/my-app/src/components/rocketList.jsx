import {useContext, useEffect, useState} from "react";
import StarFilled from "../assets/starFilled";
import StarEmpty from "../assets/starEmpty";
import {AppContext} from "../providers/rocketsDataProvider";
import Paginator from "./paginator";

const parseDate = (unixDate) => {
  const parsedDate = new Date(unixDate * 1000);
  return `${parsedDate.toLocaleString('default', { month: 'long' })} ${parsedDate.getDay()}, ${parsedDate.getFullYear()}`
}

const RocketItem = ({launch, favourites, setFavourites}) => {
  const [isFavourite, setIsFavourite] = useState(
    favourites.find(fav => fav.flightNumber === launch.flightNumber)?.isFavourite || false
  );

  useEffect(() => {
    const updateFavourites = (newFavourite) => {
      let newFavourites = [...favourites];
      const favouriteIndex = newFavourites.findIndex(favourite => favourite.flightNumber === launch.flightNumber);
      if (favouriteIndex !== -1) {
        newFavourites[favouriteIndex] = {
          ...newFavourites[favouriteIndex],
          isFavourite: newFavourite
        }
      } else {
        newFavourites.push({
          flightNumber: launch.flightNumber,
          isFavourite: newFavourite,
        })
      }
      return newFavourites;
    }
    const newFavourites = updateFavourites(isFavourite);
    setFavourites(newFavourites);
  }, [isFavourite]);

  return (
    <div className="rocketItem">
      <div className="imageRocket"><img src={launch.missionPatch} alt=""/></div>
      <div className="rocketContent">
        <div className="title">{launch.rocket.rocketName} {launch.missionName}</div>
        <div className="rocketDescription">{launch.rocket.description}</div>
        <div className="rocketFooter">
          <div className="launchDate">{parseDate(launch.launchDateUnix)}</div>
          <div onClick={() => setIsFavourite(!isFavourite)} className="isFavourite">
            {isFavourite ? <StarFilled /> : <StarEmpty />}
          </div>
        </div>
      </div>
    </div>
  )
}

const RocketList = () => {
  const {filteredData, favourites, setFavourites, page, itemsPerPage} = useContext(AppContext);

  return (
    <div className="rocketList">
      <div className="total">Total ({filteredData.length})</div>
      {
        !filteredData.length && <div className="loading">Loading...</div>
      }
      <div className='list'>
        {
          filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(launch => (
            <RocketItem key={launch.missionName} launch={launch} favourites={favourites} setFavourites={setFavourites} />)
          )
        }
      </div>
      <Paginator />
    </div>
  )
}

export default RocketList;

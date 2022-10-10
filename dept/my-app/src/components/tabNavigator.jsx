import {useContext, useEffect} from "react";
import {AppContext} from "../providers/rocketsDataProvider";

const tabItems = [
  {
    title: 'All',
    currentPage: 'Launches',
  },
  {
    title: 'Favourites',
    currentPage: 'Favourites',
  }
];

const TabNavigator = ({currentPage, setCurrentPage}) => {
  const {setFilteredData, appData, favourites, setPage} = useContext(AppContext)

  useEffect(() => {
    if (currentPage === 'Launches') {
      setFilteredData(appData);
    } else {
      setFilteredData(appData.filter(launch => favourites.find(fav => (fav.flightNumber === launch.flightNumber) && fav.isFavourite)))
    }
  }, [currentPage, favourites])

  useEffect(() => {
    setPage(1);
  }, [currentPage]);

  return (
    <div className='navigator'>
      <ul>
        {tabItems.map(item => (
          <li key={item.currentPage} onClick={() => setCurrentPage(item.currentPage)}
              className={currentPage === item.currentPage ? 'isActive' : ''}>
            <button>{item.title}</button>
          <
        /li>))}
      </ul>
    </div>
  )
}

export default TabNavigator;

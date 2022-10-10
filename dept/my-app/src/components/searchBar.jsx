import {useContext, useEffect, useState} from "react";
import {AppContext} from "../providers/rocketsDataProvider";

const SearchBar = ({currentPage}) => {
  const {setFilteredData, appData} = useContext(AppContext);
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    setSearch('');
  }, [currentPage])

  useEffect(() => {
    setFilteredData(appData.filter(launch => launch.rocket.rocketName.toLowerCase().match(search.toLowerCase())))
  }, [search]);

  return (
    <div className="searchBar">
      <input placeholder='Search all launches...' onChange={handleSearch} value={search} type="text"/>
    </div>
  )
}

export default SearchBar;

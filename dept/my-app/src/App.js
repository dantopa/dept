import './App.css';
import RocketList from "./components/rocketList";
import Header from "./components/header";
import {useState} from "react";
import TabNavigator from "./components/tabNavigator";
import AppProvider from "./providers/rocketsDataProvider";
import SearchBar from "./components/searchBar";

function App() {
  const [currentPage, setCurrentPage] = useState('Launches');

  return (
    <div className="App">
      <AppProvider>
        <Header currentPage={currentPage}/>
        <TabNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <SearchBar />
        <RocketList/>
      </AppProvider>
    </div>
  );
}

export default App;

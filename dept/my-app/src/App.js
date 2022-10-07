import './App.css';
import RocketList from "./components/rocketList";
import Header from "./components/header";
import {useState} from "react";
import TabNavigator from "./components/tabNavigator";

function App() {
  const [currentPage, setCurrentPage] = useState('Launches');
  return (
    <div className="App">
      <Header currentPage={currentPage}/>
      <TabNavigator currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <RocketList/>
    </div>
  );
}

export default App;

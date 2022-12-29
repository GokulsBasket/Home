import { Component } from 'react';
import './App.css';
import Data from "./Components/Navbar/Navbar";
import Routers from './Components/Router';

function App() {
  return (
    <div className="App">
      <Data />
      <Routers />
    </div>
  );
}

export default App;

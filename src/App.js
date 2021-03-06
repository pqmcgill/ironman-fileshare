import React from 'react';
import './App.css';
import logo from './ironman.png';
import HomeComponent from './Home/home.component';

function App() {
  return (
    <div className="App">
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
          <a href="#" className="navbar-brand d-flex align-items-center">
          <img className="mr-2" src={logo} alt="logo" width="20" height="20" />
            <strong>Ironman Fileshare</strong>
          </a>
        </div>
      </div>
      <HomeComponent />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import logo from './images/logo.svg';
import checkmark from './images/icon-checkmark.svg';
import iconUnits from './images/icon-units.svg';
import iconDropdown from './images/icon-dropdown.svg';
import SearchBar from './component/SearchBar';
import ResultPage from './component/ResultPage';
import './App.css';

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [speedUnit, setSpeedUnit] = useState('kmh');
  const [tempUnit, setTempUnit] = useState('celsius');
  const [precipUnit, setPrecipUnit] = useState('mm');
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    // You can now use loc.latitude and loc.longitude for your weather API
    console.log('Selected location:', loc);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="units-dropdown-container">
          <button
            className="units"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img src={iconUnits} alt="units" className="units-icon" />
            <span className="units-label">Units</span>
            <img src={iconDropdown} alt="dropdown" className="dropdown-icon" />
          </button>
          {showDropdown && (
            <div className="units-dropdown">
              <div className="dropdown-section">
                <div className="dropdown-title">Temperature</div>
                <div className={`dropdown-option${tempUnit === 'celsius' ? ' selected' : ''}`} onClick={() => setTempUnit('celsius')}>
                  Celsius (°C) {tempUnit === 'celsius' && <img src={checkmark} className="tick" alt="tick" />}
                </div>
                <div className={`dropdown-option${tempUnit === 'fahrenheit' ? ' selected' : ''}`} onClick={() => setTempUnit('fahrenheit')}>
                  Fahrenheit (°F) {tempUnit === 'fahrenheit' && <img src={checkmark} className="tick" alt="tick" />}
                </div>
              </div>
              <hr className="dropdown-separator" />
              <div className="dropdown-section">
                <div className="dropdown-title">Wind Speed</div>
                <div className={`dropdown-option${speedUnit === 'kmh' ? ' selected' : ''}`} onClick={() => setSpeedUnit('kmh')}>
                  km/h {speedUnit === 'kmh' && <img src={checkmark} className="tick" alt="tick" />}
                </div>
                <div className={`dropdown-option${speedUnit === 'mph' ? ' selected' : ''}`} onClick={() => setSpeedUnit('mph')}>
                  mph {speedUnit === 'mph' && <img src={checkmark} className="tick" alt="tick" />}
                </div>
              </div>
              <hr className="dropdown-separator" />
              <div className="dropdown-section">
                <div className="dropdown-title">Precipitation</div>
                <div className={`dropdown-option${precipUnit === 'mm' ? ' selected' : ''}`} onClick={() => setPrecipUnit('mm')}>
                  Millimeters (mm) {precipUnit === 'mm' && <img src={checkmark} className="tick" alt="tick" />}
                </div>
                <div className={`dropdown-option${precipUnit === 'inch' ? ' selected' : ''}`} onClick={() => setPrecipUnit('inch')}>
                  Inches (in) {precipUnit === 'inch' && <img src={checkmark} className="tick" alt="tick" />}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <h1 className='Header-Text'>How's the sky looking today?</h1>
        <SearchBar onLocationSelect={handleLocationSelect} />
        <ResultPage location={location} speedUnit={speedUnit} tempUnit={tempUnit} precipUnit={precipUnit}/>
      </main>
    </div>
  );
}

export default App;

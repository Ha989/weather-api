import React, { useState, useEffect} from 'react';
import './App.css';

const api = {
  key: "d220d66e9a7beb51e5ab55bb14122bf3",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {

  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
        setLoading(true);
        try {
          const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
          const response = await fetch(url);
          const data = await response.json();
                   
          if (response.ok) {
            setWeatherInfo(
              `${data.name} ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
            );
            setErrorMessage("");
          } else {
            setErrorMessage(data.message);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }

        setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

    

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }
  return (
    <>
    <div className='title'> Enter your city to track weather </div>
    <form className="weather-form" onSubmit={handleSubmit}>
      <input type="text" 
      placeholder="City" 
      value={searchInput} 
      onChange={(e) => setSearchInput(e.target.value)} />
      <button>Search</button>
    </form>
    {loading ? (<div className='show-detail'>Loading...</div>
    ) : (
      <>
      {errorMessage ? (<div className='show-detail' style={{color: "red" }}>{errorMessage}</div>
      ) : (
      <div className='show-detail'>{weatherInfo}</div>
      )}
      </>
    )}
    
    
    </>
  )
}

export default App
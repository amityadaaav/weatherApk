import React, { useState } from 'react'
import "./App.css"
import axios from "axios";

const Weather = () => {
    const[city,setCity]=useState("")
    const [weather,setWeather]=useState()
    const handleInput=(e)=>{
       setCity(e.target.value)
    }
   const getWeatherinfo = async () => {
  const API = "82d133ce6ffd0c7bf1bf473f5cdfe09d";
  try {
    // &units=metric will change in celciuos
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
    console.log(response);
    console.log(response.data);
//   i want to store response in state and display and play with that's why use another useState() and store in setWether
    setWeather(response)
  } catch (error) {
    console.error("Error fetching weather:", error.response?.data || error.message);
  }
};

   const handleBtn=()=>{
       getWeatherinfo()
   }
  return (
    <div className='app-background'>
    <div className='main-container'>
      <div>
        <input className='input-group' type="text" placeholder='enter city name' value={city} onChange={handleInput}/>
      </div>
      <div>
        <button onClick={handleBtn}>get weather</button>
      </div>
      <div className='weather-info'>
        {/* Use optional chaining (?.) or conditional rendering so it doesn’t break before data is fetched. */}
        {/* <h1>{weather?.data?.name}</h1> */}

        {weather && 
        <>
         <h1>{weather.data.name}</h1>
         <p>temprature is: {weather.data.main.temp} ºC </p>
         <p>status: {weather.data.weather[0].description}</p>
        </>
       
        
        }
           
      </div>
    </div>
    </div>
  )
}

export default Weather

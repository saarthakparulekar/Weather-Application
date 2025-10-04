import React, { useEffect, useRef, useState } from "react";
import drizzle from "../images/icon-drizzle.webp";
import fog from "../images/icon-fog.webp";
import overcast from "../images/icon-overcast.webp";
import partlycloudy from "../images/icon-partly-cloudy.webp";
import rain from "../images/icon-rain.webp";
import snow from "../images/icon-snow.webp";
import storm from "../images/icon-storm.webp";
import sunny from "../images/icon-sunny.webp";
import dropdownIcon from "../images/icon-dropdown.svg"
import '../App.css';

function ResultPage({location, speedUnit, precipUnit, tempUnit}){
    const [weather, setWeather] = useState(null)
    const cacheRef = useRef({});
    useEffect(() => {
        if(!location) return;

        const cacheKey = `${location.latitude},${location.longitude},${speedUnit},${precipUnit},${tempUnit}`

        if(cacheRef.current[cacheKey]){
            setWeather(cacheRef.current[cacheKey]);
            return;
        }

        const params = [
            `latitude=${location.latitude}`,
            `longitude=${location.longitude}`,
            `daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,wind_speed_10m,precipitation,relative_humidity_2m,apparent_temperature,weather_code`,
            `windspeed_unit=${speedUnit}`,
            `temperature_unit=${tempUnit}`,
            `precipitation_unit=${precipUnit}`,
            `timezone=auto`
        ].join('&');
        const fetchWeather = async () => {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
            const data = await res.json();
            setWeather(data)
            cacheRef.current[cacheKey] = data;
        }
        fetchWeather();
    }, [location, speedUnit, tempUnit, precipUnit]
    )   

    const [showDaysDropdown, setDropDown] = useState(false);
    const [selectedDay, setDay] = useState(0);
    
    const weatherCodeMap = {
        // Sunny
        0: "sunny",
        // Partly Cloudy
        1: "partly-cloudy",
        2: "partly-cloudy",
        // Overcast
        3: "overcast",
        // Fog
        45: "fog",
        48: "fog",
        // Drizzle
        51: "drizzle",
        53: "drizzle",
        55: "drizzle",
        56: "drizzle",
        57: "drizzle",
        // Rain
        61: "rain",
        63: "rain",
        65: "rain",
        66: "rain",
        67: "rain",
        80: "rain",
        81: "rain",
        82: "rain",
        // Snow
        71: "snow",
        73: "snow",
        75: "snow",
        77: "snow",
        85: "snow",
        86: "snow",
        // Storm
        95: "storm",
        96: "storm",
        99: "storm"
    };
    const codeToIcons = {
        "fog" : fog,
        "drizzle" : drizzle,
        "overcast" : overcast,
        "partly-cloudy" : partlycloudy,
        "rain" : rain,
        "snow" : snow,
        "storm" : storm,
        "sunny" : sunny
    }
    if(!location || !weather){
        return(
            <h2 className="not-found-message">No search results found!</h2>
        )
    }
    const daysFull = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    function getDays(dateArr){
        
        const res = [];
        for(let date of dateArr){
            let d = new Date(date);
            res.push(days[d.getDay()])
        }
        return res
    }
    const daily_values = getDays(weather.daily.time);

    function getWeatherCode(code){
        let result = weatherCodeMap[code];
        return result;
    }

    const current_weather_icon = codeToIcons[getWeatherCode(weather.current.weather_code)];

    function getDateTimeData(date){
        let d = new Date(date);
        return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
    }

    function HourlyData({code, time, temp}){
        return(
            <div className="hourly-data-card">
                <img className="hourly-data-icon" alt='' src= {codeToIcons[getWeatherCode(code)]}/>
                <p className="hourly-data-time">{time}</p>
                <p className="hourly-data-temp">{temp}°</p>
            </div>
        )
    }
    const hourly_time_temp = Array.from({length : 7}, () => []);
    for(let i = 0; i < (7 * 24); i++){
        let d = new Date(weather.hourly.time[i]);
        let day = d.getDay()
        let time = d.getHours()
        if(time === 0){
            time = '12 AM';
        }else if(time > 12){
            time = (time % 12) + ' PM';
        }else if(time === 12){
            time = time + ' PM'
        }else{
            time = time + ' AM';
        }
        let temp = Math.round(weather.hourly.temperature_2m[i]);
        let code = weather.hourly.weather_code[i];
        hourly_time_temp[day].push([code, time, temp]);
    }
    console.log(hourly_time_temp);

    return(
        <div className="result-container">
            <div className="daily">
                <div className="date-time">
                    <div className="left">
                        <h1 className="header-loc">{location.name}, {location.country}</h1>
                        <p className="header-date-time">{getDateTimeData(weather.current.time)}</p>
                    </div>
                    <div className="right">
                        <img className="curr-weather-icon" src={current_weather_icon} alt="curr-weather-icon"/>
                        <h1 className="header-temp">{Math.round(weather.current.temperature_2m)}°</h1>
                    </div>
                </div>
                <div className="current-data">
                    <div className="curr-cards">
                        <p className="curr-cards-header">Feels Like</p>
                        <p className="curr-cards-results">{Math.round(weather.current.apparent_temperature)} {weather.current_units.temperature_2m}</p>
                    </div>
                    <div className="curr-cards">
                        <p className="curr-cards-header">Humidity</p>
                        <p className="curr-cards-results">{weather.current.relative_humidity_2m}%</p>
                    </div>
                    <div className="curr-cards">
                        <p className="curr-cards-header">Wind</p>
                        <p className="curr-cards-results">{weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</p>
                    </div>
                    <div className="curr-cards">
                        <p className="curr-cards-header">Precipitation</p>
                        <p className="curr-cards-results">{weather.current.precipitation} {weather.current_units.precipitation}</p>
                    </div>
                </div>
                <div className="weekly-data">
                    <h3 className="daily-forecast">Daily Forecast</h3>
                    <div className="weekly-card-container">
                        <div className="day-card">
                            <p>{daily_values[0]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[0])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[0])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[0])}°</p>
                            </div>
                        </div>
                        <div className="day-card">
                            <p>{daily_values[1]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[1])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[1])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[1])}°</p>
                            </div>
                        </div>
                        <div className="day-card">
                            <p>{daily_values[2]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[2])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[2])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[2])}°</p>
                            </div>
                        </div>
                        <div className="day-card">
                            <p>{daily_values[3]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[3])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[3])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[3])}°</p>
                            </div>
                        </div>
                        <div className="day-card">
                            <p>{daily_values[4]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[4])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[4])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[4])}°</p>
                            </div>
                        </div>
                        <div className="day-card">
                            <p>{daily_values[5]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[5])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[5])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[5])}°</p>
                            </div>
                        </div>
                        <div className="day-card">
                            <p>{daily_values[6]}</p>
                            <img className="weekly-icon" src={codeToIcons[getWeatherCode(weather.daily.weather_code[6])]} alt="dc-img"/>
                            <div className="weekly-max-min">
                                <p>{Math.round(weather.daily.temperature_2m_max[6])}°</p>
                                <p>{Math.round(weather.daily.temperature_2m_min[6])}°</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hourly">
                <div className="hourly-header">
                    <p className="hourly-header-text">Hourly Forecast</p>
                    <div className="days-container">
                        <button className="hourly-button" onClick={() => setDropDown((prev) => !prev)}>
                            <span className="dropdown-day">{daysFull[selectedDay]}</span>
                            <img src={dropdownIcon} alt="dropdown"/>
                        </button>
                        {showDaysDropdown && (
                            <div className="days-dropdown">
                                <p className={`day-list${selectedDay === 1? ' selected' : ''}`} onClick={() => setDay(1)}>Monday</p>
                                <p className={`day-list${selectedDay === 2? ' selected' : ''}`} onClick={() => setDay(2)}>Tuesday</p>
                                <p className={`day-list${selectedDay === 3? ' selected' : ''}`} onClick={() => setDay(3)}>Wednesday</p>
                                <p className={`day-list${selectedDay === 4? ' selected' : ''}`} onClick={() => setDay(4)}>Thursday</p>
                                <p className={`day-list${selectedDay === 5? ' selected' : ''}`} onClick={() => setDay(5)}>Friday</p>
                                <p className={`day-list${selectedDay === 6? ' selected' : ''}`} onClick={() => setDay(6)}>Saturday</p>
                                <p className={`day-list${selectedDay === 0? ' selected' : ''}`} onClick={() => setDay(0)}>Sunday</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hourly-data-display">
                    {
                        hourly_time_temp[selectedDay].map(([code,time,temp], idx) => (
                            <HourlyData key={idx} code={code} time={time} temp={temp}/>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default ResultPage
import React from "react";
import '../App.css'
import DateTimeBg from '../images/bg-today-large.svg'

function ResultPage(){
    return(
        <div className="result-container">
            <div className="daily">
                <div className="date-time">
                    
                </div>
                <div className="current-data">
                    <div className="curr-cards">
                        <p className="curr-cards-header">Feels Like</p>
                    </div>
                    <div className="curr-cards">
                        <p className="curr-cards-header">Humidity</p>
                    </div>
                    <div className="curr-cards">
                        <p className="curr-cards-header">Wind</p>
                    </div>
                    <div className="curr-cards">
                        <p className="curr-cards-header">Precipitation</p>
                    </div>
                </div>
                <div className="weekly-data">
                    <h3 className="daily-forecast">Daily Forecast</h3>
                    <div className="weekly-card-container">
                        <div className="day-card">
                            
                        </div>
                        <div className="day-card">

                        </div>
                        <div className="day-card">

                        </div>
                        <div className="day-card">

                        </div>
                        <div className="day-card">

                        </div>
                        <div className="day-card">

                        </div>
                        <div className="day-card">

                        </div>
                    </div>
                </div>
            </div>
            <div className="hourly">

            </div>
        </div>
    )
}
export default ResultPage
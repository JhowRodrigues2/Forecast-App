import React from "react";

const ForecastDay = ({ feels_like, temp_min, temp_max }) => {
  return (
    <div className="forecastday-temp">
      <div>
        <span> Senstação térmica: </span>
        <p>{feels_like} ºC</p>
      </div>
      <div>
        <span>Temp. Minima:</span>
        <p>{temp_min} ºC</p>
      </div>
      <div>
        <span>Temp. Máxima:</span>
        <p>{temp_max} ºC</p>
      </div>
    </div>
  );
};

export default ForecastDay;

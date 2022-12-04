import React from "react";

const CityTemperature = ({ city, country, temp, description, icon }) => {
  //capitalize first letter of description to uppercase
  const capitalizeString = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };
  return (
    <div>
      <div className="climate-area">
        <div>
          <h1>
            {city} {country}
          </h1>
        </div>
        <div>
          <p className="temp"> {temp}ºC</p>
        </div>
        <div>
          <p>{capitalizeString(description)}</p>
          <img src={icon} />
        </div>
      </div>
    </div>
  );
};

export default CityTemperature;

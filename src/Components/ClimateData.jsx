import React from "react";

const ClimateData = ({ humidity, windSpeed, cloudsAll }) => {
  return (
    <div className="climate-data">
      <div>
        <p>
          <i className="fa-solid fa-droplet"></i>
          Umidade: {humidity} %
        </p>
      </div>
      <div>
        <p>
          <i className="fa-solid fa-wind"></i>
          Vento: {windSpeed} km/h
        </p>
      </div>
      <div>
        <p>
          <i className="fa-solid fa-cloud"></i>
          Nuvens: {cloudsAll} %
        </p>
      </div>
    </div>
  );
};

export default ClimateData;

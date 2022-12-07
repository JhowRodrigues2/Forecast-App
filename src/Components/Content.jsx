import React, { useState, useRef } from "react";
import Sun from "../assets/img/sun.svg";
import initialImg from "../assets/img/initial.svg";
import CityTemperature from "./CityTemperature";
import InitialTemplate from "./InitialTemplate";
import ForecastDay from "./ForecastDay";
import ClimateData from "./ClimateData";
import Footer from "./Footer";

export default function Content() {
  const [city, setCity] = useState("");
  const [climate, setClimate] = useState(null);
  const [erro, setErro] = useState("");
  const btRef = useRef(null);

  const handleChange = (e) => {
    setCity(e.target.value);
    setErro(" ");
  };

  //fetches the data in the API according to the city
  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5746620f81f9eb4b6a31284d8588ef6e&lang=pt_br`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setErro("Cidade inválida!");
        }
      })
      .then((data) => {
        setClimate(data);
      });
  };

  return (
    <div className="area">
      <div className="header">
        <p>
          Forecast <b> App</b>
        </p>
      </div>
      <div className="main-area">
        <div className="div-left">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Digite a cidade..."
            onKeyDown={(e) =>
              e.key === "Enter" ? btRef.current.focus() : undefined
            }
          />{" "}
          <button onClick={handleSearch} ref={btRef}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <br />
          <p className="erro" value={erro}>
            {erro}
          </p>
          {climate ? (
            <CityTemperature
              city={climate.name}
              country={climate.sys.country}
              temp={parseInt(climate.main.temp)}
              description={climate.weather[0].description}
              icon={`http://openweathermap.org/img/wn/${climate.weather[0].icon}.png`}
            />
          ) : (
            <InitialTemplate />
          )}
          <div>
            {climate ? (
              <ForecastDay
                feels_like={climate.main.feels_like.toFixed(1)}
                temp_min={climate.main.temp_min.toFixed(1)}
                temp_max={climate.main.temp_max.toFixed(1)}
              />
            ) : (
              <ForecastDay feels_like={"0"} temp_min={"0"} temp_max={"0"} />
            )}
          </div>
        </div>
        <div className="div-right">
          <div>
            {climate ? (
              <ClimateData
                humidity={climate.main.humidity}
                windSpeed={climate.wind.speed}
                cloudsAll={climate.clouds.all}
              />
            ) : (
              <ClimateData humidity={"0"} windSpeed={"0"} cloudsAll={"0"} />
            )}
          </div>
          <div className="div-right-img">
            <div>
              {climate ? (
                <img src={Sun} alt="Sun"></img>
              ) : (
                <img src={initialImg} alt="initial icon" />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

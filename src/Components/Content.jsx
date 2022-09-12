import { useEffect, useState } from "react";

export default function Content() {
  const [city, setCity] = useState("");
  const [climate, setClimate] = useState(null);
  const [forecastday, setForecastday] = useState(null);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
    setErro(" ");
  };

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=50cb68bc336f4d928f3234126220909&q=${city}&lang=pt`
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
        console.log(data);
      });

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=50cb68bc336f4d928f3234126220909&q=${city}&lang=pt`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setForecastday(data);
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
          />{" "}
          <button onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <br />
          <p className="erro" value={erro}>
            {erro}
          </p>
          {climate ? (
            <div>
              <div className="climate-area">
                <div>
                  <p>
                    <img src={climate.current.condition.icon} />
                  </p>
                </div>
                <div>
                  <p className="temp"> {climate.current.temp_c}ºC</p>
                </div>
                <div>
                  <p>{climate.current.condition.text}</p>
                </div>
                <div>
                  <p>
                    {climate.location.name}, {climate.location.region}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="forecastday-area">
            {forecastday ? (
              <div className="forecastday-temp">
                <div>
                  <p>
                    Temp. Minima:
                    <br></br>
                    {forecastday.forecast.forecastday[0].day.mintemp_c}%
                  </p>
                </div>
                <div>
                  <p>
                    Temp. Máxima:
                    <br></br>
                    {forecastday.forecast.forecastday[0].day.maxtemp_c}%
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="div-right">
          <div>
            {climate ? (
              <div className="climate-data">
                <div>
                  <p>
                    <i className="fa-solid fa-droplet"></i>
                    Umidade: {climate.current.humidity} %
                  </p>
                </div>
                <div>
                  <p>
                    <i className="fa-solid fa-wind"></i>
                    Vento: {climate.current.wind_kph} km/h
                  </p>
                </div>
                <div>
                  {" "}
                  <p>
                    <i className="fa-solid fa-cloud"></i>
                    Nuvens: {climate.current.cloud} %
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="div-right-img">
            <div>
              {climate ? <img src="src\Components\img\sun.svg"></img> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>
          By{" "}
          <a href="https://github.com/JhowRodrigues2" target="_blank">
            Jhow Rodrigues
          </a>
        </p>
      </div>
    </div>
  );
}

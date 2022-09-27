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
                  <h1>
                    {climate.name}, {climate.sys.country}
                  </h1>
                </div>
                <div>
                  <p className="temp"> {parseInt(climate.main.temp)}ºC</p>
                </div>
                <div>
                  <p>
                    {climate.weather[0].description}
                    <img
                      src={`http://openweathermap.org/img/wn/${climate.weather[0].icon}.png`}
                    />
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="forecastday-area">
            {climate ? (
              <div className="forecastday-temp">
                <div>
                  <p>
                    Temp. Minima:
                    <br></br>
                    {climate.main.temp_min}%
                  </p>
                </div>
                <div>
                  <p>
                    Temp. Máxima:
                    <br></br>
                    {climate.main.temp_max}%
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
                    Umidade: {climate.main.humidity} %
                  </p>
                </div>
                <div>
                  <p>
                    <i className="fa-solid fa-wind"></i>
                    Vento: {climate.wind.speed} km/h
                  </p>
                </div>
                <div>
                  {" "}
                  <p>
                    <i className="fa-solid fa-cloud"></i>
                    Nuvens: {climate.clouds.all} %
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

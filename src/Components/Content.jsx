import { useState } from "react";

export default function Content() {
  const [city, setCity] = useState("");
  const [climate, setClimate] = useState(null);
  const [erro, setErro] = useState("");

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

  //capitalize first letter of description to uppercase
  const capitalizeString = (string) => {
    return string[0].toUpperCase() + string.slice(1);
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
                    {capitalizeString(climate.weather[0].description)}
                    <img
                      src={`http://openweathermap.org/img/wn/${climate.weather[0].icon}.png`}
                    />
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div>
            {climate ? (
              <div className="forecastday-temp">
                <div>
                  <span> Senstação térmica: </span>
                  <p>{climate.main.feels_like.toFixed(1)} ºC</p>
                </div>
                <div>
                  <span>Temp. Minima:</span>
                  <p>{climate.main.temp_min.toFixed(1)}%</p>
                </div>
                <div>
                  <span>Temp. Máxima:</span>
                  <p>{climate.main.temp_max.toFixed(1)}%</p>
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
              {climate ? (
                <img src="https://climate-app.vercel.app/static/media/sun.a9155525.svg"></img>
              ) : null}
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

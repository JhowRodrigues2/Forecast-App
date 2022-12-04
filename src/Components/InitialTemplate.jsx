import React from "react";
import Cloud from "../assets/img/cloud.svg";

function InitialTemplate() {
  return (
    <div className="climate-area">
      <div>
        <img src={Cloud} alt="cloud-icon" />
        <p className="temp">0ºC</p>
      </div>
      <div>-</div>
      <div>-, -</div>
    </div>
  );
}

export default InitialTemplate;

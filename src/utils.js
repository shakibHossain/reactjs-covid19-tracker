import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

/**
 * Stores colors and multipliers of
 * cases, recovered and deaths data
 */
export const dataTypeColors = {
  cases: {
    hex: "#CC1034",
    borderHex: "#8e0b24",
    multiplier: 90,
  },
  recovered: {
    hex: "#7dd71d",
    borderHex: "#579614",
    multiplier: 100,
  },
  deaths: {
    hex: "#fb4443",
    borderHex: "#962828",
    multiplier: 200,
  },
};

/**
 * Draws circles on map
 * @param {*} data - contains country information
 */
export const showDataOnMap = (data, dataType) => {
  return data.map((elem, i) => (
    <Circle
      key={i}
      center={{ lat: elem.countryInfo.lat, lng: elem.countryInfo.long }}
      pathOptions={{
        color: dataTypeColors[dataType].hex,
        fillColor: dataTypeColors[dataType].hex,
      }}
      fillOpacity={0.4}
      radius={Math.sqrt(elem[dataType]) * dataTypeColors[dataType].multiplier}
    >
      <Popup>
        <div className="country-container">
          <div
            className="country-flag"
            style={{ backgroundImage: `url(${elem.countryInfo.flag})` }}
          ></div>
          <div className="country-name">{elem.country}</div>
          <div className="country-confirmed">
            Cases: {numeral(elem.cases).format(0, 0)}
          </div>
          <div className="country-recovered">
            Recovered: {numeral(elem.recovered).format(0, 0)}
          </div>
          <div className="country-deaths">
            Deaths: {numeral(elem.deaths).format(0, 0)}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};

/**
 *
 * @param {*} historicalData - contains worldwide/country specific data
 * @param {*} dataType - cases/recovered/deaths
 * @param {*} country - holds 'Worldwide' value or name of country
 * @returns - formatted chart data
 */
export const buildGraphData = (historicalData, dataType, country) => {
  let data = [];
  if (country === "Worldwide") {
    // Worldwide
    data = historicalData[dataType];
  } else {
    // Specific country
    data = historicalData.timeline[dataType];
  }
  if (data != null) {
    console.log("dataLINEGRAPH", data);
    let chartData = [];
    let lastDataPoint;

    for (let date in data) {
      if (data[date] > 0) {
        if (lastDataPoint) {
          let newDataPoint = {
            x: date,
            y: data[date] - lastDataPoint,
          };
          chartData.push(newDataPoint);
        }
        lastDataPoint = data[date];
      }
    }
    return chartData;
  }
};

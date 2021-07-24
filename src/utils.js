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
      color={dataTypeColors[dataType].hex}
      fillColor={dataTypeColors[dataType].hex}
      radius={Math.sqrt(elem[dataType]) * dataTypeColors[dataType].multiplier}
    >
      <Popup>
        <div className="country-container">
          <div className="country-flag">
            <img src={`${elem.countryInfo.flag}`} />
          </div>
          <div className="country-name">{elem.country}</div>
          <div className="country-confirmed">
            Cases: {numeral(elem.cases).format(0, 0)}
          </div>
          <div className="country-recovered">
            Recovered: {numeral(elem.recovered).format(0, 0)}
          </div>
          <div className="country-confirmed">
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
  let casesData = [];
  if (country === "Worldwide") {
    // Worldwide
    if (dataType === "cases") {
      casesData = historicalData?.cases;
    } else if (dataType === "recovered") {
      casesData = historicalData?.recovered;
    } else {
      casesData = historicalData?.deaths;
    }
  } else {
    // Specific country
    if (dataType === "cases") {
      casesData = historicalData?.timeline?.cases;
    } else if (dataType === "recovered") {
      casesData = historicalData?.timeline?.recovered;
    } else {
      casesData = historicalData?.timeline?.deaths;
    }
  }
  if (casesData != null) {
    const casesDataFormatted = [];
    // Format JSON object and set date and cases values
    for (let [key, value] of Object.entries(casesData)) {
      casesDataFormatted.push({
        date: key,
        cases: value,
      });
    }

    let chartData = [];
    let lastDataPoint;
    // Form data points x & y to display on chart
    casesDataFormatted.forEach((element) => {
      if (lastDataPoint) {
        let newDataPoint = {
          x: element.date,
          y: element.cases - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = element.cases;
    });
    return chartData;
  }
};

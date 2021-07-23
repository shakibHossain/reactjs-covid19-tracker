import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const dataTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 90,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 100,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 200,
  },
};
/**
 * Draws circles on map
 * @param {*} data -contains country information
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

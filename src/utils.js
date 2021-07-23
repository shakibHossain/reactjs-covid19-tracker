import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

/**
 * Draws circles on map
 * @param {*} data -contains country information
 */
export const showDataOnMap = (data) =>
  data.map((elem, i) => (
    <Circle
      key={i}
      center={{ lat: elem.countryInfo.lat, lng: elem.countryInfo.long }}
      fillColor="blue"
      radius={1200}
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

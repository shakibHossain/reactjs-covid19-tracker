import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { showDataOnMap } from "../../utils";

import "./custom-map.styles.scss";

const CustomMap = ({ center, zoom, countries, dataType }) => {
  /**
   * Component that changes map view upon coordinate change
   * @param {object} center - contains lat & long coordinates
   * @param {int} zoom - contains zoom level
   * @returns null
   */
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, dataType)}
      </MapContainer>
    </div>
  );
};

export default CustomMap;

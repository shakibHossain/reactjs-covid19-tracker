import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import InfoBox from "./components/info-box/info-box.component";
import CustomTable from "./components/custom-table/custom-table.component";
import CustomMap from "./components/custom-map/custom-map.component";
import CustomGraph from "./components/custom-graph/custom-graph.component";

import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [infoBoxData, setInfoBoxData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [center, setCenter] = useState({ lat: 34.8076, lng: -40.4796 });
  const [zoom, setZoom] = useState(3);
  const [dataType, setDataType] = useState("recovered");
  const [country, setCountry] = useState("Worldwide");

  /**
   * Round numbers to make it readable
   * @param {*} labelValue
   */
  const roundFriendly = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
      : Math.abs(Number(labelValue));
  };

  /**
   * On page load, fetch all countries from API
   * and populate select field
   */
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const arrayOfCountries = [];
          const arrayofCountriesData = [];
          // Add "Worldwide" option separately
          arrayOfCountries.push("Worldwide");
          data.forEach((element) => {
            arrayOfCountries.push(element.country);
            arrayofCountriesData.push({
              country: element.country,
              todayCases: element.todayCases,
            });
            // Sort in descending order
            arrayofCountriesData.sort(
              (a, b) => parseFloat(b.todayCases) - parseFloat(a.todayCases)
            );
          });
          setCountries(arrayOfCountries);
          setCountriesData(arrayofCountriesData);
          setMapCountries(data);
        });
    };
    getCountries();
    onCountryChange("Worldwide");
  }, []);

  const onCountryChange = async (countryValue) => {
    setCountry(countryValue);

    if (countryValue !== null) {
      let url = "";
      if (countryValue === "Worldwide") {
        url = "https://disease.sh/v3/covid-19/all";
      } else {
        url = `https://disease.sh/v3/covid-19/countries/${countryValue}`;
      }

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setInfoBoxData(data);

          if (countryValue === "Worldwide") {
            setCenter([34.8076, -40.4796]);
          } else {
            setCenter([data.countryInfo.lat, data.countryInfo.long]);
          }
          setZoom(4);
        });
    }
  };

  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper-header">
            <span>Covid 19 Tracker</span>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Select dropdown */}
          {/* <Paper className="app__paper"> */}
          <Autocomplete
            id="country-select"
            options={countries}
            autoHighlight
            defaultValue={"Worldwide"}
            renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
            onChange={(event, value) => onCountryChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            title="Cases"
            numbers={roundFriendly(infoBoxData.todayCases) + " New"}
            total={roundFriendly(infoBoxData.cases) + " Total"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            title="Recoveries"
            numbers={roundFriendly(infoBoxData.todayRecovered) + " New"}
            total={roundFriendly(infoBoxData.recovered) + " Total"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox
            title="Deaths"
            numbers={roundFriendly(infoBoxData.todayDeaths) + " New"}
            total={roundFriendly(infoBoxData.deaths) + " Total"}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">
            <CustomTable newCases={countriesData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">
            <CustomMap
              center={center}
              zoom={zoom}
              countries={mapCountries}
              dataType={dataType}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">
            <CustomGraph country={country} dataType={dataType} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">News</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

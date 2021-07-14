import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import InfoBox from "./components/info-box/info-box.component";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  /**
   * On page load, fetch all countries from API
   * and populate select field
   */
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const arrayOfCountries = [];
          // Add "Worldwide" option separately
          arrayOfCountries.push("Worldwide");
          data.forEach((element) => {
            arrayOfCountries.push(element.country);
          });
          setCountries(arrayOfCountries);
        });
    };
    getCountries();
  }, []);

  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">
            <p>Covid 19 Tracker</p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Select dropdown */}
          <Autocomplete
            id="country-select"
            options={countries}
            autoHighlight
            defaultValue={"Canada"}
            renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InfoBox />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">Table</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">Map</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">Graph</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">News</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CustomSelect from "./components/custom-select/custom-select.component";
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
            <h4>Covid 19 Tracker</h4>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="app__paper">
            <CustomSelect countries={countries} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className="app__paper">Cases</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className="app__paper">Recoveries</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className="app__paper">Deaths</Paper>
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

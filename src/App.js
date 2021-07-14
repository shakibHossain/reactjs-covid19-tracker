import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "./App.css";
import { Select } from "@material-ui/core";
import CustomSelect from "./components/custom-select/custom-select.component";

function App() {
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
            <CustomSelect />
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

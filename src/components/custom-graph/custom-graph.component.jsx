import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

import { dataTypeColors, buildGraphData } from "../../utils";

import "./custom-graph.styles.scss";

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const CustomGraph = ({ country, dataType }) => {
  const [data, setData] = useState([]);

  /**
   * Fetch historical data on country change
   */
  useEffect(() => {
    const getHistoricalData = async () => {
      if (country === "Worldwide") {
        await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=180"
        )
          .then((response) => {
            return response.json();
          })
          .then((apiData) => {
            let graphData = buildGraphData(apiData, dataType, country);
            setData(graphData);
          });
      } else {
        await fetch(
          `https://disease.sh/v3/covid-19/historical/${country}?lastdays=180
          `
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let graphData = buildGraphData(data, dataType, country);
            setData(graphData);
          });
      }
    };
    getHistoricalData();
  }, [country]);

  return (
    <div className="lineGraph">
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: `# of ${dataType} in last 6 months`,
                fill: true,
                backgroundColor: `${dataTypeColors[dataType].hex}`,
                borderColor: `${dataTypeColors[dataType].borderHex}`,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default CustomGraph;

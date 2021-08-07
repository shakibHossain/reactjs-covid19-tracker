import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import "./custom-table.styles.scss";

const CustomTable = ({ data, dataType }) => {
  return (
    <div className="customTable">
      <Table stickyHeader aria-label="enhanced table">
        <TableHead>
          <TableRow>
            <TableCell order={"asc"}>Country</TableCell>
            <TableCell order={"desc"}>
              {dataType === "cases"
                ? "New Cases"
                : dataType === "recovered"
                ? "New Recoveries"
                : "New Deaths"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.country}>
              <TableCell>{item.country}</TableCell>
              {dataType === "cases" ? (
                <TableCell>{item.todayCases}</TableCell>
              ) : dataType === "recovered" ? (
                <TableCell>{item.todayRecovered}</TableCell>
              ) : (
                <TableCell>{item.todayDeaths}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;

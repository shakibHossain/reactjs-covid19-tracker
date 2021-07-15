import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import "./custom-table.styles.scss";

const CustomTable = ({ newCases }) => {
  return (
    <div className="customTable">
      <Table stickyHeader aria-label="enhanced table">
        <TableHead>
          <TableRow>
            <TableCell order={"asc"}>Country</TableCell>
            <TableCell order={"desc"}>New Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newCases.map((item) => (
            <TableRow key={item.country}>
              <TableCell>{item.country}</TableCell>
              <TableCell>{item.todayCases}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;

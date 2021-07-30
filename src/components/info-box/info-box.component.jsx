import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./info-box.styles.scss";

const InfoBox = ({ title, numbers, total, onClick, active, dataType }) => {
  return (
    <Card
      className={`infoBox ${
        active && dataType === "cases" ? "infoBox--cases" : ""
      } ${active && dataType === "recovered" ? "infoBox--recovered" : ""} ${
        active && dataType === "deaths" ? "infoBox--deaths" : ""
      }`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className="title" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography className="pos">{numbers}</Typography>
        <Typography variant="body2" component="p">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;

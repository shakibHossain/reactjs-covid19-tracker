import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./info-box.styles.scss";

const InfoBox = () => {
  return (
    <Card className="root">
      <CardContent>
        <Typography className="title" color="textSecondary" gutterBottom>
          Test
        </Typography>
        <Typography className="pos">5335</Typography>
        <Typography variant="body2" component="p">
          5.3M
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;

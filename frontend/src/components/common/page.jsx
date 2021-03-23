import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Page({ data, columns }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Card className={classes.root} variant="outlined" elevation={6}>
        <CardContent>
          {columns.map((column) => {
            if (column.type === "title") {
              return (
                <Typography
                  key={column.path}
                  className={classes.title}
                  variant="h5"
                  component="h2"
                >
                  {data[column.path]}
                </Typography>
              );
            } else if (column.type === "subTitle") {
              return (
                <Typography key={column.path} color="secondary">
                  {bull} {column.label}: {data[column.path]}
                </Typography>
              );
            } else if (column.type === "boolean") {
              return (
                <Typography key={column.path} color="primary">
                  {bull} {column.label}: {data[column.path].toString()}
                </Typography>
              );
            } else if (column.type === "detail") {
              return (
                <Typography
                  key={column.path}
                  variant="body2"
                  component="p"
                  color="initial"
                >
                  {bull} {column.label}: {data[column.path]}
                </Typography>
              );
            } else if (column.content) {
              return <div key={column.key}>{column.content(data)}</div>;
            }
          })}
        </CardContent>
      </Card>
    </Grid>
  );
}

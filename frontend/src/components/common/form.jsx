import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  // https://picsum.photos/2000/2000/
  image: {
    backgroundImage: "url(https://images.unsplash.com/photo-1512850183-6d7990f42385?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 0.5),
    width: 500,
  },
  typo: {
    margin: theme.spacing(-5, 0, 0),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: theme.spacing(0, 0, 0.5),
    width: 250,
  },
  autoComplete: {
    margin: theme.spacing(0, 0, 0.5),
    width: 500,
  },
}));

export function Form(props) {
  const { formObject, title, onFormValueChange, onSubmit, onCancel } = props;

  const classes = useStyles();

  function handleSubmit(e) {
    onSubmit();
    e.preventDefault();
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography className={classes.typo} component="h1" variant="h4">
            {title}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {Object.keys(formObject).map(function (formValue) {
              let label = formValue.charAt(0).toUpperCase();
              for (let i = 1; i < formValue.length; i++) {
                let char = formValue.charAt(i);
                if (char === char.toUpperCase()) {
                  label = label.concat(" ", char);
                } else {
                  label = label.concat(char);
                }
              }
              return (
                <div key={formValue}>
                  <p className={classes.textField}>{label}</p>
                  {label.includes("Time") ? (
                    <TextField
                      id={formValue}
                      label={label}
                      type="time"
                      required
                      className={classes.textField}
                      onChange={onFormValueChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : label.includes("Date") ? (
                    <TextField
                      id={formValue}
                      label={label}
                      type="date"
                      required
                      className={classes.textField}
                      onChange={onFormValueChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : typeof formObject[formValue] === "object" ? (
                    <Autocomplete
                      id={formValue}
                      options={formObject[formValue]}
                      getOptionLabel={(option) => option}
                      className={classes.autoComplete}
                      required
                      onChange={onFormValueChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={formValue}
                          variant="outlined"
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      className={classes.autoComplete}
                      id={formObject[formValue]}
                      label={label}
                      name={formValue}
                      type={formValue}
                      autoComplete={formValue}
                      autoFocus
                      value={formObject[formValue]}
                      onChange={onFormValueChange}
                    />
                  )}
                </div>
              );
            })}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

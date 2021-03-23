import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";

export default function AutocompleteInput({ data, onCitySelect }) {
  let optionName = "";
  if (!_.isUndefined(data) && _.size(data) > 0) {
    Object.keys(data[0]).map(function (value) {
      if (_.includes(value, "Name")) {
        optionName = value;
      }
    });
  }
  return (
    <Autocomplete
      id={"city"}
      options={data}
      fullWidth
      getOptionLabel={(option) => option[optionName]}
      style={{ marginBottom: "10px" }}
      onChange={onCitySelect}
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="outlined" />
      )}
    />
  );
}

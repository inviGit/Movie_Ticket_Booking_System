import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import _ from "lodash";

export default function AlertDialog({ open, data }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {data.map((item) => {
        if (item.title) {
          return <DialogTitle key={item.key}>{item.title}</DialogTitle>;
        }
        if (item.content) {
          return (
            <DialogContent key={item.key}>
              <DialogContentText>{item.content}</DialogContentText>
            </DialogContent>
          );
        }
        if (item.action) {
          return <DialogActions key={item.key}>{item.action}</DialogActions>;
        }
        return item
      })}
    </Dialog>
  );
}
